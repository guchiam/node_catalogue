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
        type: Number/*, // Price (decimal)
        get: getPrice,
        set: setPrice*/
    },
    description: {
        type: String,
        trim: true
    },
    photos: [{
        url: String, // Photo urls list
        created: {
            type: Date,
            default: Date.now
        }
    }],
    thumbnail: {
        type: String,
        trim: true
    },
    properties: [{ // Properties list (key=>value)
        key: {
            type: String,
            required: true,
            index: {
                unique: true,
                sparse: true
            }
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

// TODO: do it with anonim function
function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

function getSlug(slug){
    return slug;
}

function setSlug(slug){
    return slug.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

var Product  = mongoose.model('Product', productSchema);

module.exports = Product;
/*
Product.schema.path('title').validate(function (value, respond) {
    Product.findOne({ title: value }, function (err, product) {
        console.log(respond);
        if(product) respond(false);
    });
}, 'This title is already used');*/
/*Methods for listing must support sorting also.*/