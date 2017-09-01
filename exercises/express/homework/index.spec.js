const app = require('.');

const chai = require('chai');

const chaiHttp = require('chai-http');

const dirtyChai = require('dirty-chai');

chai.use(chaiHttp);

chai.use(dirtyChai);

chai.should();

describe('Simple route testing', () => {
    const user = {
        name: 'goku',
        email: 'goku@capsulecorp.com',
        password: 'asd123',
    };
    const user2 = {
        name: 'vegeta',
        email: 'vegeta@capsulecorp.com',
        password: 'vegeta1',
    };
    let token = '';
    it('POST', (done) => {
        chai.request(app)
            .post('/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json();
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.email.should.equal(user.email);
                res.body.name.should.equal(user.name);
                user.id = res.body.id;
                done();
            });
    });
    it('POST', (done) => {
        chai.request(app)
            .post('/user')
            .send(user2)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json();
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.email.should.equal(user2.email);
                res.body.name.should.equal(user2.name);
                user2.id = res.body.id;
                done();
            });
    });
    it('GET', (done) => {
        chai.request(app)
            .get(`/user/${user.id}`)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('POST', (done) => {
        chai.request(app)
            .post('/auth')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json();
                res.body.should.be.a('object');
                res.body.should.have.property('auth-token');
                token = res.body['auth-token'];
                done();
            });
    });
    it('GET', (done) => {
        chai.request(app)
            .get(`/user/${user.id}`)
            .set('auth-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json();
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.id.should.equal(user.id);
                res.body.email.should.equal(user.email);
                res.body.name.should.equal(user.name);
                done();
            });
    });
    it('PUT', (done) => {
        const name = 'Super Supersaiyajin';
        chai.request(app)
            .put(`/user/${user.id}`)
            .set('auth-token', token)
            .send({ name })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json();
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.id.should.equal(user.id);
                res.body.name.should.equal(name);
                done();
            });
    });
    it('DELETE', (done) => {
        chai.request(app)
            .del(`/user/${user.id}`)
            .set('auth-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('GET', (done) => {
        chai.request(app)
            .get(`/user/${user.id}`)
            .set('auth-token', token)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
