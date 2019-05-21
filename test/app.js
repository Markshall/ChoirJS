var assert = require('assert');

var chai = require('chai');

var chaiHttp  = require('chai-http');

var choir = require('../dist/index');

var expect = chai.expect;

chai.use(chaiHttp);

var choir = new choir(8080);

describe('routes', () => {
    var request = chai.request('http://localhost:8080');

    it('should emit a GET event', (done) => {
        choir.registry.add('/', 'index');

        choir.route.get.on('index', (req, res) => {
            res.send('Test');
        });

        request.get('/').end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            done();
        });
    });

    it('should emit a POST event', (done) => {
        choir.registry.add('/', 'index');

        choir.route.post.on('index', (req, res) => {
            res.send('Test');
        });

        request.get('/').end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            done();
        });
    });
});