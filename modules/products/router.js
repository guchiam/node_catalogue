var router     = require("express").Router();
var controller = require("./controllers/index");

router.get('/products', controller.list);
router.get('/products/:id', controller.getByOneProduct);
router.post('/products', controller.create);
router.delete('/products/:id', controller.delete);
router.patch('/products/:id', controller.update);

module.exports = router;