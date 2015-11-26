var mongoose = require('mongoose'),
    config   = require('/config/index.js');

var db = mongoose.connection;

var Topic = mongoose.Schema({
    name: String
});

Topic.methods.create = function(){
    console.log("Test create");
    console.log(this.get('name'));
};

mongoose.connect(config.mongodb.db);
