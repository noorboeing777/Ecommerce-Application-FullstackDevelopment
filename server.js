var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('express-session')
var validator = require('express-validator')
var fileUpload = require('express-fileupload')
var flash = require('connect-flash')
var async = require('async')
var path = require('path')
var app = express()
var MongoStore = require('connect-mongo')(session)
var passport = require('passport')
const compression = require('helmet')
const helmet = require('helmet')
//connect
mongoose.Promise = global.Promise
 mongoose.connect('mongodb://localhost/ecom', {useMongoClient: true})


//view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

 app.use(validator());
app.use(session({
	secret:'mybaap',
	resave:false,
	saveUninitialized:false,
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	cookie:{maxAge: 180*60*1000}
	
}))

app.use(flash());
app.use(function(req,res,next){
	res.locals.session = req.session
	next()
})

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.get('*', function(req,res,next) {
   res.locals.cart = req.session.cart;

   next();
});
//set routes
require('./controller/pages')(app)
require('./controller/cart')(app)
require('./controller/user')(app)
require('./controller/admin_cat')(app)
require('./controller/admin_brand')(app)
require('./controller/admin_type')(app)
require('./controller/adminProducts')(app)
var port = 3000;
app.listen(port,()=>{
	console.log('connected on port')
})