var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoose = require('mongoose');
var db = require('./models/db.js');
var routes = require('./routes/routes')
var user = require('./routes/user')

app.set('view engine', 'ejs');

app.use(session({
    secret: "totallyrandomsecret",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);
app.get('/login', routes.login)
app.get('/register', routes.register)
app.post('/newUser', user.createUser)
app.post('/authenticate', user.login)
app.get('/logout',user.logout)

var port = process.env.PORT || 4006;
app.listen(port, function(req, res) {
    console.log('server running at port ' + port);
})
