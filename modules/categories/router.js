var router = require("express").Router();
var controller = require("./index");

router.put('/categories', controller);

module.exports = router;