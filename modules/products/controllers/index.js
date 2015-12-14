var Product = require('../models/product.js'),
    HttpError = require('error').HttpError;
    CatalogValidationError = require('error').CatalogValidationError;

var controller = function() {

    this.getById = function (req, res, next) {
        Product.findById(req.params.id, function(err, product) {

            if (err) return next(err);

            res.json({ error: '', data: product});
        });
    },

    this.getBySlug = function (req, res, next) {
        Product.find({"slug": req.params.slug}, function(err, product) {

            if (err) return next(err);

            res.json({ error: '', data: product});
        });
    },

    this.create = function (req, res, next) {

        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('price', 'Price is required').notEmpty();
        req.checkBody('topic_id', 'Topic is not found').notEmpty().isMongoId();

        req.asyncValidationErrors().then(function(){

            var theProduct = new Product({
                title: req.body.title,
                topic_id: req.body.topic_id,
                slug: req.body.title,
                price: req.body.price,
                description: req.body.description,
                photos: req.body.photos,
                thumbnail: req.body.thumbnail,
                properties: req.body.properties
            });

            theProduct.save(function(err, theProduct){
                if (err) return next(err);

                res.json({ error: '', data: {message: "Product has been successfully created.", product : theProduct} });
            });
        }).catch(function(errors) {
            return next(new CatalogValidationError(400, errors));
        });
    },

    this.update = function (req, res, next) {
    },

    this.delete = function (req, res, next) {
        var id = req.params.id;

        Product.findById(id, function(err, product) {
            if (err) return next(err);

            Product.remove({ _id: req.params.id}, function(err) {
                if (err) return next(err);
                res.json({ error: '', data: {"message": "Product has been successfully removed."} });
            });
        });
    },

    this.list = function (req, res, next) {
    }

};

module.exports = new controller();