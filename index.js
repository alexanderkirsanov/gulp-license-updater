var through = require('through2');
var gutil = require('gulp-util');
var extend = require('object-assign');

module.exports = function (config, license)
{
    var getFileName = function (file)
    {
        var filename;
        if (typeof file === 'string')
        {
            filename = file;
        }
        else if (typeof file.path === 'string')
        {
            filename = path.basename(file.path);
        }
        else
        {
            filename = '';
        }
        return filename;
    };
    var check = function(){

    };
    var processFile = function (file, encoding, callback)
    {
        var filename = getFileName(file);
        var template = gutil.template(license, extend({
            file: file, filename: filename
        }, config));

        if (config.check)
        {
            this.emit.bind(this, 'error');
        }
        if (config.format)
        {

        }
        if (config.remove)
        {


        }
    };
    return through.obj(processFile);
};