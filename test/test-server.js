var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('app');
var should = chai.should();

chai.use(chaiHttp);


describe('Topics', function() {
    it('should list ALL topics on /topics GET', function(done) {
        chai.request(server)
            .get('/topics')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
    it('should list a SINGLE topic on /topics/<id> GET');
    it('should add a SINGLE topic on /topics POST');
    it('should update a SINGLE topic on /topics/<id> PATCH');
    it('should delete a SINGLE topic on /topics/<id> DELETE');
    it('should list ALL child topics on /topics/<id>/subtopics GET');
    it('should list ALL products of topic on /topics/<id>/products GET');
});