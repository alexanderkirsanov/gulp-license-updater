var through = require('through2');
var gutil = require('gulp-util');
var extend = require('object-assign');
var fileProcessor = require('./src/main');

module.exports = function (config, license) {


    return through.obj(fileProcessor.processFile);
};