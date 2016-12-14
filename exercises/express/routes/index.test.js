const app = require('.');

const chai = require('chai');

const chaiHttp = require('chai-http');

const dirtyChai = require('dirty-chai');

chai.use(chaiHttp);

chai.use(dirtyChai);

chai.should();

describe('Simple route testing', () => {
    const user = {
        id: 2,
        name: 'goku',
    };
    it('GET', (done) => {
        chai.request(app)
        .get('/user')
        .set('auth-token', 'asd2342l3j4lj234')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json();
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.id.should.equal(1);
            res.body.name.should.equal('Cesar');
            done();
        });
    });
    it('POST', (done) => {
        chai.request(app)
        .post('/user')
        .set('auth-token', 'asd2342l3j4lj234')
        .send(user)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json();
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.id.should.equal(user.id);
            res.body.name.should.equal(user.name);
            done();
        });
    });
    it('PUT', (done) => {
        chai.request(app)
        .put(`/user/${user.id}`)
        .set('auth-token', 'asd2342l3j4lj234')
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
    it('DELETE', (done) => {
        chai.request(app)
        .del(`/user/${user.id}`)
        .set('auth-token', 'asd2342l3j4lj234')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});

