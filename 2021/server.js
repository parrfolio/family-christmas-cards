var express = require('express');
var app = express();

var _root = __dirname;

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.render("index.html");
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
    // console.log(_root + '/index.html');
});
