var User = require('../models/user_model')
var passport = require('passport')
var bcrypt = require('bcryptjs')
module.exports = (app)=>{
	  
	 app.get('/users/register',(req,res)=>{
		 res.render('register',{title:'reg'})
	 })
	

app.post('/users/register', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    

    
    

        User.findOne({'username': username}, function (err, user) {
         

            if (user) {
              
                res.redirect('/users/register');
            } else {
                var user = new User({
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    admin: 0
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);

                        user.password = hash;

                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                               
                                res.redirect('/users/login')
                            }
                        });
                    });
                });
            }
        });
    }

);
	
	 
app.get('/users/login', function (req, res) {

    if (res.locals.user) res.redirect('/');
    
    res.render('login', {
        title: 'Log in'
    });

});

/*
 * POST login
 */
app.post('/users/login', function (req, res, next) {

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    
});

/*
 * GET logout
 */
app.get('/user/logout', function (req, res) {

    req.logout();
    
    req.flash('success', 'You are logged out!');
    res.redirect('/users/login');

});
}