'use strict';

var Promise = require('bluebird'),
	_ = require('lodash'),
	express = require('express'),
	expressWinston = require('express-winston'),
	path = require('path'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	root_path = path.normalize(path.join(__dirname, "../")),
	winston = require('./winston.config'),
	communications = new (require('./communications')),
	compression = require('compression'),
	healthRouter = require(`${root_path}/routes/health/health.router`),
	<% if (dataSource) { %>database = require(`${root_path}/config/database.config`),<% } %>
	<%= camelName %>Router = require(`${root_path}/routes/<%= kebabName %>/<%= camelName %>.router`);

class ExpressConfig{
	constructor(Express){
		this.Express = Express;<% if (dataSource) { %>
        database.loadModels()
			.then(()=>{
				return database.connectAdapters();
			})
        	.then((models)=>{
        		this.Express.locals.models = models.collections;
        		return;
        	})
        	.then(()=>{
        		this.Express.use(morgan('combined'));
				this.Express.use(bodyParser.json());
				this.Express.use(communications.middleware())
				this.Express.use(bodyParser.urlencoded({
				    extended: true
				}));
				this.Express.use(expressWinston.logger({
		            winstonInstance: winston,
		            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
		            msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
		            expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
		            colorStatus: true // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
		        }));
		        this.Express.use(compression())
		        this.Express.use(healthRouter);
				this.Express.use(<%= camelName %>Router);
        		return;
        	})
        	.catch((e)=>{
        		return console.error(e.message);
        	})
		<% } %>
	}
}

module.exports = function(Express){
	return new ExpressConfig(Express);
}