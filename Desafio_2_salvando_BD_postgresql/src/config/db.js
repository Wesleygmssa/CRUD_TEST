const { Pool } = require("pg");

//configuração do banco de dados
module.exports = new Pool({
    user: 'postgres',
    password: '0000',
    host:'localhost',
    port:5432,
    database: 'cadastro_user'
})