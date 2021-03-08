const { v4:uuidv4 } = require("uuid"); 
const connection = require("../config/db");
const id_tickets = uuidv4();
const ticket = {
    postTicket : (id_user, id_movie, id_cinema, seat, price) => {
        return new Promise((resolve, reject)=>{
            connection.query(
                `INSERT INTO table_tickets 
                (id_ticket, id_user, id_movie, id_cinema, seat, price)
                VALUES
                ('${id_tickets}', '${id_user}', '${id_movie}','${id_cinema}', '${seat}', '${price}')`,
                function(err, results, fields) {
                    if(!err){
                        resolve(results);
                    }else{
                        reject(err);
                    }
            });
        });
    },
    addTransaction : (id_user) => {
        const id_transaction = uuidv4();
        return new Promise((resolve, reject)=>{
            connection.query(
                `INSERT INTO table_transaction 
                (id_transaction, id_ticket, id_user)
                VALUES
                ('${id_transaction}', '${id_tickets}', '${id_user}')`);
        });
    },
};

module.exports = ticket;