// função do express que ira gerar as rotas
var routes = require('express').Router();

// acessamos a model
var Recorde =  require('../models/recorde');

//POST adicionar um novo recorde
routes.post('/', function(req, res){
	if (!req.body.username || !req.body.recorde) {
		return res.status(422).send({error: "Faltam Dados..."});
	}
	var novoRecorde = new Recorde({
		username: req.body.username,
		recorde: parseFloat(req.body.recorde)
	});
	novoRecorde.save(function(err){
		if (err) return res.status(403).send({error: err});
		return res.send({recorde: novoRecorde});
	});
});
//GET vai pegar um recorde pelo id
routes.get('/id/:identificacao', function(req, res){
	if (!req.params.identificacao) {
		return res.status(422).send({error: "Faltam Dados..."});
	}
	Recorde.findById(req.params.identificacao).select('_id username recorde').exec(function(err, recorde){
		if (err) return res.status(403).send({error: err});
		if (!recorde) return res.status(403).send({error: "Recorde não existe para este id"});
		return res.send({recorde});
	});
});
//GET pegar um recorde pelo token
routes.get('/token/:token', function(req, res){
	if (!req.params.token) {
		return res.status(422).send({error: "Faltam Dados..."});
	}
	Recorde.findOne({
		token: req.params.token
	}).select('_id username recorde').exec(function(err, recorde){
		if (err) return res.status(403).send({error: err});
		if (!recorde) return res.status(403).send({error: "Recorde não existe para este token"});
		return res.send({recorde});
	});
});

//PUTT atualizar um recorde pelo token
routes.put('/', function(req, res){
	if (!req.body.token || !req.body.recorde){
		return res.status(422).send({error: "Faltam Dados."});
	}
	Recorde.findOne({
		token: req.body.token
	}).exec(function(err, recorde){
		if (err) return res.status(403).send({error: err});
		if (!recorde) return res.status(403).send({error: "Recorde não existe para este token"});
		if (parseFloat(req.body.recorde) > recorde.recorde) {
			recorde.recorde = parseFloat(req.body.recorde);
		}
		recorde.save(function(err){
			if (err) return res.status(403).send({error: err});
			return res.send({recorde});
		});
	});
});

module.exports = routes;