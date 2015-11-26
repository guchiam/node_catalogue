var Topic = require('../models/topic.js');

var controller = function() {};

controller.prototype = {
    get: function (req, res) { // get topic by id

    },
    create: function (req, res) { // create new topic
        //res.send('Test need testing!');
        //var theTopic = new Topic({name:'', parent_id:'5656f6acd54110f62fd2155c'});
        //theTopic.save(function(err, theTopic, affected){
        //    console.log(err, theTopic, affected);
        //});
        //console.log(theTopic.get('name'));
        //console.log(theTopic.get('_id'));

        console.log(req.body);
        res.json({ message: 'hooray! welcome to our api!' });
        //res.status(500).json({msg: error.message});
    },
    update: function (req, res) { // update topic by id

    },
    delete: function (req, res) { //delete topic

    },
    list: function (req, res) { // get all topics list

    }
};

module.exports = new controller();