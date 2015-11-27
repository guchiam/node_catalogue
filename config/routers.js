var HttpError = require('error').HttpError;

module.exports = function(app) {
    app.use(require("modules/topic/router"));

    app.use(errorHandler);

    function errorHandler(err, req, res, next) {
        if (err instanceof HttpError){
            res.status(err.status).json({ error: err.message, data: '' });
        } else {
            res.status(500).json({ error: err.message, data: '' });
        }
    }

};
