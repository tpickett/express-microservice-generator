'use strict';

const VitalSigns = new (require('vitalsigns')),
	  <%= name %> = require('./monitors/<%= kebabName %>.js');

class systemHealth{
	constructor(){
		this.vitals = VitalSigns;
		this.vitals.monitor('cpu');
		this.vitals.monitor('mem', {units: 'MB'});
		this.vitals.monitor('tick');
		this.vitals.monitor(<%= name %>);
		this.vitals.unhealthyWhen('cpu', 'usage').equals(100);
		this.vitals.unhealthyWhen('tick', 'maxMs').greaterThan(500);
		this.vitals.on('healthChange', this.change);
	}
	change(healthy, failedChecks){
		console.warn(`Server is ${(healthy ? 'healthy' : 'unhealthy')}.  Failed checks: ${failedChecks}`);
	}
}

module.exports = systemHealth;