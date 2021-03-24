const connection = require('../config/db');
const movie = ({
    getMovie : (page, limit)=>{
        if(page === undefined || limit === undefined){
            return new Promise((resolve, reject)=>{
                const query = `SELECT * FROM table_movie`
                connection.query(query, function(err, results){
                    if(!err){
                        resolve(results);
                    }else{
                        reject(err.message);
                    }
                });
            })
        }else{
            return new Promise((resolve, reject)=>{
                page == 1 ? page = 0: page * limit - limit;
                const query = `SELECT * FROM table_movie ORDER BY created_at ASC LIMIT ${page}, ${limit}`
                connection.query(query, function(err, results){
                    if(!err){
                        resolve(results);
                    }else{
                        reject(err.message);
                    }
                });
            })
        }
    },
    getMovieById : (id_movie)=>{
        if(id_movie == undefined || id_movie == ''){
            return new Promise((resolve, reject)=>{
                reject({
                    status : 400,
                    message : "Bad request"
                });
            })
        }else{
            return new Promise((resolve, reject)=>{
                const query = `SELECT * FROM table_movie WHERE id_movie = '${id_movie}'`
                connection.query(query, function(err, results){
                    if(!err){
                        if(results.length == 0){
                            reject({
                                status : 404,
                                message : "not Found"
                            });
                        }else{
                            resolve(results);
                        }
                    }else{
                        reject(err.message);
                    }
                });
            })
        }
    },
    searchMovie : (key)=>{
        if(key == undefined){
            return new Promise((resolve, reject)=>{
                reject({
                    status : 400,
                    message : "Bad request"
                });
            })
        }else{
            return new Promise((resolve, reject)=>{
                connection.query(`SELECT * FROM table_movie WHERE title LIKE '${key}_%'`, function(err, results){
                    if(!err){
                        if(results.length != 0){
                            resolve(results)
                        }else{
                            reject({
                                status : 404,
                                message : "Not Found"
                            });
                        }
                    }else{
                        res.send(err);
                    }
                });
            })
        }
    },
    postMovie : (id_movie, title, genre, release_date, directed_by, duration, casts, synopsis, image)=>{
        return new Promise((resolve, reject) =>{
            const query = 
            `INSERT INTO table_movie 
            (id_movie, title, genre, release_date, directed_by, duration, casts, synopsis, image) 
            VALUES 
            ('${id_movie}', '${title}', '${genre}', '${release_date}', '${directed_by}', '${duration}', '${casts}', '${synopsis}', '${image}')`
            
            connection.query(query, 
            function(err, results){
                    if(!err){
                        resolve(results)
                    }else{
                        reject({
                            status : 500,
                            message : "database error",
                            response : err
                        })
                }
            });
        })
    }
})

module.exports = movie