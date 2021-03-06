var Topic = require('../models/topic.js'),
    Product = require('../../products/models/product'),
    settings = require('../../../config/settings'),
    HttpError = require('../../../error').HttpError;
    CatalogValidationError = require('../../../error').CatalogValidationError;

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
            return next(new CatalogValidationError(400, errors));
        });
    },

    this.update = function (req, res, next) {
        var id = req.params.id;

        Topic.findById(id, function(err, topic) {
            if (err) return next(err);

            req.checkBody('name', 'Name of topic is required').notEmpty();
            req.checkBody('parent_id', 'Parent topic is not found').optional().isMongoId();

            req.asyncValidationErrors().then(function(){

                topic.name = req.body.name;
                topic.parent_id = req.body.parent_id;
                topic.save(function(err){
                    if (err) return next(err);
                    res.json({ error: '', data: {message: "Topic has been successfully updated.", topic : topic} });
                });

            }).catch(function(errors) {
                return next(new CatalogValidationError(400, errors));
            });
        });
    },

    this.delete = function (req, res, next) {
        var id = req.params.id;

        Topic.findById(id, function(err, topic) {
            if (err) return next(err);

            if (!topic) {
                return next(new HttpError(400, 'You have already deleted this topic.'));
            }

            topic.findCountChild(function(err, count){
                if (count > 0) {
                    return next(new HttpError(400, 'You cannot delete this topic. It has child topics'));
                } else {
                    topic.findCountProducts(function(err, count){
                        if (count > 0) {
                            return next(new HttpError(400, 'You cannot delete this topic. It has products'));
                        } else {
                            Topic.remove({ _id: req.params.id}, function(err) {
                                if (err) return next(err);
                                res.json({ error: '', data: {"message": "Topic has been successfully removed."} });
                            });
                        }
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
    },

    this.getproducts = function (req, res, next) {

        var page  = (typeof req.query.page !== 'undefined' && parseInt(req.query.page)) ? parseInt(req.query.page) : settings.pagination.firstPage,
            perPage   = (typeof req.query.perPage !== 'undefined' && parseInt(req.query.perPage)) ? parseInt(req.query.perPage) : settings.pagination.perPage,
            orderType = (
                typeof req.query.orderType !== 'undefined' &&
                req.query.orderType &&
                (settings.sortable.availableOrderTypes.indexOf(req.query.orderType) > -1)
            ) ? req.query.orderType : settings.sortable.orderType,
            order  = (
                typeof req.query.order !== 'undefined' &&
                req.query.order &&
                (Product.sortingFields.indexOf(req.query.order) > -1)
            ) ? req.query.order : Product.defaultOrderingField;

        var sortParam = {};
        sortParam[order] = orderType;

        Product.find({"topic_id": req.params.id})
            .limit(perPage)
            .skip(perPage * page)
            .sort(sortParam)
            .exec(function(err, products) {
                if (err) return next(err);
                res.json({ error: '', data: products });
            });
    }

};

module.exports = new controller();