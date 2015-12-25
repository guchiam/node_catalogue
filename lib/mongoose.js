var mongoose = require('mongoose'),
    config = require('../config');

mongoose.connect(config.mongodb.db);

module.exports = mongoose;
