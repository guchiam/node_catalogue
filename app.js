var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();
app.set('port', 3000);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(app.get('port'), function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});