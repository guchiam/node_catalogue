var router     = require("express").Router();
var controller = require("./controllers/index");

router.get('/products', controller.list);
router.get('/product/:id', controller.getById);
router.get('/product/:slug', controller.getBySlug); // Get product info by slug (slug equals to tranliterated title for using in urls)
router.post('/product', controller.create);
router.delete('/product/:id', controller.delete);
router.patch('/product/:id', controller.update);

module.exports = router;