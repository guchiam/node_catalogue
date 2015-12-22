var mongoose = require('lib/mongoose'),
    slugify = require('transliteration').slugify,
    CatalogValidationError = require('error').CatalogValidationError;

var productSchema = mongoose.Schema({
    title: {
        type: String,
        index: {
            unique: true,
            sparse: true
        },
        required: true,
        trim: true
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
            return slugify(slug, {lowercase: true, separator: '-'});
        }
    },
    price: {
        type: Number,
        get: function(num){
            return num;
        },
        set: function(num){
            return (parseFloat(num)).toFixed(2);
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
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

productSchema.statics.sortingFields = ['title', 'price', 'created'];
productSchema.statics.defaultOrderingField = 'title';

var Product  = mongoose.model('Product', productSchema);

module.exports = Product;