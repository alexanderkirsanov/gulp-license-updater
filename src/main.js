var path = require('path');
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
        var that = this;
        var matchRates = Array.apply(null, {length: minLines}).map(Number.call, Number).reduce(function (prev, curre, index) {
            if (license[license.length - 1] === '' && index === license.length - 1) {
                return ++prev;
            } else {
                return prev + that.matchStrings(license[index], sources[index]);
            }
        }, 0);
        if (minLines === 0) {
            return 0;
        }
        return matchRates / minLines;
    },
    format: function (sources, license, matchCounter, rate) {
        if (matchCounter >= rate && matchCounter !== 1) {
            this.remove(sources, license);
            sources = license.push.apply(license, sources);
        } else if (matchCounter !== 1) {
            this.remove(sources, license);
            sources = license.push.apply(license, sources);
        }
        return sources;
    },
    remove: function (sources, license) {
        if (sources[license.length - 1].replace(/\s/, '') === '') {
            sources.splice(0, license.length);
        } else {
            sources.splice(0, license.length - 1);
        }
    }

};