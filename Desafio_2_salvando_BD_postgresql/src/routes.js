const express = require('express');
const usuarios = require('./app/controllers/usuarios');

const routes = express.Router();


routes.get('/', (req , res)=>{
    return res.redirect('usuarios');
});

routes.get('/usuarios', usuarios.index);

routes.get('/usuarios/create', (req , res)=>{
    return res.render('usuarios/create');
});

routes.get('/usuarios/:id',usuarios.show);

routes.get('/usuarios/:id/edit',usuarios.edit);

routes.post('/usuarios', usuarios.post);

routes.put('/usuarios', usuarios.put)

routes.delete('/usuarios', usuarios.delete)





routes.get('/members', (req , res)=>{
    return res.send('/members');
});

module.exports = routes;