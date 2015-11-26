var mongoose = require('mongoose');

function needTest(req, res, next) {
    res.send('Test need testing!');
    var ProductCatalog = mongoose.model('brand');
    console.log(ProductCatalog);
}
module.exports = needTest;