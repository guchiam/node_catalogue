var router     = require("express").Router();
var controller = require("./controllers/index");

router.get('/topics', controller.list);
router.get('/topics/:id', controller.get);
router.get('/topics/:id/products', controller.getproducts);
router.get('/topics/:id/subtopics', controller.subtopics);
router.post('/topics', controller.create);
router.delete('/topics/:id', controller.delete);
router.patch('/topics/:id', controller.update);

module.exports = router;