var through = require('through2');
var gutil = require('gulp-util');
var extend = require('object-assign');
var licenseUpdater = require('./src/main');

module.exports = function (config, license, rate) {
    rate = rate || 0.8;
    var filePaths = [];
    return through.obj(function (file, encoding, callback) {
        var filename = licenseUpdater.getFileName(file);
        var template = gutil.template(license, extend({
            file: file, filename: filename
        }, config));
        config = config || {};
        var templateArr;
        var source;
        var matchCounter;
        var result;
        if (config.check) {
            var match = licenseUpdater.check(file.contents.toString('utf-8').split(/\r?\n/), template.split(/\r?\n/));
            var cond = config.notExists ? match < rate : match >= rate;
            if (cond) {
                var path = file.path.replace(process.cwd(), '');
                path = path.replace(new RegExp('^[/\\\\]'), '');
                filePaths.push(path.replace(/\\/g, '/'));
            }
        } else if (config.format) {
            templateArr = template.split(/\r?\n/);
            source = file.contents.toString('utf-8').split(/\r?\n/);
            matchCounter = licenseUpdater.check(source, templateArr);
            result = licenseUpdater.format(source, templateArr, matchCounter, rate);
            file.contents = new Buffer(result.join('\r\n'));
        } else if (config.remove) {
            templateArr = template.split(/\r?\n/);
            result = source = file.contents.toString('utf-8').split(/\r?\n/);
            matchCounter = licenseUpdater.check(source, templateArr);
            if (matchCounter > rate) {
                result = licenseUpdater.remove(source, templateArr);
            }
            file.contents = new Buffer(result.join('\r\n'));
        }
        callback(null, file, filePaths);
    });
};