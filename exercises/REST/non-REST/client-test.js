const request = require('supertest');
const { assert, expect, should } = require('chai');
const server = require('./server');

const agent = request.agent(server);

describe('Server', function() {

  describe('static pages', function() {
    it('should return the main page when logged out', (done) => {
      agent
      .get('/')
      .expect(200)
      .expect(textBodyContains('My great web page'))
      .expect('Content-Type', /text\/html/)
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
    });
  });

  describe('login', function() {
    it('should reject invalid logins', (done) => {
      agent
      .post('/login')
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect({
        status: 'fail',
        data: { user: 'User or password invalid' }
      })
      .end(done);
    });

    it('should login valid users', (done) => {
      agent
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'Ruben',
        password: '1234',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({
        status: 'success',
        data: {
          user: {
            id: 'rSru6X/[[5MBVN&uB`}V;_&^D<-3sq',
            username: 'Ruben',
            password: '1234',
          }
        }
      })
      // TODO: Check the cookies
      .end(done);
    });

    it('should redirect logged users to /user', (done) => {
      agent
      .get('/')
      //.expect(textBodyContains('My great web page'))
      .expect('Content-Type', /text\/html/)
      .expect((res) => console.log(res.text))
      .end(done);
    });

  });

});



function textBodyContains(text) {
  return (res) => {
    if (!~res.text.indexOf(text)) {
      throw new Error(`Body does not contains the text '${text}'`);
    }
  }
}
