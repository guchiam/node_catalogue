var Product = require('../models/product.js'),
    mongoose = require('lib/mongoose'),
    HttpError = require('error').HttpError;
    CatalogValidationError = require('error').CatalogValidationError;

var controller = function() {

    var perPage = 10;

    this.getByOneProduct = function (req, res, next) {console.log(req.params.id);

        var params = (mongoose.Types.ObjectId.isValid(req.params.id)) ? {_id:req.params.id} : {slug:req.params.id};

        Product.find(params, function(err, product) {

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
        var id = req.params.id;

        Product.findById(id, function(err, product) {
            if (err) return next(err);

            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('price', 'Price is required').notEmpty();
            req.checkBody('topic_id', 'Topic is not found').notEmpty().isMongoId();

            req.asyncValidationErrors().then(function(){

                product.title = req.body.title;
                product.topic_id = req.body.topic_id;
                product.slug = req.body.title;
                product.price = req.body.price;
                product.description = req.body.description;
                product.photos = req.body.photos;
                product.thumbnail = req.body.thumbnail;
                product.properties = req.body.properties;
                product.save(function(err){
                    if (err) return next(err);
                    res.json({ error: '', data: {message: "Product has been successfully updated.", product : product} });
                });

            }).catch(function(errors) {
                return next(new CatalogValidationError(400, errors));
            });
        });
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
        var page = Math.max(0, req.query.page);

        Product.find()
            .limit(perPage)
            .skip(perPage * page)
            .sort({
                title: 'asc'
            })
            .exec(function(err, products) {
                if (err) return next(err);
                res.json({ error: '', data: products });
            });

    }

};

module.exports = new controller();