var lu = require('../src/main');
var expect = require('chai').expect;
describe('license updater match', function () {
    describe('matchStrings', function () {
        it('should be defined', function () {
            expect(lu.matchStrings).to.be.a('function');
        });
        it('should return 0 in case of undefined', function(){
            expect(lu.matchStrings(undefined, undefined)).to.equal(0);
        });
        it('should return 1 in case of empty strings', function(){
            expect(lu.matchStrings('', '')).to.equal(1);
        });
        it('should return 1 in case of equals strings', function(){
            expect(lu.matchStrings('1231', '1231')).to.equal(1);
        });
        it('should return 0.5 in case of half-equals strings', function(){
            expect(lu.matchStrings('1231', '1255')).to.equal(0.5);
        })
    })
});