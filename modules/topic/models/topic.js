var mongoose = require('lib/mongoose');

var topicSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
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

topicSchema.methods.findChild = function (cb) {
    return this.model('Topic').find({"parent_id": this._id}, cb);
};

var Topic  = mongoose.model('Topic', topicSchema);

module.exports = Topic;
