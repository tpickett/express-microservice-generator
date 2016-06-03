module.exports = {
	dev: {
	    script  : 'server.js',
	    options : {
	      args: ['dev'],
	      nodeArgs: ['--debug'],
	      callback: function (nodemon) {
	        nodemon.on('log', function (event) {
	          console.log(event.colour);
	        });
	      },
	      ext         : 'js hjs json',
	      ignore      : ['node_modules/**'],
	      legacyWatch : false
	    }
  }
};