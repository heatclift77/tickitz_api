const model = require('../models/ticket')
exports.postTickets = (req, res)=>{
    const id_user = req.body.id_user
    const id_movie = req.body.id_movie
    const id_cinema = req.body.id_cinema
    const seat = req.body.seat
    const price = req.body.price
    model.postTicket(id_user, id_movie, id_cinema, seat, price)
    .then(response =>{
        res.status(200)
        res.send(response)
    })
    .catch(err =>{
        res.status(400)
        res.send(err)
    })

    // CREATE TRANSACTION
    // connection.query(
    //     `INSERT INTO table_transaction 
    //     (id_transaction, id_ticket, id_user, created_at)
    //     VALUES
    //     ('${id_transaction}', '${id_tickets}', '${id_user}','${created_at}')`);
}