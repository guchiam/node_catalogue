var Topic = require('../models/topic.js'),
    mongoose = require('lib/mongoose'),
    HttpError = require('error').HttpError;
    ValidationError = require('error').ValidationError;

var controller = function() {};

controller.prototype = {

    get: function (req, res, next) {
        Topic.findById(req.params.id, function(err, topic) {
            if (err || !topic) {
                return next(new HttpError(404, 'Topic not found'));
            }

            res.json({ error: '', data: topic});
        });
    },

    create: function (req, res, next) {

        req.checkBody('name', 'Name of topic is required').notEmpty();
        req.checkBody('parent_id', 'Parent topic is not found').optional().isMongoId();

        req.asyncValidationErrors().then(function(){
            var name = (req.body.name) ? req.body.name : "";
            var parent_id = (req.body.parent_id) ? req.body.parent_id : null;

            var theTopic = new Topic({name:name, parent_id:parent_id});
            theTopic.save(function(err, theTopic){
                if (err) return next(err);

                res.json({ error: '', data: {message: "Topic has been successfully created.", topic : theTopic} });
            });
        }).catch(function(errors) {
            return next(new ValidationError(400, errors));
        });
    },

    update: function (req, res, next) {
        var id = req.params.id;

        Topic.findById(id, function(err, topic) {
            if (err || !topic) {
                return next(new HttpError(404, 'Topic not found'));
            }

            req.checkBody('name', 'Name of topic is required').notEmpty();
            req.checkBody('parent_id', 'Parent topic is not found').optional().isMongoId();

            req.asyncValidationErrors().then(function(){
                Topic.update({"_id":id}, req.body,
                    function (err) {
                        if (err) return next(err);
                        console.log(topic);
                        res.json({ error: '', data: {message: "Topic has been successfully updated.", topic : topic} });
                    });
            }).catch(function(errors) {
                return next(new ValidationError(400, errors));
            });
        });
    },

    delete: function (req, res, next) {
        var id = req.params.id;

        Topic.findById(id, function(err, topic) {
            if (err || !topic) {
                return next(new HttpError(404, 'Topic not found'));
            }

            topic.findCountChild(function(err, count){
                console.log(err, count);
                if (count > 0) {
                    return next(new HttpError(400, 'You cannot delete this topic. It has child topics'));
                } else {
                    Topic.remove({ _id: req.params.id}, function(err) {
                        if (err) return next(err);
                        res.json({ error: '', data: {"message": "Topic has been successfully removed."} });
                    });
                }
            });
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
            if (err || !topic) return next(err);
            res.json({ error: '', data: topics });
        });
    }

};

module.exports = new controller();