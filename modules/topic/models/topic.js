var mongoose = require('lib/mongoose');

var topicSchema = mongoose.Schema({
    name: {
        type: String,
        pnique: true,
        required: true,
        trim: true
    },
    parent_id: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
        default: null
    },
    created: {
        type: Date,
        default: Date.now
    }
});


var Topic  = mongoose.model('Topic', topicSchema);

module.exports = Topic;
