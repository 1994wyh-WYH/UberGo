const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
	_id:{
	type:String,
	required: true
	},
	restaurant_name: {
	type:String,
	required: true
	},
	rating: {
	type: Number,
	required: true	
	},
	latitude: {
	type: Number,
	required: true
	},
	longitude: {
	type: Number,
	required: true
	}
	});
const Restaurant = module.exports = mongoose.model('Restaurant', RestaurantSchema);
