var Product = require('../models/product.js'),
    HttpError = require('error').HttpError;
    ValidationError = require('error').ValidationError;

var controller = function() {

    this.getById = function (req, res, next) {
    },

    this.getBySlug = function (req, res, next) {
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
        }).catch(function(errors) {console.log(errors);
            return next(new ValidationError(400, errors));
        });

        /*Product properties:
         Title (unique)
         Slug (transliterated title, unique)
         Price (decimal)
         Description
         Photo urls list
         Thumbnail url
         Properties list (key=>value)
         */
    },

    this.update = function (req, res, next) {
    },

    this.delete = function (req, res, next) {
    },

    this.list = function (req, res, next) {
    }

};

module.exports = new controller();