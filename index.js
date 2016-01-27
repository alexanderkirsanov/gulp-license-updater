var through = require('through2');
var gutil = require('gulp-util');
var extend = require('object-assign');
var licenseUpdater = require('./src/main');

module.exports = function (config, license, rate) {
    rate = rate || 0.8;

    return through.obj(function (file, encoding, callback) {
        var filename = licenseUpdater.getFileName(file);
        var template = gutil.template(license, extend({
            file: file, filename: filename
        }, config));
        config = config || {};
        if (config.check) {
            if (licenseUpdater.check(file.contents.toString('utf-8').split(/\r?\n/), template.split(/\r?\n/)) >= rate) {
                this.emit.bind(this, filename);
            }
        }
        if (config.format) {

        }
        if (config.remove) {


        }
        callback(null, file);
    });
};