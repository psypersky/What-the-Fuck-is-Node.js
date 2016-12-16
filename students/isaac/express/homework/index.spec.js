const app = require('.');

const chai = require('chai');

const chaiHttp = require('chai-http');

const dirtyChai = require('dirty-chai');

chai.use(chaiHttp);

chai.use(dirtyChai);

chai.should();

describe('user crud and login', () => {
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
    it('creating user 1', (done) => {
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
    it('creating user 2', (done) => {
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
    it('user 1 login', (done) => {
        chai.request(app)
            .post('/auth')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('user 2 login', (done) => {
        chai.request(app)
            .post('/auth')
            .send(user2)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('getting user 1', (done) => {
        chai.request(app)
            .get(`/user/${user.id}`)
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
    it('getting user 2', (done) => {
        chai.request(app)
            .get(`/user/${user2.id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json();
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.id.should.equal(user2.id);
                res.body.email.should.equal(user2.email);
                res.body.name.should.equal(user2.name);
                done();
            });
    });
    it('updating user1', (done) => {
        const name = 'Super Supersaiyajin';
        chai.request(app)
            .put(`/user/${user.id}`)
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
    it('deleting user 1', (done) => {
        chai.request(app)
            .del(`/user/${user.id}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Try getting user 1', (done) => {
        chai.request(app)
            .get(`/user/${user.id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
