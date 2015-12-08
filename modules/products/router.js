var router     = require("express").Router();
var controller = require("./controllers/index");

router.get('/products', controller.list); // Get list of products with pagination
router.get('/product/:id', controller.getById);
router.get('/product/:slug', controller.getBySlug); // Get product info by slug (slug equals to tranliterated title for using in urls)
router.post('/product', controller.create);
router.delete('/product/:id', controller.delete); //Delete product (disable only)
router.patch('/product/:id', controller.update);

module.exports = router;