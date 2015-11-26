var Topic = require('../models/topic.js');

var controller = function() {};

controller.prototype = {
    get: function (req, res, next) { // get topic by id

    },
    create: function (req, res, next) { // create new topic
        res.send('Test need testing!');
        var theTopic = new Topic({name:'hello'});
        theTopic.save();
        console.log(theTopic);
    },
    update: function (req, res, next) { // update topic by id

    },
    delete: function (req, res, next) { //delete topic

    },
    list: function (req, res, next) { // get all topics list

    }
};

module.exports = new controller();