var router     = require("express").Router();
var controller = require("./controllers/index");

router.post('/categories', controller.create);

module.exports = router;