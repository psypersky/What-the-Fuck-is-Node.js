const app = require(".");

const chai = require("chai");

const chaiHttp = require("chai-http");

const dirtyChai = require("dirty-chai");

chai.use(chaiHttp);

chai.use(dirtyChai);

chai.should();

describe("Simple route testing", () => {
  const user = {
    name: "Debbie",
  };
  it("testing GET", (done) => {
    chai.request(app)
      .get("/user/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        res.body.should.have.property("name");
        res.body.id.should.equal(1);
        res.body.name.should.equal("Sara");
        done();
      });
  });
});
