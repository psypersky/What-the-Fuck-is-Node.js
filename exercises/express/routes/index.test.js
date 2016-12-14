var app = require('.');
var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();
chai.use(chaiHttp);
describe('Simple route testing', function() {
	var user = {
		id: 2,
		name: 'goku'
	}
	it('GET', function(done) {
	  chai.request(app)
	    .get('/user')
	    .set('auth-token', 'asd2342l3j4lj234')
	    .end(function(err, res) {
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.should.have.property('id');
	      res.body.should.have.property('name');
	      res.body.id.should.equal(1);
	      res.body.name.should.equal('Cesar');
	      done();
	    });
	});
	it('POST', function(done) {
	  chai.request(app)
	    .post('/user')
	    .set('auth-token', 'asd2342l3j4lj234')
	    .send(user)
	    .end(function(err, res) {
	      res.should.have.status(201);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.should.have.property('id');
	      res.body.should.have.property('name');
	      res.body.id.should.equal(user.id);
	      res.body.name.should.equal(user.name);
	      done();
	    });
	});
	it('PUT', function(done) {
	  chai.request(app)
	    .put('/user/'+user.id)
	    .set('auth-token', 'asd2342l3j4lj234')
	    .send(user)
	    .end(function(err, res) {
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.should.have.property('id');
	      res.body.should.have.property('name');
	      res.body.id.should.equal(user.id);
	      res.body.name.should.equal(user.name);
	      done();
	    });
	});
	it('DELETE', function(done) {
	  chai.request(app)
	    .del('/user/'+user.id)
	    .set('auth-token', 'asd2342l3j4lj234')
	    .end(function(err, res) {
	      res.should.have.status(200);
	      done();
	    });
	});
});

