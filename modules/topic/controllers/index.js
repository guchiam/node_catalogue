var Topic = require('../models/topic.js'),
    mongoose = require('lib/mongoose'),
    HttpError = require('error').HttpError;

var controller = function() {};

controller.prototype = {

    get: function (req, res, next) {
        Topic.findById(req.params.id, function(err, topic) {
            if (err) {
                return next(new HttpError(404, 'Topic not found'));
            }

            res.json({ error: '', data: topic});
        });
    },

    create: function (req, res, next) {
        var name = (req.body.name) ? req.body.name : "";
        var parent_id = (req.body.parent_id) ? req.body.parent_id : null;

        Topic.findById(parent_id, function(err, topic) {
            if (err) {
                return next(new HttpError(404, 'Parent topic not found'));
            }

            var theTopic = new Topic({name:name, parent_id:parent_id});
            theTopic.save(function(err, theTopic){
                if (err) return next(err);

                res.json({ error: '', data: {message: "Topic has been successfully created.", topic : theTopic} });
            });
        });
    },

    update: function (req, res, next) {
        var id = req.params.id;
        var parent_id = (req.body.parent_id) ? req.body.parent_id : null;

        Topic.findById(parent_id, function(err, topic) {

            if (err) {
                return next(new HttpError(404, 'Parent topic not found'));
            }

            var theTopic = new Topic(req.body);
            Topic.update({"_id":id}, req.body,
                function (err) {
                    if (err) return next(err);
                    console.log(theTopic);
                    res.json({ error: '', data: {message: "Topic has been successfully updated."} });
                });
        });

    },

    delete: function (req, res, next) {
        Topic.remove({ _id: req.params.id}, function(err) {
            if (err) return next(err);
            res.json({ error: '', data: {"message": "Topic has been successfully removed."} });
        });
    },

    list: function (req, res, next) {
        Topic.find({}, function(err, topics) {
            if (err) return next(err);
            res.json({ error: '', data: topics });
        });
    },

    subtopics: function (req, res, next) {
        var theParentId = new mongoose.Types.ObjectId(req.params.id);

        Topic.find({"parent_id": theParentId}, function(err, topics) {
            if (err) return next(err);
            res.json({ error: '', data: topics });
        });
    }

};

module.exports = new controller();