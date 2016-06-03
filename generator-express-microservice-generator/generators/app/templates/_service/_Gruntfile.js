'use strict';

var path = require('path');

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Load grunt tasks automatically, when needed
  require('load-grunt-config')(grunt, {
        // path to task.js files, defaults to grunt dir
        configPath: path.join(process.cwd(), 'grunt'),
        // auto grunt.initConfig
        init: true,
        data: {
          pkg: grunt.file.readJSON('package.json')
        }
  });
}