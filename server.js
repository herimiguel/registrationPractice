var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
app.use(session({secret: 'Applogin'}));

var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, './public/dist')));
app.use(bodyParser.json());

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
});