const model = require("../models/ticket");
const standart_response = require("../utilities/standart_response");
const { v4: uuidv4} = require("uuid");

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
exports.createTransaction = (req, res) => {
    const id_tiket = uuidv4()
    const { cinema, movie, harga, kursi, id_user, id_movie, alamat_cinema, jam_tayang, jumlah_tiket, tanggal, metode_pembayaran } = req.body
    model.buyTicket(id_tiket, cinema, movie, harga, kursi, id_user, id_movie, alamat_cinema, jam_tayang, jumlah_tiket, tanggal, metode_pembayaran)
    .then(response => {
        res.status(response.status).json({message:response.message, data:{id_tiket:id_tiket}})
    })
    .catch(err => {
        res.status(err.status).json({message:err.message})
    })
}
exports.getTiket = (req, res) => {
    const { id_tiket } = req.query
    model.getTiketById(id_tiket)
    .then(response => {
        res.status(response.status).json({message:response.message, data:response.data})
    })
    .catch(err => {
        res.status(err.status).json({message:err.message})
    })
}
exports.getTiketAll = (req, res) => {
    model.getTiket()
    .then(response => {
        res.status(response.status).json({message:response.message, data:response.data})
    })
    .catch(err => {
        res.status(err.status).json({message:err.message})
    })
}
exports.getTiketByIdUser = (req, res) => {
    const {limit, offset, id_user} = req.query
    if(limit === undefined || offset === undefined){
        model.getTiketByIdUser(id_user)
        .then(response => {
            res.status(response.status).json({message:response.message, data:response.data})
        })
        .catch(err => {
            res.status(err.status).json({message:err.message})
        })
    }else{
        model.getTiketByIdUser(id_user)
        .then(response => {
            let page = []
            let dataCount = response.data.length / limit
            if(dataCount % 1 !== 0){
                dataCount = Math.floor(dataCount) + 1
            }
            for(i=0; i < dataCount; i++){
                page.push({
                    number:i + 1,
                    link:`${process.env.SERVER}ticket/user?id_user=${id_user}&limit=${limit}&offset=${(i + 1) * limit -3}`
                })
            }
            model.getTiketByIdUserLimit(id_user, limit, offset)
            .then(result => {
                res.status(result.status).json({message:result.message, data:result.data, page:page})
            })
        })
        .catch(err => {
            res.status(err.status).json({message:err.message})
        })
    }
}