var config = module.exports,
   PRODUCTION = process.env.NODE_ENV === "dev";

config.main = {
    port: process.env.EXPRESS_PORT || 3000,
    ip: "127.0.0.1"
};

config.mongodb = {
    db: 'mongodb://localhost/lrn_catalogue'
};

if (PRODUCTION) {
    config.main.ip = "0.0.0.0";
}