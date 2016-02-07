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

    format: function (sources, license, matchCounter, rate, oldLicense) {
        oldLicense = oldLicense || license;
        if ((matchCounter >= rate && matchCounter !== 1) || (matchCounter === 1 && oldLicense)) {
            this.remove(sources, oldLicense);
            license.push.apply(license, sources);
            sources = license;
        } else if (matchCounter !== 1) {
            license.push.apply(license, sources);
            sources = license;
        }
        return sources;
    },

    remove: function (sources, license) {
        sources.splice(0, license.length);
        return sources;
    },

    getSeparator: function (str) {
        for (var i = str.length; i > -1; i--) {
            if (str.charCodeAt(i) === 10) {
                if (str.charCodeAt(i - 1) === 13) {
                    return '\r\n';
                }
                if (str.charCodeAt(i + 1) === 13) {
                    return '\n\r';
                }
                return '\n';
            }
            if (str.charCodeAt(i) === 13) {
                if (str.charCodeAt(i - 1) === 10) {
                    return '\n\r';
                }
                if (str.charCodeAt(i + 1) === 10) {
                    return '\r\n';
                }
                return '\r';
            }
        }
    }
};