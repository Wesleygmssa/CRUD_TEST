const fs = require('fs'); // trabalha com arquivo dos sistemas
const data = require('../../data.json');

module.exports = {


    post(req, res){
        const keys = Object.keys(req.body); //retorna um array com a chaves do objeto
    
        for(key of keys){// validação dos campos
            if(req.body[key] == "" ){
                return res.send('Please, fill all fildes');
            }
        }

        let {name, cpf, email, tel, gender, birth, service} = req.body // desestruturançãor 

        const id = Number(data.usuarios.length + 1);
        const created_at = Date.now(); // criando uma nova entrada no req.body, data de agora
        birth = Date.parse(birth); // modificando uma entrada existem, 
       
        data.usuarios.push( {
            id,
            name,
            cpf,
            email,
            tel,
            gender,
            birth,
            created_at,
            service,

          } ); //criando um array de usuarios dentro do data.json

        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
            if(err){
                return res.send("Write file error!");
            }

            return res.redirect('usuarios');
        });
    
    },

    
}