const app = require('.');

const chai = require('chai');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

chai.should();

describe('First testing', () => {
    it('Hello world testing', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.headers.should.have.property('access-control-allow-origin');
                res.headers['access-control-allow-origin'].should.equal('*');
                res.text.should.equal('Hello World!');
                done();
            });
    });
});
