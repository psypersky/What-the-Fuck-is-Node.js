const app = require('.');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');

chai.use(chaiHttp);

chai.use(dirtyChai);

chai.should();

describe('CORE testing', () => {
  it('Core testing', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.header.should.have.property('access-controll-allow-origin');
        res.header['access-controll-allow-origin'].should.equal("*");
        res.text.should.equal("Hello World!");
        done();
      });
  })
});
