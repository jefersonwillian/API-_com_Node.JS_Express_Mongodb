var express = require('express');
/*Express é um framework para Node.js inspirado no Sinatra. 
Ele é minimalista, flexível e contém um robusto conjunto de 
recursos para desenvolver aplicações web, como um sistema de 
Views intuitivo (MVC), um robusto sistema de roteamento, um 
executável para geração de aplicações e muito mais.*/

var bodyParser = require('body-parser');
// Body parser é utilizado para fazer divisão entre suas requisicoes de get e post. Separa para deixar em formato JSON.

var morgan = require('morgan');
/*Um logger é uma ferramenta bastante útil para registrar 
os acessos ao nosso servidor. Morgan é tal ferramente, para 
o Express, mas que também pode ser usada no NodeJS puro, com 
apenas o módulo http para servir páginas web.*/

// conexao com banco de dados
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gerenciador');


var app = express();

/*usamos o pacote nodemon: npm install -g nodemon
O que é o Nodemon
Segundo o próprio website do Nodemon, esse módulo é 
um utilitário que irá monitorar todas as alterações 
nos arquivos de sua aplicação e reiniciar automaticamente 
o servidor quando for necessário.*/

// colocando middlewear do morgan em usamos
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var Recorder = require('./models/recorde');

var RecorderRoutes = require('./routes/recorde');

// criamos a nova rota
app.use('/recorde', RecorderRoutes);

// criando rota para get
app.get('/', function(requisicao, resposta, proximo){
	resposta.send('ok');
});

// criando rota para post
// app.post('/', function(requisicao, resposta, proximo){
// 	resposta.send({text: requisicao.body.text});
// });

// colocando servidor para ouvir uma porta
app.listen(3000, function(){
	console.log('rodando na porta 3000');
});

module.exports = app;
// rodar mongoDb na pasta C:\Program Files\MongoDB\Server\4.0\bin + comando mongod.exe --dbpath c:\data\db

// npm install -g mocha
// Mocha é uma estrutura de teste JavaScript para programas Node.js, com suporte a navegador, testes assíncronos, relatórios de cobertura de teste e uso de qualquer biblioteca de asserção. 

// O Chai HTTP é um plugin para a framework Chai, que é utilizado para permitir a criação de testes de integração com as rotas em servidores Node.JS