var express  = require('express'),
    config   = require("config"),
    bodyParser = require('body-parser');

var app = express();

app.use(require("./modules/topic/router"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(config.main.port, config.main.ip, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});