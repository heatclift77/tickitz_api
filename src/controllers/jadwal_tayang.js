const models = require("../models/jadwal_tayang");
const standart_response = require("../utilities/standart_response");
require("dotenv").config();
// const { v4:uuidv4 } = require("uuid");
// const redis = require("redis");
// const client = redis.createClient(6379);

exports.getJadwalList = (req, res)=>{
    const code_ticket = req.query.code_ticket
    models.jadwal_tayang(code_ticket)
    .then(response => {
        standart_response(res, response.status, response.message, response.data);
    })
    .catch(err => standart_response(res, err.status, err.message, err.data));
};
exports.jadwalTayangByDate = (req, res) => {
    const {date, code_ticket} = req.query
    models.jadwalTayangByDate(date, code_ticket)
    .then(response => standart_response(res, response.status, response.message, response.data))
    .catch(err => standart_response(res, err.status, err.message, err.data))
}
exports.jadwalTayangByDateNKota = (req, res) => {
    const {date, kota, code_ticket} = req.query
    models.jadwalTayangByDateNKota(date, kota, code_ticket)
    .then(response => standart_response(res, response.status, response.message, response.data))
    .catch(err => standart_response(res, err.status, err.message, err.data))
}

