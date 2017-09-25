var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require('./models');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.render('index');
});

app.post('/links', function(req, res) {
    var newLink = req.body.longUrl;
    db.link.create({
        url: newLink
    }).then(function(data) {
        res.render('show');
    }).catch(function(error) {
        return res.send(error);
    });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;