const model = require('../models/products')
const standart_response = require('../utilities/standart_response')
const {v4:uuidv4} = require('uuid')
exports.postProduct = (req, res) =>{
    const id_product = uuidv4()
    const {
        movie, category, releaseDate,
        duration, director, casts, synopsis, cinema, 
        kota, showTimes
    } = req.body
    if(movie == undefined || category == undefined || releaseDate == undefined ||
        duration == undefined || director == undefined || casts == undefined || synopsis == undefined ||
        cinema == undefined || kota == undefined || showTimes == undefined){
            res.json({
                message : 'masukkan data dengan lengkap'
            }).status(400)
    }else{
        const movieInfo = {
            movie, category, releaseDate,duration, 
            director, casts, synopsis,
        }
        model.postProduct(movieInfo, cinema, kota, showTimes, id_product)
        .then(response => {
            standart_response(res, response.status, response.message, response.data)
        }).catch(err => console.log(err))
    }
}