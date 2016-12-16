const app = require('.');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

chai.should();

describe('First testing 2', () => {
  it('Hello World Testing 2', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.header.should.have.property('access-controll-allow-origin');
        res.header['access-controll-allow-origin'].should.equal('*');
        res.text.should.equal('Hello World!');
        done();
      });
  });
});