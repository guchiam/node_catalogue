var HttpError = require('error').HttpError,
    ValidationError = require('error').ValidationError,
    mongoose = require('lib/mongoose');

module.exports = function(app) {
    app.use(require("modules/topic/router"));

    app.use(errorHandler);

    function errorHandler(err, req, res, next) {

        if (err instanceof HttpError){
            res.status(err.status).json({ error: err.message, data: '' });
        } else if (err instanceof ValidationError){
            res.status(err.status).json({ error: err.message, data: '' });
        } else if (err instanceof mongoose.Error.CastError){
            res.status(404).json({ error: err.message, data: '' });
        } else {
            res.status(500).json({ error: err.message, data: '' });
        }
    }

};
