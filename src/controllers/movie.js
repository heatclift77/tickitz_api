const movieModels = require("../models/movies");
const standart_response = require("../utilities/standart_response");
require("dotenv").config();
const { v4:uuidv4 } = require("uuid");
const redis = require("redis");
const client = redis.createClient(6379);

exports.getMovie = (req, res)=>{
    movieModels.movieList()
    .then(response => {
        standart_response(res, 200, "Succes", response);
    })
    .catch(err => standart_response(res, 400, "bad request", err));

};
exports.getMovieById = (req, res)=>{
    const code_ticket = req.query.id;
    if(code_ticket == undefined || code_ticket == ''){
        standart_response(res, 400, 'bad request', [])
    }else{
        movieModels.getMovieById(code_ticket)
        .then(response => {
            standart_response(res, response.status, response.message, response.data);
        })
        .catch(err =>{
            const {status, message, data} = err;
            standart_response(res, status, message, data);
        });
    }
};
exports.searchMovie = (req, res)=>{
    const key = req.query.key;
    movieModels.searchMovie(key)
    .then(response =>{
        res.status(response.status).json({data:response.data})
    })
    .catch(err =>{
        let {status, message} = err;
        standart_response(res, status, message, []);
    });
};
exports.postMovie = (req, res)=>{
    const id_movie = uuidv4();
    const title = req.body.title;
    const genre = req.body.genre;
    const release_date = req.body.release_date;
    const directed_by = req.body.directed_by;
    const duration = req.body.duration;
    const casts = req.body.casts;
    const synopsis = req.body.synopsis;
    const image = `${process.env.SELF}/img/${req.file.filename}`;
    if(
        title == undefined ||
        genre == undefined ||
        release_date == undefined ||
        directed_by == undefined ||
        duration == undefined ||
        casts == undefined ||
        synopsis == undefined  
    ){
        standart_response(res, 400, "Bad Request", []);
    }else{
        movieModels.postMovie(id_movie, title, genre, release_date, directed_by, duration, casts, synopsis, image)
        .then(response =>{
            standart_response(res, 201, "Created", response);
        })
        .catch(err =>{
            let {status, message, response} = err;
            standart_response(res, status, message, response);
        });
    }
};