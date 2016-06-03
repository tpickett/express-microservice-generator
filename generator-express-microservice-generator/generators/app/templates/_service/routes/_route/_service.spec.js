'use strict';

const should = require('should'),
  assert = require('assert'),
  BPromise = require('bluebird'),
  path = require('path'),
  Waterline = require('waterline'),
  bodyParser = require('body-parser'),
  Express = require('express')(),
  request = require('supertest'),
  _ = require('lodash'),
  glob = BPromise.promisifyAll(require('glob')),
  diskAdapter = require('sails-disk'),
  memoryAdapter = require('sails-memory'),
  <%= microserviceName %>_name = "test";

  var waterline = new Waterline();
  var config = {
      adapters: {
          'diskAdapter': diskAdapter,
          'memoryAdapter': memoryAdapter
      },
      connections: {
          'default': {
              adapter: 'diskAdapter'
          },
          'mongo': {
              adapter: 'memoryAdapter'
          }
      }
  };

suite('<%= microserviceName %>', function () {

    setup(function (done) {
        //require all the models for testing
        globAsync(`${path.join( __dirname, '../', '../' ) )}/routes/**/*.model.js`, files => {
             return files.forEach( file => waterline.loadCollection(
                 require( path.join( __dirname, file ) ) )
             );
	    })
        .then( () => {
            //startup waterline
            waterline.initialize(config, function  (err, ontology) {
                if (err) {
                    return done(err);
                }
                done();
            });
        })
        .catch( error => console.error(error) );
    });

    teardown(function () {
        var adapters = config.adapters || {};
        var promises = [];

        Object.keys(adapters)
            .forEach(function (adapter) {
                if (adapters[adapter].teardown) {
                    var promise = new Promise(function (resolve) {
                        adapters[adapter].teardown(null, resolve);
                    });
                    promises.push(promise);
                }
            });

        return Promise.all(promises);
    });

    suite('unit tests', () => {
        test('should be able to create <%= microserviceName %>', function () {
            var <%= microserviceName %> = waterline.collections['<%= microserviceName %>'];

            return <%= microserviceName %>.create({
                '<%= microserviceName %>_name': <%= microserviceName %>_name
            })
            .then(function (doc) {
                assert.equal(doc['<%= microserviceName %>_name'], <%= microserviceName %>_name, 'should have set <%= microserviceName %> name');
            });
        });
    });

    suite('regression tests', () => {
        setup( done => {
            //setup the mock express server
            Express.use(bodyParser.json());
            Express.use(bodyParser.urlencoded({
              extended: false
            }));
            Express.locals.models = waterline.collections;
            //configure routes
            Express.use('/api', require(path.join(__dirname, '<%= microserviceName %>.router.js')));
            Express.listen(8082);
            done();
        });

        test('should return 406 if \'<%= microserviceName %>_name\' key isn\'t in POST body', () => {
            return request("http://localhost:8082")
               .post('/api/<%= microserviceName %>')
               .set('Accept', 'application/json')
               .send({})
               .expect(406)
               .end( (err, res) => {
                 if (err) {
                   throw err;
                 }
               });
        });
    });
});
