const connection = require("../config/db");
const movie = ({
    movieList : ()=>{
        return new Promise((resolve, reject)=>{
            const query = `SELECT * from table_movie`;
            connection.query(query, function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err.message);
                }
            });
        });
    },
    getMovieById : (id_movie)=>{
        return new Promise((resolve, reject)=>{
            const url = `SELECT * FROM table_movie WHERE id_movie='${id_movie}'`
            connection.query(url, function(err, results){
                if(!err){
                    if(results.length == 0){
                        reject({
                            status : 404,
                            message : "not Found",
                            data : results
                        });
                    }else{
                        resolve({
                            status : 200,
                            message : "succes",
                            data : results
                        });
                    }
                }else{
                    reject({
                        status : 500,
                        message : "Internal Server Error",
                        data : err
                    });
                }
            });
        });
    },
    searchMovie : (key)=>{
        if(key == undefined){
            return new Promise((resolve, reject)=>{
                reject({
                    status : 400,
                    message : "Bad request"
                });
            });
        }else{
            return new Promise((resolve, reject)=>{
                connection.query(`SELECT * FROM table_movie WHERE title LIKE '${key}_%'`, function(err, results){
                    if(!err){
                        if(results.length != 0){
                            resolve({status:200, data:results});
                        }else{
                            reject({
                                status : 404,
                                message : "Not Found"
                            });
                        }
                    }else{
                        reject({
                            status : 500,
                            message : err.message
                        });
                    }
                });
            });
        }
    },
    postMovie : (id_movie, title, genre, release_date, directed_by, duration, casts, synopsis, image)=>{
        return new Promise((resolve, reject) =>{
            const query = 
            `INSERT INTO table_movie 
            (id_movie, title, genre, release_date, directed_by, duration, casts, synopsis, image) 
            VALUES 
            ('${id_movie}', '${title}', '${genre}', '${release_date}', '${directed_by}', '${duration}', '${casts}', '${synopsis}', '${image}')`;
            
            connection.query(query, 
            function(err, results){
                    if(!err){
                        resolve(results);
                    }else{
                        reject({
                            status : 500,
                            message : "database error",
                            response : err
                        });
                }
            });
        });
    }
});

module.exports = movie;