var HttpError = require('error').HttpError,
    CatalogValidationError = require('error').CatalogValidationError,
    mongoose = require('lib/mongoose');

module.exports = function(app) {
    app.use(require("modules/topic/router"));
    app.use(require("modules/products/router"));

    app.use(errorHandler);

    function errorHandler(err, req, res, next) {

        if (err instanceof HttpError){
            res.status(err.status).json({ error: err.message, data: '' });
        } else if (err instanceof CatalogValidationError){
            res.status(err.status).json({ error: err.message, data: '' });
        } else if (err instanceof mongoose.Error.ValidationError){
            var message = '';
            for(var attributename in err.errors){
                message += err.errors[attributename].message + ';';
            }
            res.status(404).json({ error: message, data: '' });
        } else if (err instanceof mongoose.Error.CastError){
            res.status(404).json({ error: err.message, data: '' });
        } else {
            res.status(500).json({ error: err.message, data: '' });
        }
    }

};
