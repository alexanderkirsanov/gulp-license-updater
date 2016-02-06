var lu = require('../src/main');
var expect = require('chai').expect;
describe('license updater match', function () {
    describe('#matchStrings', function () {
        it('should be defined', function () {
            expect(lu.matchStrings).to.be.a('function');
        });
        it('should return 0 in case of undefined', function () {
            expect(lu.matchStrings(undefined, undefined)).to.equal(0);
        });
        it('should return 1 in case of empty strings', function () {
            expect(lu.matchStrings('', '')).to.equal(1);
        });
        it('should return 1 in case of equals strings', function () {
            expect(lu.matchStrings('1231', '1231')).to.equal(1);
        });
        it('should return 0.5 in case of half-equals strings', function () {
            expect(lu.matchStrings('1231', '1255')).to.equal(0.5);
        })
    });
    describe('#check', function () {
        it('should be defined', function () {
            expect(lu.check).to.be.a('function');
        });
        it('should return 0 in case of empty lines', function () {
            expect(lu.check([], [])).to.equal(0);
        });
        it('should return 1 in case of equals lines', function () {
            expect(lu.check(['123', '1233'], ['123', '1233'])).to.equal(1);
        });
        it('should calculate the match rate based on matches of each line', function () {
            expect(lu.check(['123', '1231'], ['123', '1233'])).to.equal(0.875);
            expect(lu.check(['123', '1231'], ['1232', '1233'])).to.equal(0.75);
            expect(lu.check(['113', '1231'], ['1232', '1253'])).to.equal(0.5);
        });

    });
    describe('#format', function () {
        it('should be defined', function () {
            expect(lu.format).to.be.a('function');
        });
        it('should return the same string if matcher = 1', function () {
            expect(lu.format(['test', 'test2'], ['license', 'license2'], 1, 0.8)).deep.equal(['test', 'test2'])
        });
        it('should add the license in case of matcher = 0', function () {
            expect(lu.format(['test', 'test2'], ['license'], 0, 0.8)).deep.equal(['license', 'test', 'test2'])
        });
        it('should update the license in case of matcher > match rate', function () {
            expect(lu.format(['license', 'test', 'test2'], ['license2'], 0.9, 0.8)).deep.equal(['license2', 'test', 'test2'])
        });
    });

    describe('#remove', function () {
        it('should be defined', function () {
            expect(lu.remove).to.be.a('function');
        });
        it('should remove exactly the same count of lines as in license', function () {
            expect(lu.remove(['license', 'license2', 'test3'], ['license', 'license2'])).deep.equal(['test3'])
        });
    });


});