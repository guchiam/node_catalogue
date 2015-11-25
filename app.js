var express = require('express'),
    config = require("./config/dev"),
    mongoose = require('mongoose');

var app = express();

mongoose.connect(config.mongodb.db);


/* test**/

var Cat = mongoose.model('brand', { name: String });

var kitty = new Cat({ name: 'Zildjianhjklhjkl' });
kitty.save(function (err) {
    if (err) // ...
        console.log('meow');
});

/*---------*/

app.use(require("./modules/categories/router"));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(config.express.port, config.express.ip, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});