'use strict';

class <%= microserviceName %>{
	constructor(){

	}
	create<%= microserviceName %>(req, res){
		req.app.locals.models.<%= snakeName %>
			.create({<%= snakeName %>_name: req.body.name})
			.then((result)=>{
				return res.status(200).json(result)
			})
			.catch(e=>{
				return res.status(500).json({message: 'error processing request.'})
			})
	}
	find<%= microserviceName %>(req, res){
		req.app.locals.models.<%= snakeName %>
			.find()
			.then((results)=>{
				return res.status(200).json(results)
			})
			.catch(e=>{
				return res.status(500).json({message: 'error processing request.'})
			})
	}
	findOne<%= microserviceName %>(req, res){
		req.app.locals.models.<%= snakeName %>
			.findOne({id: req.params.ID})
			.then((result)=>{
				if(result) return res.status(200).json(result);
				else return res.status(404).json({message: 'not found'})
			})
			.catch(e=>{
				return res.status(500).json({message: 'error processing request.'})
			})
	}
	update<%= microserviceName %>(req, res){
		req.app.locals.models.<%= snakeName %>
			.update({id:req.params.ID}, req.body)
			.then((result)=>{
				if(result) return res.status(200).json(result);
				else return res.status(404).json({message: 'not found'})
			})
			.catch(e=>{
				return res.status(500).json({message: 'error processing request.'})
			})
	}
	remove<%= microserviceName %>(req, res){
		req.app.locals.models.<%= snakeName %>
			.destroy({id: req.params.ID})
			.then((result)=>{
				return res.status(200).json({removed: req.params.ID})		
			})
			.catch(e=>{
				return res.status(500).json({message: 'error processing request.'})
			})
	}
}

module.exports = <%= microserviceName %>;