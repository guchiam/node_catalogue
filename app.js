var express  = require('express'),
    config   = require("./config/index");

var app = express();

app.use(require("./modules/topic/router"));

var server = app.listen(config.main.port, config.main.ip, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});