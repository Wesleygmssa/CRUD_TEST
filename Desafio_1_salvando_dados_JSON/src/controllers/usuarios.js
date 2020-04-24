const fs = require('fs'); // trabalha com arquivo dos sistemas
const data = require('../../data.json');
const {age, date} = require('../utils/utils') ;// desestruturando função
const Intl = require('intl');// tulizando a dependencia para conseguir a formatação PT-BR

module.exports = {

index(req , res){
    return res.render('usuarios/index',{usuarios:data.usuarios});
},

//show
show(req, res){
    const {id} = req.params;

    const foundUsuario = data.usuarios.find((usuario)=>{// retorno true ou false
        return usuario.id == id;
    })

    if(!foundUsuario) return res.send("Usuario not found");

    const usuario = {
        ...foundUsuario,
        age: age(foundUsuario.birth),
        services:foundUsuario.services.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundUsuario.created_at),

    }

    return res.render('usuarios/show',{usuario});// redenriando a pagina show e passando dados
},

//create
post(req, res){
        const keys = Object.keys(req.body); //retorna um array com a chaves do objeto
    
        for(key of keys){// validação dos campos
            if(req.body[key] == "" ){
                return res.send('Please, fill all fildes');
            }
        }

        let {name, cpf, email, tel, gender, birth, services} = req.body // desestruturançãor 

        const id = Number(data.usuarios.length + 1);
        const created_at = Date.now(); //Constructor timestamp = 1587601469143
        birth = Date.parse(birth); //timestamp = 1587601469143
       
        data.usuarios.push( {
            id,
            name,
            cpf,
            email,
            tel,
            gender,
            birth,
            created_at,
            services,

          } ); //criando um array de usuarios dentro do data.json

        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
            if(err){
                return res.send("Write file error!");
            }

            return res.redirect('usuarios');
        });
    
    },

//edit
edit(req, res){
     //'/usuarios/:id/edit'
    const {id} = req.params;

    //caso achar o usuario retorna todos valores para essa variavel foundUsuario
    const foundUsuario = data.usuarios.find((usuario)=>{// retorno true ou false
        return usuario.id == id; //pegando um só usuário pelo ID;
    })

    if(!foundUsuario) return res.send("Usuario not found");

    //yyyy-mm-dd
    //timestamp 1554754848
    const usuario = {
        ...foundUsuario,
        birth: date(foundUsuario.birth)
    }

    return res.render('usuarios/edit',{usuario});
},

put(req, res){
     //'/usuarios/:id/edit'
     const {id} = req.body;
     console.log(id)
     let index = 0;

     //caso achar o usuario retorna todos valores para essa variavel foundUsuario
     const foundUsuario = data.usuarios.find((usuario, foundIndex)=>{// retorno true ou false
         if(id == usuario.id){
             index = foundIndex;
             return true
         }
     })
 
     if(!foundUsuario) return res.send("Usuario not found");

     const  usuarios ={
         ...foundUsuario,// pegando usuarios já cadastrado 
         ...req.body, // atualizando dados
        //  birth: date.parse(birth),// modificando dados
         
     }
    
     data.usuarios[index] = usuarios;// pegando a posição do index e substituindo

     fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
         if(err) return res.send("write error!")
   
         return res.redirect(`/usuarios/${id}`);
        }
     )},

delete(req, res){
    const {id} =  req.body

    //tuddo que retorna true ele coloca no array, false tira
    const filteredUsuarios = data.usuarios.filter((usuario)=>{
        return usuario.id != id; // return false
    })

    data.usuarios = filteredUsuarios;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err)=>{
        if(err) return res.send("Write file error!");

        return res.redirect('/usuarios')
    })
}     

    
}