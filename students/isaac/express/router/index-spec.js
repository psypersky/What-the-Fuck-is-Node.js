const app = require('.');

const chai = require('chai');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');

chai.use(chaiHttp);

chai.use(dirtyChai); // use plugins

chai.should(); // activates should

describe('Simple route testing', () => {
  const user = {
    name: 'goku'
  };

  it('testing GET', (done) => {
    chai
      .request(app)
      .get('/user/1')
      .set('auth-token', '12345')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.id.should.equal(1);
        res.body.name.should.equal('Isaac');
        done();
      });
  });

  it('testing POST', (done) => {
    chai
      .request(app)
      .post('/user')
      .send(user)
      .set('auth-token', '12345')
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json();
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.name.should.equal(user.name);
        user.id = res.body.id;
        done();
      });
  });

  it('testing PUT', (done) => {
    user.name = 'Juan';
    chai
      .request(app)
      .put(`/user/${user.id}`)
      .set('auth-token', '12345')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.id.should.equal(user.id);
        res.body.name.should.equal(user.name);
        done();
      });
  });

  it('testing DELETE', (done) => {
    chai
      .request(app)
      .del(`/user/${user.id}`)
      .set('auth-token', '12345')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
