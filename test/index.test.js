var eventStream = require('event-stream');
var expect = require('chai').expect;
var File = require('vinyl');
var lu = require('../index');
var path = require('path');
var gulp = require('gulp');
var assert = require('stream-assert');
var is = require('funsert');
var fixtures = function (glob) {
    return path.join(__dirname, 'fixture', glob);
};
describe('gulp-license-updater', function () {
    function getTmpFile(content) {
        return new File({
            path: './fixture/file.js',
            cwd: './',
            base: './fixture/',
            contents: Buffer.from(content || '')
        });
    }

    function getTmpStream(content) {
        return new File({
            contents: eventStream.readArray(content),
            path: './fixture/tmpFile.js'
        })
    }

    it('should be processed by license updater', function (done) {
        var n = 0;
        var luStream = lu({action: 'check', rate: 0.8}, 'test string');
        var tstString = 'test string';
        var tmpFile = getTmpFile(tstString);
        luStream.on('data', function (file) {
            expect(file).to.exist;
            expect(file.path).to.exist;
            expect(file.relative).to.exist;
            expect(file.contents).to.exist;
            expect(file.contents.toString('utf8')).to.equal(tstString);
            expect(file.path).to.equal('./fixture/file.js');
            expect(file.relative).to.equal('file.js');
            ++n;
        });
        luStream.once('end', function () {
            expect(n).to.equal(1);
            done();
        });

        luStream.write(tmpFile);
        luStream.end();
    });
    it('should works well with pipe', function (done) {
        gulp.src(fixtures('*'))
            .pipe(lu({action: 'check', rate: 0.8}, 'var a = \'Hello\'; \nconsole.log(a);'))
            .pipe(
                assert.first(function (item) {
                    is.equal(item.relative, 'first')
                }))
            .pipe(assert.second(function (item) {
                is.equal(item.relative, 'second');
            }))
            .pipe(assert.end(done));

    });

    it('should works well with pipe in case format operation', function (done) {
        gulp.src(fixtures('*'))
            .pipe(lu({action: 'format', rate: 0.8}, '(c) license'))
            .pipe(
                assert.first(function (item) {
                    is.equal(String.fromCharCode.apply(null, item.contents), '(c) license\r\nvar a = \'Hello\';\r\nconsole.log(a)');
                }))
            .pipe(assert.end(done));

    });
});