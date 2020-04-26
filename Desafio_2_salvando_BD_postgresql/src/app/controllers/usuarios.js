const {age, date} = require('../../lib/utils') ;// desestruturando função
const Intl = require('intl');// tulizando a dependencia para conseguir a formatação PT-BR
const Usuario = require('../../models/modelsUsuario')

module.exports = {

index(req , res){
   
   Usuario.all((usuarios)=>{

        return res.render('usuarios/index',{usuarios});
   })
    
},

//show
show(req, res){
    Usuario.find(req.params.id, (usuario)=>{
        if(!usuario) return res.send("Usuario não encontrado!");

        usuario.age = age(usuario.birth);
        usuario.services =  usuario.services.split(',');
        usuario.created_at = date(usuario.created_at).format

        return res.render('usuarios/show',{usuario})
    });
},

//create cadastrando usuário
post(req, res){

        const keys = Object.keys(req.body); //retorna um array com a chaves do objeto
    
        for(key of keys){// validação dos campos
            if(req.body[key] == "" ){
                return res.send('Please, fill all fildes');
            }
        }

       Usuario.create(req.body, (usuario)=>{
            return res.redirect(`/usuarios`)
       })
    
    },

//edit
edit(req, res){
    //pegando id pelo req.params
    Usuario.find(req.params.id, (usuario)=>{
        if(!usuario) return res.send("Usuario não encontrado!");

        usuario.birth = date(usuario.birth).iso

        return res.render('usuarios/edit',{usuario})
    });
},

put(req, res){
    const keys = Object.keys(req.body); //retorna um array com a chaves do objeto
    
    for(key of keys){// validação dos campos
        if(req.body[key] == "" ){
            return res.send('Please, fill all fildes');
        }
    }

    Usuario.update(req.body, ()=>{

    return res.redirect(`/usuarios/${req.body.id}`)
    })
    
    
},

delete(req, res){

    Usuario.delete(req.body.id,()=>{

        return res.redirect(`/usuarios`)
    })
}     

    
}