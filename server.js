// modules =================================================
var express        	= require('express');
var bodyParser     	= require('body-parser');
var cors			= require('cors');
var helmet     		= require('helmet');
var morgan     		= require('morgan');
var mongoose       	= require('mongoose');

// define app ==============================================
var app            = express();

// configuration ===========================================
    
// config files
var db = require('./src/server/config/db');

// set our port
var port = process.env.PORT || 3001; 


// connect to our mongoDB database 
mongoose.connect(db.url, { useMongoClient: true });

// enhance your app security with Helmet
app.use(helmet());

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true })); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/dist')); 

app.set('views', __dirname + '/src/server/views');
app.set('view engine', 'jade');

// routes ==================================================
require('./src/server/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:3001
app.listen(port, function() {
console.log('Running on port ' + port);
});               

// expose app           
exports = module.exports = app;