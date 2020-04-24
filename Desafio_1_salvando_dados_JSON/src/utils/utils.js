//timestamp = 1587601469143

//logica
// 2020 - 1990 = 35 ano

//mes
//11 - 12 = -1 
//11 - 11 = 0
//11 - 10 = 1

// dia
//01 - 12 = -11
//13 - 12 = 1
//12 - 12 = 0

module.exports ={

    age(timestamp){
        const today = new Date(); //criando um objeto data (dia, mes, ano); uma data de hoje
        const birthDate = new Date(timestamp)// recebendo dados , data do que foi recebido

        // pegando a ano de hoje
        let age = today.getUTCFullYear() - birthDate.getUTCFullYear(); // 29 anos


        let month = today.getUTCMonth() - birthDate.getUTCMonth();// mes

        if(month < 0 || month == 0 && today.getUTCDate() <= birthDate.getUTCDate()) {
            age = age -1 // 29 - 1
        }

        return age; //retornando o filtro da idade anos, mes e dia correto

    },

    date(timestamp){
       const date = new Date(timestamp);

       const year = date.getUTCFullYear();
       const month = `0${date.getUTCMonth() + 1}`.slice(-2);
       const day = `0${date.getUTCDate()}`.slice(-2);

       return `${year}-${month}-${day}`;
    }

    
   
}