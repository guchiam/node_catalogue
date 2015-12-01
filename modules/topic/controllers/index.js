var Topic = require('../models/topic.js'),
    HttpError = require('error').HttpError;
    ValidationError = require('error').ValidationError;

var controller = function() {

    this.get = function (req, res, next) {
        Topic.findById(req.params.id, function(err, topic) {

            if (err) return next(err);

            res.json({ error: '', data: topic});
        });
    },

    this.create = function (req, res, next) {

        req.checkBody('name', 'Name of topic is required').notEmpty();
        req.checkBody('parent_id', 'Parent topic is not found').optional().isMongoId();

        req.asyncValidationErrors().then(function(){

            var theTopic = new Topic({name:req.body.name, parent_id:req.body.parent_id});
            theTopic.save(function(err, theTopic){
                if (err) return next(err);

                res.json({ error: '', data: {message: "Topic has been successfully created.", topic : theTopic} });
            });
        }).catch(function(errors) {
            return next(new ValidationError(400, errors));
        });
    },

    this.update = function (req, res, next) {
        var id = req.params.id;

        Topic.findById(id, function(err, topic) {
            if (err) return next(err);

            req.checkBody('name', 'Name of topic is required').notEmpty();
            req.checkBody('parent_id', 'Parent topic is not found').optional().isMongoId();

            req.asyncValidationErrors().then(function(){

                topic.name = "aaa";
                topic.save(function(err){
                    if (err) return next(err);
                    res.json({ error: '', data: {message: "Topic has been successfully updated.", topic : topic} });
                });

            }).catch(function(errors) {
                return next(new ValidationError(400, errors));
            });
        });
    },

    this.delete = function (req, res, next) {
        var id = req.params.id;

        Topic.findById(id, function(err, topic) {
            if (err) return next(err);

            topic.findCountChild(function(err, count){
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

    this.list = function (req, res, next) {
        Topic.find({}, function(err, topics) {
            if (err) return next(err);
            res.json({ error: '', data: topics });
        });
    },

    this.subtopics = function (req, res, next) {

        Topic.find({"parent_id": req.params.id}, function(err, topics) {
            if (err) return next(err);
            res.json({ error: '', data: topics });
        });
    }

};

module.exports = new controller();