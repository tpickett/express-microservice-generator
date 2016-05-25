var should = require('should'),
  assert = require('assert'),
  bodyParser = require('body-parser'),
  Express = require('express')(),
  request = require('supertest'),
  _ = require('lodash');


/*
 *  Account Endpoints
 */
describe('<%= microserviceName %>', function() {

  before(function(done) {
    //setup the mock express server
    Express.use(bodyParser.json());
    Express.use(bodyParser.urlencoded({
      extended: false
    }));
    return done();
  });

  after(function(done) {
    return done()
  });

  // Get all the projects
  describe('Get All <%= microserviceName %>', function() {
    it('should return an array of all the current <%= microserviceName %>', function(done) {
        return done();
    });
  });
});
