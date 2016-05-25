process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HTTP_PORT = process.env.HTTP_PORT || 80;
process.env.COMM_URL = process.env.COMM_URL || 'redis://service-comms:6379'<% if (dataSource) { %>
<% if (mongo) { %>process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017';<% } %>
<% if (mysql) { %>process.env.MYSQL_HOST = process.env.MYSQL_HOST || process.env.MYSQL_PORT_3306_TCP_ADDR || 'localhost';
process.env.MYSQL_PORT = process.env.MYSQL_PORT || process.env.MYSQL_PORT_3306_TCP_PORT || '3306';<% } %>
<% if (redis) { %>process.env.REDIS_HOST = process.env.REDIS_HOST || process.env.REDIS_PORT_6379_TCP_ADDR || 'localhost';
process.env.REDIS_PORT = process.env.REDIS_PORT || process.env.REDIS_PORT_6379_TCP_PORT || '6379';<% } %>
<% if (postgres) { %>process.env.POSTGRES_HOST = process.env.POSTGRES_HOST || process.env.POSTGRES_PORT_5432_TCP_ADDR || 'localhost';
process.env.POSTGRES_PORT = process.env.POSTGRES_PORT || process.env.POSTGRES_PORT_5432_TCP_PORT || '5432';<% } %>
<% if (etcd) { %>process.env.ETCD_HOST = process.env.ETCD_HOST || process.env.ETCD_PORT_4001_TCP_ADDR || 'localhost';
process.env.ETCD_PORT = process.env.ETCD_PORT || process.env.ETCD_PORT_4001_TCP_PORT || '4001';<% } %><% } %>

var express = require('express'),
	Express = express(),
	config = require('./config/express.config')(Express);

//start Express server
Express.listen(process.env.HTTP_PORT, () => {
	//configure Torch Express Server
	console.info('Torch <%= kebabName %> service listening for requests', {
        port: process.env.HTTP_PORT,
        enviroment: Express.get('env'),
    });
});
exports = module.exports = Express;
