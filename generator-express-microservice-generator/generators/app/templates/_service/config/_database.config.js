'use strict';

var Promise = require('bluebird'),
	path = require('path'),
	glob = require('glob'),
	_ = require('lodash'),
	Waterline = require('waterline'),
	root_path = path.normalize(path.join(__dirname, '../')),
    orm = new Waterline(),
    <% if (mongo) { %>mongoAdapter = require('sails-mongo'),<% } %>
    <% if (redis) { %>redisAdapter = require('sails-redis'),<% } %>
	<% if (postgres) { %>postgresAdapter = require('sails-postgresql'),<% } %>
	<% if (mysql) { %>mysqlAdapter = require('sails-mysql'),<% } %>
    diskAdapter = require('sails-disk');

class Database{
	constructor(){
		this.models = [];
		this.config = {
	          adapters: {
	            'default': diskAdapter,
	            disk: diskAdapter,
	            <% if (mongo) { %>mongo: mongoAdapter,<% } %>
				<% if (redis) { %>redis: redisAdapter,<% } %>
				<% if (postgres) { %>postgres: postgresAdapter,<% } %>
				<% if (mysql) { %>mysql: mysqlAdapter,<% } %>
	          },
	          connections: {
	            disk: {
	              adapter: 'disk'
	            }<% if (mongo) { %>,
	            mongo: {
					adapter: 'mongo',
					url: process.env.MONGO_URL
	            }<% } %><% if (redis) { %>,
	            redis: {
	                adapter: 'redis',
	                port: process.env.REDIS_PORT,
	                host: process.env.REDIS_HOST,
	                database: 0,
	                options: {
	                    // low-level configuration
	                    // (redis driver options)
	                    parser: 'hiredis',
	                    return_buffers: false,
	                    detect_buffers: false,
	                    socket_nodelay: true,
	                    no_ready_check: false,
	                    enable_offline_queue: true
	                }
	            }<% } %>
	            <% if (postgres) { %>,
	            "postgres": {
			        "adapter": "postgres",
			        "host": process.env.POSTGRES_HOST,
			        "port": process.env.POSTGRES_PORT,
			        "database": "<%=camelName%>",
				    "poolSize": 10,
				    "ssl": false
			    }<% } %>
			    <% if (mysql) { %>,
	            "mysql": {
			        "adapter": "mysql",
			        "host": process.env.MYSQL_HOST,
			        "port": process.env.MYSQL_PORT,
			        "database": "<%=camelName%>"
			    }<% } %>
	        },
	        defaults: {
	            migrate: 'safe',
	        }
	    };
	}
	loadModels(){
		return new Promise((resolve, reject) =>{
		    glob(`${root_path}/routes/**/*.model.js`, (err, files) => {
	            if (!err) {
	            	this.models = files;
	                return resolve();
	            } else {
	                //problem finding files
	                return reject('can\'t require route files!')
	            }
		    });
		});
	}
	connectAdapters(){
		return new Promise((resolve, reject) =>{
            // Load the Models into the ORM
			_.forEach(this.models, (filepath) => {
                orm.loadCollection(require(filepath));
            });
	        // Start Waterline passing adapters in
	        orm.initialize(this.config, function(err, models) {
				if(err) {
				    return reject(new Error(err));
				}else{
					return resolve(models);
				}
	        });
	    })
	}
}

module.exports = new Database;