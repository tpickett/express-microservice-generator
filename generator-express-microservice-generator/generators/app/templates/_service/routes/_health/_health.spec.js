var should = require('should'),
  assert = require('assert'),
  bodyParser = require('body-parser'),
  Express = require('express')(),
  request = require('supertest'),
  _ = require('lodash');


/*
 *  Health Endpoints
 */
describe('Microservice Health', function() {

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

  // Get all the vitals
  describe('Get All vitals', function() {
    it('should return an array of all the current system vitals', function(done) {
        return done();
    });
  });
});
