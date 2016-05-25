'use strict';
const yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash'),
    yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    let done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the breathtaking ${chalk.red('generator-express-microservice-generator')} generator!`
    ));

    let prompts = [{
      type: 'input',
      name: 'microserviceName',
      message: 'Name of Microservice?',
      default: 'test-service'
    },{
      type: 'input',
      name: 'author',
      message: 'Your Name',
      default: 'Developer'
    },{
      type: 'input',
      name: 'authorEmail',
      message: 'Your Email?',
      default: 'developers@test.com'
    },{
      type: 'confirm',
      name: 'includeDataSource',
      message: 'Would you like to connect to a datasource?',
      default: false
    },{
      type: "checkbox",
      message: "Data sources to connect:",
      name: "dataSources",
      choices: [
        {
          name: "Mongo",
          checked: true
        },
        {
          name: "Redis",
        },
        {
          name: "Postgres",
        },
        {
          name: "MySql",
        },
        {
          name: "Etcd",
        }
      ],
      when: (answers) =>{
        return answers.includeDataSource;
      },
      validate: (answer) =>{
        if ( answer.length < 1 ) {
          return "You must choose at least one data source.";
        }
        return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  baseApp: function(){
    this.copy(".gitignore", `${_.kebabCase(this.props.microserviceName)}/.gitignore`);
    this.copy("_service/config/winston.config.js", `${_.kebabCase(this.props.microserviceName)}/service/config/winston.config.js`);
    this.template("_docker-compose.yml", `${_.kebabCase(this.props.microserviceName)}/docker-compose.yml`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName), dataSource: this.props.includeDataSource, mongo: _.find(this.props.dataSources, source=>source == "Mongo"), redis: _.find(this.props.dataSources, source=>source == "Redis"), etcd:_.find(this.props.dataSources, source=>source == "Etcd"), postgres:_.find(this.props.dataSources, source=>source == "Postgres"), mysql:_.find(this.props.dataSources, source=>source == "MySql")});
    this.template("_Dockerfile", `${_.kebabCase(this.props.microserviceName)}/Dockerfile`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName).toUpperCase(), dataSource: this.props.includeDataSource, author: this.props.author, authorEmail:this.props.authorEmail});
    this.template("_scripts/_startup.sh", `${_.kebabCase(this.props.microserviceName)}/scripts/startup.sh`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName).toUpperCase(), dataSource: this.props.includeDataSource});
    this.template("_service/_package.json", `${_.kebabCase(this.props.microserviceName)}/service/package.json`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName), dataSource: this.props.includeDataSource, author: this.props.author, mongo: _.find(this.props.dataSources, source=>source == "Mongo"), redis: _.find(this.props.dataSources, source=>source == "Redis"), etcd:_.find(this.props.dataSources, source=>source == "Etcd"), postgres:_.find(this.props.dataSources, source=>source == "Postgres"), mysql:_.find(this.props.dataSources, source=>source == "MySql")});
    this.template("_service/_server.js", `${_.kebabCase(this.props.microserviceName)}/service/server.js`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName), dataSource: this.props.includeDataSource, mongo: _.find(this.props.dataSources, source=>source == "Mongo"), redis: _.find(this.props.dataSources, source=>source == "Redis"), etcd:_.find(this.props.dataSources, source=>source == "Etcd"), postgres:_.find(this.props.dataSources, source=>source == "Postgres"), mysql:_.find(this.props.dataSources, source=>source == "MySql")});
    this.template("_service/config/_express.config.js", `${_.kebabCase(this.props.microserviceName)}/service/config/express.config.js`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName), dataSource: this.props.includeDataSource});
    if(this.props.includeDataSource) {
      this.template("_service/config/_database.config.js", `${_.kebabCase(this.props.microserviceName)}/service/config/database.config.js`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName), dataSource: this.props.includeDataSource, mongo: _.find(this.props.dataSources, source=>source == "Mongo"), redis: _.find(this.props.dataSources, source=>source == "Redis"), etcd:_.find(this.props.dataSources, source=>source == "Etcd"), postgres:_.find(this.props.dataSources, source=>source == "Postgres"), mysql:_.find(this.props.dataSources, source=>source == "MySql")});
      this.template("_service/config/_communications.js", `${_.kebabCase(this.props.microserviceName)}/service/config/communications.js`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName), dataSource: this.props.includeDataSource, mongo: _.find(this.props.dataSources, source=>source == "Mongo"), redis: _.find(this.props.dataSources, source=>source == "Redis"), etcd:_.find(this.props.dataSources, source=>source == "Etcd"), postgres:_.find(this.props.dataSources, source=>source == "Postgres"), mysql:_.find(this.props.dataSources, source=>source == "MySql")});
      this.template("_service/config/comms.json", `${_.kebabCase(this.props.microserviceName)}/service/config/comms.json`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName), dataSource: this.props.includeDataSource, mongo: _.find(this.props.dataSources, source=>source == "Mongo"), redis: _.find(this.props.dataSources, source=>source == "Redis"), etcd:_.find(this.props.dataSources, source=>source == "Etcd"), postgres:_.find(this.props.dataSources, source=>source == "Postgres"), mysql:_.find(this.props.dataSources, source=>source == "MySql")});
    }
  },

  healthRoutes:function(){
    this.copy("_service/routes/_health/_health.spec.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/health/health.spec.js`);
    this.copy("_service/routes/_health/_health.router.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/health/health.router.js`);
    this.template("_service/routes/_health/_health.controller.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/health/health.controller.js`, {name: _.camelCase(this.props.microserviceName), kebabName: _.kebabCase(this.props.microserviceName)});
    this.template("_service/routes/_health/_monitors/_appName.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/health/monitors/${_.kebabCase(this.props.microserviceName)}.js`, {name: _.kebabCase(this.props.microserviceName)});
  },

  serviceRoutes:function(){
    this.template("_service/routes/_route/_service.spec.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/${_.kebabCase(this.props.microserviceName)}/${_.camelCase(this.props.microserviceName)}.spec.js`, this.props);
    this.template("_service/routes/_route/_service.controller.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/${_.kebabCase(this.props.microserviceName)}/${_.camelCase(this.props.microserviceName)}.controller.js`, {microserviceName: _.camelCase(this.props.microserviceName), snakeName:_.snakeCase(this.props.microserviceName)});
    this.template("_service/routes/_route/_service.router.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/${_.kebabCase(this.props.microserviceName)}/${_.camelCase(this.props.microserviceName)}.router.js`, {kebabName: _.kebabCase(this.props.microserviceName), camelName: _.camelCase(this.props.microserviceName)});
    if(this.props.includeDataSource) this.template("_service/routes/_route/_service.model.js", `${_.kebabCase(this.props.microserviceName)}/service/routes/${_.kebabCase(this.props.microserviceName)}/${_.camelCase(this.props.microserviceName)}.model.js`, {microserviceName: _.snakeCase(this.props.microserviceName)});
  },

  scaffoldComplets: function () {
    // var npmdir = `${process.cwd()}/${_.kebabCase(this.props.microserviceName)}/service`;
    // process.chdir(npmdir);
    this.log('All done. please run docker-compose up from the microservice directory to build the services!');
  }
});
