const model = require("../models/products");
const standart_response = require("../utilities/standart_response");
const {v4:uuidv4} = require("uuid");
exports.postProduct = (req, res) =>{
    const id_product = uuidv4();
    const id_movie = uuidv4();
    const img = `http://localhost:5000/img/${req.file.filename}`;
    const {
        movie, category, releaseDate,
        duration, director, casts, synopsis, cinema, 
        date, kota, showTimes
    } = req.body;
    if(movie == undefined || category == undefined || releaseDate == undefined ||
        duration == undefined || director == undefined || casts == undefined || synopsis == undefined ||
        cinema == undefined || kota == undefined || showTimes == undefined){
            res.json({
                message : "masukkan data dengan lengkap"
            }).status(400);
    }else{
        const movieInfo = {
            id_movie, movie, category, releaseDate, duration, 
            director, casts, synopsis, img
        };
        model.postProduct(movieInfo, cinema, kota, showTimes, id_product, date)
        .then(response => {
            standart_response(res, response.status, response.message, response.data);
        }).catch(error => {
            // standart_response(res, error.status, error.message, error.message)
            res.send(error);
        });
    }
};
exports.getProductById = (req, res)=>{
    const {id_product} = req.body
    if(id_product == undefined){
        standart_response(res, 400, 'bad request', [])
    }else{
        model.dataProduct(id_product)
        .then(response=>{
            standart_response(res, response.status, response.message, response.data)
        })
        .catch(err=>{
            standart_response(res, err.status, err.message, err.data)
        })
    }
}