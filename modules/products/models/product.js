var mongoose = require('lib/mongoose'),
    CatalogValidationError = require('error').CatalogValidationError;

var productSchema = mongoose.Schema({
    title: {
        type: String,
        index: {
            unique: true,
            sparse: true
        },
        required: true,
        trim: true,
        validate: {
            validator: function(value, next) {
                var self = this;
                var promise = Product.find({"title": value});
                promise.then(function (product) {
                        if (product && self.id !== product.id) {
                            var error = new Error("Title already in use!");
                            error.msg = "Title already in use!";
                            error.http_code = 404;
                            return next(new CatalogValidationError(404, [error]));
                        }
                        return next();
                    });
            }
        }
    },
    slug: {
        type: String,
        index: {
            unique: true,
            sparse: true
        },
        required: true,
        trim: true,
        get: function(slug){
            return slug;
        },
        set: function(slug){
            return slug.toString().toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        }
    },
    price: {
        type: Number,
        get: function(num){
            return (num/100).toFixed(2);
        },
        set: function(num){
            return num*100;
        }
    },
    description: {
        type: String,
        trim: true
    },
    photos: [{
        url: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }],
    thumbnail: {
        type: String,
        trim: true
    },
    properties: [{
        key: {
            type: String,
            required: true
        },
        value: String
    }],
    topic_id: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
        default: null
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var Product  = mongoose.model('Product', productSchema);

module.exports = Product;