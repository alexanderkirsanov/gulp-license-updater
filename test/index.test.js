var eventStream = require('event-stream');
var expect = require('chai').expect;
var File = require('vinyl');
var lu = require('../index');
describe('gulp-license-updater', function () {
    function getTmpFile(content) {
        return new File({
            path: './fixture/file.js',
            cwd: './',
            base: './fixture/',
            contents: new Buffer(content || '')
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
        var luStream = lu({check:true}, 'test string', 0.8);
        var tstString = 'test string';
        var tmpFile = getTmpFile(tstString);
        luStream.on('data', function (file) {
            expect(file).to.exist;
            expect(file.path).to.exist;
            expect(file.relative).to.exist;
            expect(file.contents).to.exist;
            expect(file.contents.toString('utf8')).to.be(tstString);
            expect(file.path).to.be('./fixture/file.js');
            expect(file.relative).to.be('file.js');
            ++n;
        });
        //luStream.on('check', function(name){
        //    console.log(name);
        //});
        luStream.once('end', function () {
            expect(n).to.be(1);
            done();
        });

        luStream.write(tmpFile);
        luStream.end();
    });
});