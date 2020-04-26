const db = require('../config/db');
const {age, date} = require('../lib/utils') ;// desestruturando função
const Intl = require('intl');// tulizando a dependencia para conseguir a formatação PT-BR

module.exports = {
   all(callback){

    db.query(`SELECT * FROM  usuarios`,(err, results)=>{

        if(err) throw `Database Error ! ${err}`;

        callback(results.rows);

    });

   },

   create(data, callback){
    const query = `
    INSERT INTO  usuarios (

       name,
       cpf,
       email,
       tel,
       gender,
       services,
       birth,
       created_at
    )  VALUES  ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id
    `

 const values = [
    data.name,
    data.cpf,
    data.email,
    data.tel,
    data.gender,
    data.services,
    date(data.birth).iso,
    date(Date.now()).iso// data do momento
 ]

 db.query(query,values, (err, results)=>{
   if(err) throw `Database Error ! ${err}`

   callback(results.rows[0])
 });
   },
   //pegando um usuario
   find(id, callback){
       db.query(`SELECT * FROM usuarios WHERE id = $1`, [id],(err, results)=>{

        if(err) throw `Database Error ! ${err}`

        callback(results.rows[0]);

       })
   },
   update(data, callback){

   const query = `
    UPDATE usuarios SET 
         name=($1),
         cpf=($2),
         email=($3),
         tel=($4),
         gender=($5),
         services=($6),
         birth=($7)


         WHERE id = $8
      `
      const values = [
         data.name,
         data.cpf,
         data.email,
         data.tel,
         data.gender,
         data.services,
         date(data.birth).iso,

         data.id
      ]

      db.query(query,values, (err, results)=>{
         if(err) throw `Database Error ! ${err}`
         callback()
      } )
   },
   delete(id, callback){
      db.query(`DELETE FROM usuarios WHERE id=$1`,[id],(err, results)=>{
         if(err) throw `Database Error ! ${err}`
         return callback();
      })
   }
}