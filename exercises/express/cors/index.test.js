var app = require('.');
var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();
chai.use(chaiHttp);
describe('First testing', function() {
	it('Hello world testing', function(done) {
	  chai.request(app)
	    .get('/')
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.headers.should.have.property('access-control-allow-origin');
	      res.headers['access-control-allow-origin'].should.equal('*');
	      res.text.should.equal('Hello World!');
	      done();
	    });
	});
});

