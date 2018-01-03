var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user_model')
var bcrypt = require('bcryptjs')

module.exports = function (passport) {
	passport.use(new LocalStrategy(function (username, password, done) {

		User.findOne({'username': username}, (err, user) =>{
			if (!user) {
			return done(null)

			}
		
		bcrypt.compare(password,user.password,function(err,isMatch){
			if(isMatch){
				return done(null,user)
			}
			else {
				return done(null)
			}
		})
		})



	}))
	
	passport.serializeUser(function(user,done){
		done(null,user._id)
	})
	
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			done(err,user)
		})
	})
}
