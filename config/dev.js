var config = module.exports;

config.express = {
    port: process.env.EXPRESS_PORT || 3000,
    ip: "127.0.0.1"
};

config.mongodb = {
    db: 'mongodb://localhost/lrn_catalogue',
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || "localhost"
};