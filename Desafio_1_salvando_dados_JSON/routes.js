const express = require('express');
const usuarios = require('./src/controllers/usuarios')

const routes = express.Router();


routes.get('/', (req , res)=>{
    return res.redirect('usuarios');
});

routes.get('/usuarios', (req , res)=>{
    return res.render('usuarios/index');
});

routes.get('/usuarios/create', (req , res)=>{
    return res.render('usuarios/create');
});

routes.get('/usuarios/:id',usuarios.show);

routes.post('/usuarios', usuarios.post);

routes.get('/members', (req , res)=>{
    return res.send('/members');
});

module.exports = routes;