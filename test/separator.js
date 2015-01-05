'use strict';

var Separator = require('../src/separator');

var should = require('should'),
    sinon = require('sinon');

describe('Separator', function() {
    var separator;

    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(console, 'warn');
        sinon.spy(console, 'info');
        sinon.spy(console, 'error');
    });

    afterEach(function() {
        console.log.restore();
        console.warn.restore();
        console.info.restore();
        console.error.restore();
    });

    it ('should construct', function(done) {
        separator = new Separator();
        done();
    });

    it('should construct with values', function(done) {
        separator = new Separator('-');
        separator.piece.should.equal('-');
        separator.height.should.equal(1);

        separator = new Separator('~', 60);
        separator.piece.should.equal('~');
        separator.length.should.equal(60);
        separator.height.should.equal(1);

        separator = new Separator('=', 50, 2);
        separator.piece.should.equal('=');
        separator.length.should.equal(50);
        separator.height.should.equal(2);

        done();
    });

    describe('#get', function() {
        var piece = '=';
        var length = 5;
        var result = '=====';

        beforeEach(function() {
            separator = new Separator(piece, 5);
        });

        it('should return a proper length separator string', function(done) {
            separator.get().should.equal(result);
            done();
        });

        it('should return an overridden separator', function(done) {
            separator.get(4).should.equal('====');
            separator.get(3,2).should.equal('===\n===');
            done();
        });
    });


    describe('#log', function() {
        beforeEach(function() {
            separator = new Separator('-', 5);
        });

        it('should call console.log', function(done) {
            separator.log();
            sinon.assert.called(console.log);
            done();
        });

    });


    describe('#info', function() {
        beforeEach(function() {
            separator = new Separator('-', 5);
        });

        it('should call console.info', function(done) {
            separator.info();
            sinon.assert.called(console.info);
            done();
        });

    });


    describe('#warn', function() {
        beforeEach(function() {
            separator = new Separator('-', 5);
        });

        it('should call console.warn', function(done) {
            separator.warn();
            sinon.assert.called(console.warn);
            done();
        });

    });


    describe('#error', function() {
        beforeEach(function() {
            separator = new Separator('-', 5);
        });

        it('should call console.error', function(done) {
            separator.error();
            sinon.assert.called(console.error);
            done();
        });

    });
});
