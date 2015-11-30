var path = require('path'),
    util = require('util'),
    http = require('http');

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

function ValidationError(status, errors) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, ValidationError);

    var message = '';

    errors.forEach(function(item) { message = message + item.msg + '; '; });

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

util.inherits(ValidationError, Error);
ValidationError.prototype.name = 'ValidationError';

exports.HttpError = HttpError;
exports.ValidationError = ValidationError;
