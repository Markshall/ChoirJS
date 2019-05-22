var assert = require('assert');

var chai = require('chai');

var expect = chai.expect;

var Registry = require('../dist/lib/registry');

var registry = new Registry.default();

describe('Route Registry', () => {
    it('Should register /test and return true when checked.', (done) => {
        registry.add('/test', 'Test');
        var registryCheck = registry.check('/test');
        expect(registryCheck).to.have.property('route');
        done();
    });

    it('Should register REGEX(json[0-9]/[a-zA-Z]*) and return true check checked.', (done) => {
        registry.add(/^\/json([0-9])\/([a-zA-Z]*)$/, 'Test 2');
        var registryCheck = registry.check('/json1/asd');
        expect(registryCheck).to.have.property('route');
        done();
    });
});