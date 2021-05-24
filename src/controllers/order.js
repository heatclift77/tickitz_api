const model = require("../models/order");
const standart_response = require("../utilities/standart_response");

exports.postTickets = (req, res)=>{
    const id_user = req.body.id_user;
    const id_movie = req.body.id_movie;
    const id_cinema = req.body.id_cinema;
    const seat = req.body.seat;
    const price = req.body.price;
    // create ticket
    model.postTicket(id_user, id_movie, id_cinema, seat, price)
    .then(response =>{
        res.status(200);
        res.send(response);
    })
    .catch(err =>{
        res.status(400);
        res.send(err);
    });
    // create transction
    model.addTransaction(id_user)
    .then(response =>{
        res.status(200);
        res.send(response);
    })
    .catch(err =>{
        res.status(400);
        res.send(err);
    });
};
exports.getTicketsByDate = (req, res)=>{
    const id_movie= req.query.id_movie;
    if(id_movie == undefined){
        standart_response(res, 400, "Bad Request", []);
    }else{
        model.getTicketsByDate(id_movie)
        .then(response =>{
            standart_response(res, 200, "Results Found", response);
        })
        .catch(err =>{
            const { status, message } = err;
            standart_response(res, status, message, []);
        });
    }
};