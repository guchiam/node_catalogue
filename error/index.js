var path = require('path'),
    util = require('util'),
    http = require('http');

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

function CatalogValidationError(status, errors) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, CatalogValidationError);

    var message = '';

    errors.forEach(function(item) { message = message + item.msg + '; '; });

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

util.inherits(CatalogValidationError, Error);
CatalogValidationError.prototype.name = 'CatalogValidationError';

exports.HttpError = HttpError;
exports.CatalogValidationError = CatalogValidationError;
