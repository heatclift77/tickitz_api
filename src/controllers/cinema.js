const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const model = require("../models/cinema")

exports.addCinema = (req, res) => {
    const id_cinema = uuidv4();
    const { cinema, alamat, kota, list_tayang, kursi } = req.body
    const img = `${process.env.IMG_DIR}/img/${req.file.filename}`;
    model.postCinema(id_cinema,cinema, alamat, kota, list_tayang, img, kursi)
    .then(response=>{
        res.status(response.status).json({message:response.message})
    })
    .catch(err=>{
        res.status(err.status).json({message:err.message})
    })
};

exports.getAllCinema = (req, res) => {
    const {limit, offset} = req.query
    if(limit === undefined || offset === undefined){
        model.getCinema()
        .then(response => {
            res.status(response.status).json({message:response.message, data:response.data})
        })
        .catch(err=>{
            res.status(err.status).json({message:err.message})
        })
    }else{
        model.getCinema()
        .then(response => {
            let page = []
            let dataCount = response.data.length / limit
            if(dataCount % 1 !== 0){
                dataCount = Math.floor(dataCount) + 1
            }
            for(i=0; i < dataCount; i++){
                page.push({
                    number:i + 1,
                    link:`${process.env.SERVER}cinema?limit=${limit}&offset=${(i + 1) * limit -3}`
                })
            }
            model.getCinemaWithLimit(limit, offset)
            .then(item => {
                res.status(item.status).json({message:item.message, data:item.data, page:page})
            })
            .catch(err=>{
                res.status(err.status).json({message:err.message})
            })
        })
        .catch(err=>{
            res.status(err.status).json({message:err.message})
        })
    }
};

exports.updateKursi = (req, res, next) => {
    const { id_cinema, data_kursi_cinema, kursi } = req.body
    const updateDataKursi = data_kursi_cinema.split(",").map(item=>{
        for(let i=0; i < kursi.length; i++){
            if(item == kursi[i]){
                return "SOLD OUT"
            }
        }
        return item
    }).join(",")
    model.updateKursi(id_cinema, updateDataKursi)
    .then(()=>{
        next()
    })
    .catch(err=>{
        res.status(err.status).json({message:err.message})
    })
    
}

exports.getCinemaByKota = (req, res) => {
    const { kota, limit, offset } = req.query
    if(kota === "ALL"){
        model.getCinema()
        .then(response => {
            let page = []
            let dataCount = response.data.length / limit
            if(dataCount % 1 !== 0){
                dataCount = Math.floor(dataCount) + 1
            }
            for(i=0; i < dataCount; i++){
                page.push({
                    number:i + 1,
                    link:`${process.env.SERVER}cinema?limit=${limit}&offset=${(i + 1) * limit -3}`
                })
            }
            model.getCinemaWithLimit(limit, offset)
            .then(item => {
                res.status(item.status).json({message:item.message, data:item.data, page:page})
            })
            .catch(err=>{
                res.status(err.status).json({message:err.message})
            })
        })
        .catch(err=>{
            res.status(err.status).json({message:err.message})
        })
    }else{
        model.getCinemaByKota(kota)
        .then(response => {
            res.status(response.status).json({message:response.message, data:response.data, page:[]})
        })
        .catch(err=>{
            res.status(err.status).json({message:err.message})
        })
    }
}; 