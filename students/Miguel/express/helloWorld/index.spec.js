const app = require('./index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('First testing', function() {
  it('Hello world testing', function(done) {
    chai.request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal('Hello World!');
          done();
        });
  });
});
