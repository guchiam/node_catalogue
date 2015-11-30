var router     = require("express").Router();
var controller = require("./controllers/index");;

router.get('/topics', controller.list);
router.get('/topic/:id', controller.get);
router.get('/topic/:id/subtopics', controller.subtopics);
router.post('/topic', controller.create);
router.delete('/topic/:id', controller.delete);
router.patch('/topic/:id', controller.update);

module.exports = router;