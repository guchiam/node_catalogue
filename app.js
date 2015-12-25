var express  = require('express'),
    config   = require("./config"),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

require('./config/routers')(app);

process.on('uncaughtException', function(err) {
    console.log('Threw Exception: ', err);
    process.exit(0);
});

var server = app.listen(config.main.port, config.main.ip, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});