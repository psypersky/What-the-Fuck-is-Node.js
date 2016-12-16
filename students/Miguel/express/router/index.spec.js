const app = require('./index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');

chai.use(chaiHttp);
chai.use(dirtyChai);
chai.should();

describe('Simple route testing', function() {
  const user = {
    name: "Angel"
  };
  it('GET', function(done) {
    chai.request(app)
        .get("/user/1")
        .set("auth-token", "hololololo")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json();
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.id.should.be.equal(1);
          res.body.name.should.be.equal('Migue');
          done();
        });
  });

  it('POST', function(done) {
    chai.request(app)
        .post("/user")
        .set("auth-token", "hololololo")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json();
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.name.should.be.equal(user.name);
          user.id = res.body.id;
          done();
        });
  });

  it('PUT', function(done) {
    chai.request(app)
        .put("/user/${user.id}")
        .set("auth-token", "hololololo")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json();
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.id.should.be.equal(user.id);
          res.body.name.should.be.equal(user.name);
          done();
        });
  });

  it('DELETE', function(done) {
    chai.request(app)
        .delete("/user/${user.id}")
        .set("auth-token", "hololololo")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });
});
