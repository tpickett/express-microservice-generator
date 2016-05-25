'use strict';

const Purest = require("purest"),
	comms_check = require('./comms.json');

class Communications{
	constructor(){
		this.rest = new Purest({
				provider:'torch',
				promise:true,
				config: comms_check
			});
	}
	middleware(){
		return (req, res, next)=>{
			res.communications = {rest:this.rest};
		// res.communications.rest.query()
			// .get('accounts')
			// .auth("54352")
			// .request()
			// .spread((res, body) => {
			//      return console.info(body)
			//  })
			return next();
		}
	}
}

module.exports = exports = Communications;