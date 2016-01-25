module.exports = {
    getFileName: function (file) {
        var filename;
        if (typeof file === 'string') {
            filename = file;
        }
        else if (typeof file.path === 'string') {
            filename = path.basename(file.path);
        }
        else {
            filename = '';
        }
        return filename;
    },

    matchStrings: function (template, str) {
        if (template === undefined || str === undefined) {
            return 0;
        }
        var maxLength = Math.max(template.length, str.length);
        if (maxLength === 0) {
            return 1;
        }
        var matchCount = Array.apply(null, {length: maxLength}).map(Number.call, Number).reduce(function (prev, curr, index) {
            if (template.charAt(index) === str.charAt(index)) {
                return ++prev;
            } else {
                return prev;
            }
        }, 0);
        return matchCount / maxLength;
    },

    check: function (sources, license) {
        var minLines = Math.min(sources.length, license.length);
        var matchRates = Array.apply(null, {length: minLines}).map(Number.call, Number).reduce(function (prev, curre, index) {
            if (license[license.length - 1] === '' && index === license.length - 1) {
                return ++prev;
            } else {
                return prev + matchStrings(license[index], sources[index]);
            }
        });
        return matchRates / minLines;
    },
    processFile: function (file, encoding, callback) {
        var filename = getFileName(file);
        var template = gutil.template(license, extend({
            file: file, filename: filename
        }, config));

        if (config.check) {
            this.check(file.contents.toString('utf-8').split(/\r?\n/), template.split(/\r?\n/));
            this.emit.bind(this, 'error');
        }
        if (config.format) {

        }
        if (config.remove) {


        }
    }
}