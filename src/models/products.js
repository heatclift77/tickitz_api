const connection = require('../config/db');

const Products = {
    postProduct : (movieInfo, cinema, kota, showTimes, id_product) => {
        return new Promise((resolve, reject)=>{
            const query = `INSERT INTO products 
            (id_product, movie, category, releaseDate, duration, director, casts, synopsis, cinema, kota, showTimes)
            VALUES ('${id_product}', '${movieInfo.movie}', '${movieInfo.category}', 
            '${movieInfo.releaseDate}', '${movieInfo.duration}', '${movieInfo.duration}', '${movieInfo.casts}', 
            '${movieInfo.synopsis}', '${cinema}', '${kota}', '${showTimes}')
            `;
            connection.query(query, function(err, results){
                if(!err){
                    resolve({
                        status : 200,
                        message : 'product berhasil ditambahkan',
                        data : results
                    })
                }else{
                    reject({
                        status : 500,
                        message : 'product berhasil ditambahkan'
                    })
                }
            })
        });
    }
}

module.exports = Products
