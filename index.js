var through = require('through2');
var gutil = require('gulp-util');
var extend = require('object-assign');
var licenseUpdater = require('./src/main');

module.exports = function (config, license, oldLicense) {
    return through.obj(function (file, encoding, callback) {
        var templateArr;
        var source;
        var matchCounter;
        var result;
        var filename = licenseUpdater.getFileName(file);
        config = config || {};
        var action = config.action || 'check';
        var rate = config.rate || 0.8;
        delete config.action;

        var template = config.data === false ? license : gutil.template(license, extend({
            file: file, filename: filename
        }, config));
        var fileContent = file.contents.toString('utf8');
        var separator = licenseUpdater.getSeparator(fileContent);

        if (action === 'check') {
            var match = licenseUpdater.check(fileContent.split(/\r?\n/), template.split(/\r?\n/));
            var cond = config.notExists ? match < rate : match >= rate;
            if (cond) {
                this.push(file);
            }
            return callback();
        } else if (action === 'format') {
            templateArr = template.split(/\r?\n/);
            var oldTemplate;
            source = fileContent.split(/\r?\n/);
            if (oldLicense) {
                oldTemplate = oldLicense.split(/\r?\n/)
            }
            matchCounter = licenseUpdater.check(source, templateArr);
            result = licenseUpdater.format(source, templateArr, matchCounter, rate, oldTemplate);
            file.contents = new Buffer(result.join(separator));
        } else if (action === 'remove') {
            templateArr = template.split(/\r?\n/);
            result = source = fileContent.split(/\r?\n/);
            matchCounter = licenseUpdater.check(source, templateArr);
            if (matchCounter > rate) {
                result = licenseUpdater.remove(source, templateArr);
            }
            file.contents = new Buffer(result.join(separator));
        }
        callback(null, file);
    });
};