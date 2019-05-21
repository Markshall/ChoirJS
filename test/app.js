var assert = require('assert');

var chai = require('chai');

var chaiHttp  = require('chai-http');

var choir = require('../test');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Requests', () => {
    var request = chai.request('http://localhost:8080');
    
    choir.registry.add('/', 'index');
    choir.registry.add('/json', 'json');

    it('Should emit a GET event with HTML content.', (done) => {
        choir.route.get.on('index', (req, res) => {
            res.send('Test');
        });

        request.get('/').end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            done();
        });
    });

    it('Should emit a POST event with HTML content.', (done) => {
        choir.route.post.on('index', (req, res) => {
            res.send('Test');
        });

        request.post('/').end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            done();
        });
    });

    it('Should emit a GET event with JSON content.', (done) => {
        choir.route.get.on('json', (req, res) => {
            res.json({
                test: true,
            });
        });

        request.get('/json').end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        });
    });
});