
const { v4:uuidv4 } = require("uuid"); 
const connection = require("../config/db");
const id_tickets = uuidv4();
const timeStamp = require('time-stamp')
const ticket = {
    postTicket : (id_user, id_movie, id_cinema, seat, price) => {
        return new Promise((resolve, reject)=>{
            connection.query(
                `INSERT INTO table_tickets 
                (id_ticket, id_user, id_movie, id_cinema, seat, price)
                VALUES
                ('${id_tickets}', '${id_user}', '${id_movie}','${id_cinema}', '${seat}', '${price}')`,
                function(err, results) {
                    if(!err){
                        resolve(results);
                    }else{
                        reject(err);
                    }
            });
        });
    },
    // addTransaction : (id_user) => {
    //     const id_transaction = uuidv4();
    //     return new Promise((resolve, reject)=>{
    //         connection.query(
    //             `INSERT INTO table_transaction 
    //             (id_transaction, id_ticket, id_user)
    //             VALUES
    //             ('${id_transaction}', '${id_tickets}', '${id_user}')`);
    //     });
    // },
    getTicketsByDate : (id_movie)=>{
        return new Promise((resolve, reject)=>{
            // const today = timestamp('YYYY-MM-DD')
            const query = `
            SELECT 
            table_cinema.cinema, table_cinema.price ,table_jadwal_tayang.jam
            FROM table_jadwal_tayang 
            INNER JOIN table_cinema 
            ON table_jadwal_tayang.id_cinema = table_cinema.id_cinema 
            WHERE table_jadwal_tayang.id_movie = '${id_movie}'   `
            connection.query(query, function(err, results){
                if(!err){
                    if(results.length == 0){
                        reject({
                            status:404,
                            message:'Not Found',
                        })
                    }else{
                        resolve(results)
                    }
                }else{
                    reject({
                        status:500,
                        message:'Internal Server Error'
                    })
                }
            })
        })
    }
};

module.exports = ticket;