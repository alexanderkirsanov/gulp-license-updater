var through = require('through2');
var gutil = require('gulp-util');
var extend = require('object-assign');
var licenseUpdater = require('./src/main');

module.exports = function (config, license) {


    return through.obj(function (file, encoding, callback) {
        var filename = licenseUpdater.getFileName(file);
        var template = gutil.template(license, extend({
            file: file, filename: filename
        }, config));

        if (config.check) {
            licenseUpdater.check(file.contents.toString('utf-8').split(/\r?\n/), template.split(/\r?\n/));
            this.emit.bind(this, 'error');
        }
        if (config.format) {

        }
        if (config.remove) {


        }
    });
};