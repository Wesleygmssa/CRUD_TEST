const express = require('express'); 
const nunjucks = require('nunjucks'); 
const routes = require('./routes'); // chamando rotas
const server = express();  
const methodOverride = require('method-override'); // usando o metodo put

server.use(express.urlencoded({extended:true})); // lendo dados formulario
server.use(express.static('public')); //style.css, img , js etc..
server.use(methodOverride('_method')); //usar method put, tem q ser antes da rota
server.use(routes); // configurando rotas


//template engine
server.set('view engine', 'njk');

nunjucks.configure('src/views', { 
    express: server,
    autoescape: false, // - pegando formatação html 
    noCache: true // - tirando o cache
})


//servidor
server.listen(5000, function () {
    console.log('Server is running');
});



