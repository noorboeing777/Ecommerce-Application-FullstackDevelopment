var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
	name:{type:String,required:true},
	email:{type:String},
	username:{type:String,required:true},
	password:{type:String,required:true},
	orders:[
		{
			title:{type:String,required:true},
			price:{type:Number},
		}
	],
	wishlist:[
		{
			title:{type:String,required:true},
			desc:{type:String,required:true},
			category:{type:String,required:true},
			price:{type:Number},
			discount:{type:Number},
			image:{type:String},
			type: {type:String}
		}
	],
	admin: {type:Number}
	
})

 module.exports = mongoose.model('User',UserSchema)