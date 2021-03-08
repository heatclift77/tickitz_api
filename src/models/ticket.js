const { v4:uuidv4 } = require('uuid') 
const connection = require('../config/db')
const ticket = {
    postTicket : (id_user, id_movie, id_cinema, seat, price) => {
        const id_tickets = uuidv4()
        return new Promise((resolve, reject)=>{
            connection.query(
                `INSERT INTO table_tickets 
                (id_ticket, id_user, id_movie, id_cinema, seat, price)
                VALUES
                ('${id_tickets}', '${id_user}', '${id_movie}','${id_cinema}', '${seat}', '${price}')`,
                function(err, results, fields) {
                    if(!err){
                        resolve(results)
                    }else{
                        reject(err)
                    }
            });
        })
    }
//     getTicketsByDate : ()=>{
//         return new Promise((resolve, reject)=>{
//             connection.query(`
//             SELECT * FROM table_ticket WHERE 
//             `)
//         })
//     } 
}

module.exports = ticket