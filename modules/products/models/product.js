var mongoose = require('lib/mongoose');

var productSchema = mongoose.Schema({
    title: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }, // Title (unique)
        required: true,
        trim: true
    },
    slug: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }, // Slug (transliterated title, unique)
        required: true,
        trim: true,
        get: getSlug,
        set: setSlug
    },
    price: {
        type: Number, // Price (decimal)
        get: getPrice,
        set: setPrice
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
        key: String,
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


/*Methods for listing must support sorting also.*/