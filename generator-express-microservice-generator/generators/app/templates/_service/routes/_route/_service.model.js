var Waterline = require('waterline'),
	_ = require('lodash'),
	Promise = require('bluebird'),
	modelOptions = {
	  identity: '<%= microserviceName %>',
	  tableName: '<%= microserviceName %>',
	  migrate: 'safe',
	  connection: 'disk',
	  attributes: {
	    <%= microserviceName %>_name: 'string'
	  }
	};
module.exports = Waterline.Collection.extend(modelOptions);