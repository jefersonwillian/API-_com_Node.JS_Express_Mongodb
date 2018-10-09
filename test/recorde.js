var chai = require('chai');
var server = require('../index');
var chaiHttp = require('chai-http');
var Recorde = require('../models/recorde');
var should = chai.should();

chai.use(chaiHttp);

var id = '5bbbe9f9bbed3f155c0d29bd';
var token = '3ab94cd403efaf571cddab96e7b7103c2fbb0626ca3764127043bc4d3c6aeb4c3eaff0010b45699d46030e01bb7c8cd1c47fbf97b015511a8769e78ec0a0b88d';

describe('Recorde', function(){

	

	before(function(next){
		Recorde.remove({}, function(err){
			next();
		});
	});
});

it('Novo Recorde', function(){
	var novoRecorde = {
		username: "jeferson",
		recorde: 1000
	};

	chai.request(server)
	.post('/recorde')
	.send(novoRecorde)
	.end(function(err, res){

		res.should.have.status(200);
		res.body.should.have.property('recorde');

		res.body.recorde.should.have.property('_id');
		res.body.recorde.should.have.property('token');
		res.body.recorde.should.have.property('username');
		res.body.recorde.should.have.property('recorde');

		res.body.recorde.username.should.be.equal('jeferson');
		res.body.recorde.recorde.should.be.equal(1000);

		token = res.body.recorde.token;
		id = res.body.recorde._id;

		done();
	});
});

it('Pegar Recorde pelo Id', function(){

	chai.request(server)
	.get('/recorde/id/' + id)
	.end(function(err, res){
		res.should.have.status(200);
		res.body.should.have.property('recorde');

		res.body.recorde.should.have.property('_id');
		res.body.recorde.should.have.property('username');
		res.body.recorde.should.have.property('recorde');

		res.body.recorde.username.should.be.equal('jeferson');
		res.body.recorde.recorde.should.be.equal(1000);


		done();
	});
});

it('Pegar recorde pelo token', function(){
	
	chai.request(server)
	.get('/recorde/token/' + token)
	.end(function(err, res){
		res.should.have.status(200);
		res.body.should.have.property('recorde');

		res.body.recorde.should.have.property('_id');
		res.body.recorde.should.have.property('username');
		res.body.recorde.should.have.property('recorde');

		res.body.recorde.username.should.be.equal('jeferson');
		res.body.recorde.recorde.should.be.equal(1000);


		done();
	});
});

it('Alterar recorde - recorde menor', function(){
	var recordeAlterado = {
		token: token,
		recorde: 900
	}

	chai.request(server)
	.put('/recorde')
	.send(recordeAlterado)
	.end(function(err, res){
		res.should.have,status(200);
		res.body.should.have.property('recorde');

		res.body.recorde.should.have.property('_id');
		res.body.recorde.should.have.property('token');
		res.body.recorde.should.have.property('username');
		res.body.recorde.should.have.property('recorde');

		res.body.recorde.username.should.be.equal('jeferson');
		res.body.recorde.recorde.should.be.equal(1000);

		done();
	});
});

it('Alterar recorde - recorde maior', function(){
	var recordeAlterado = {
		token: token,
		recorde: 1200
	}

	chai.request(server)
	.put('/recorde')
	.send(recordeAlterado)
	.end(function(err, res){
		res.should.have,status(200);
		res.body.should.have.property('recorde');

		res.body.recorde.should.have.property('_id');
		res.body.recorde.should.have.property('token');
		res.body.recorde.should.have.property('username');
		res.body.recorde.should.have.property('recorde');

		res.body.recorde.username.should.be.equal('jeferson');
		res.body.recorde.recorde.should.be.equal(1200);

		done();
	});
});