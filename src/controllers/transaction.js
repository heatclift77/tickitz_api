require("dotenv").config();
const model = require("../models/transaction");
const standart_response = require('../utilities/standart_response')

exports.deleteById = (req, res) => {
    const id_transaction = req.params.id;
    model.deleteById(id_transaction)
    .then(response => {
        res.status(200);
        res.send(response);
    })
    .catch(err =>{
        res.status(400);
        res.send(err);
    });
};
exports.deleteByIdUser = (req, res) => {
    const id_user = req.params.id;
    model.deleteByIdUser(id_user)
    .then(response => {
        res.status(200);
        res.send(response);
    })
    .catch(err =>{
        res.status(400);
        res.send(err);
    });
};

exports.getTransactions = (req, res)=>{
    let paging = req.params.page;
    model.getTransaction(paging)
    .then(response => {
        res.send(response);
    })
    .catch(err =>{
        res.status(400);
        res.send(err);
    });
};
exports.getTransactionsByUser = (req, res)=>{
    const id_user = req.params.id_user;
    const page = req.params.page;
    model.getTransactionsByUser(id_user, page)
    .then(response => {
        standart_response(res, 200, 'Succes', response)
    })
    .catch(err =>{
        let {status, message} = err
        standart_response(res, status, message, [])
    });
};