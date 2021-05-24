const connection = require("../config/db");

const Products = {
    postProduct : (movieInfo, cinema, kota, showTimes, id_product, date) => {
        return new Promise((resolve, reject)=>{
            const insertMovie = 
            `INSERT INTO table_movie 
            (id_movie, title, genre, release_date, directed_by, duration, casts, synopsis, image) 
            VALUES 
            ('${movieInfo.id_movie}', '${movieInfo.movie}', '${movieInfo.category}', '${movieInfo.releaseDate}', '${movieInfo.director}', '${movieInfo.duration}', '${movieInfo.casts}', '${movieInfo.synopsis}', '${movieInfo.img}')`;
            
            connection.query(insertMovie, 
            function(err, results){
                    if(!err){
                        const insertProduct = `INSERT INTO products 
                        (id_product, cinema, kota, date, showTimes, id_movie)
                        VALUES ('${id_product}', '${cinema}', '${kota}', '${date}', '${showTimes}', '${movieInfo.id_movie}')
                        `;
                        connection.query(insertProduct, function(err, results){
                            if(!err){
                                resolve({
                                    status : 200,
                                    message : "product berhasil ditambahkan",
                                    data : results
                                });
                            }else{
                                reject({
                                    status : 500,
                                    message : "database error",
                                    response : err
                                });
                            }
                        });
                    }else{
                        reject({
                            status : 500,
                            message : "database error",
                            response : err
                        });
                }
            });
        });
    },
    dataProduct : (id_product)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM product WHERE id_product=${id_product}`, function(err, results){
                if(!err){
                    resolve({
                        status : 200,
                        message : 'sukses',
                        data : results
                    })
                }else{
                    reject({
                        status : 500,
                        message : 'sukses',
                        data : err
                    })
                }
            })
        })
    }
};

module.exports = Products;
