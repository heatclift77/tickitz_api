const connection = require("../config/db");
const order = ({
    order_details : (order_code)=>{
        return new Promise((resolve, reject)=>{
            const query = `SELECT price,img,cinema,title,no_seat from table_jadwal_tayang INNER JOIN table_cinema 
            ON table_jadwal_tayang.id_cinema = table_cinema.id_cinema INNER JOIN table_tickets 
            ON table_jadwal_tayang.id_ticket = table_tickets.id_ticket INNER JOIN table_data_cabang 
            ON table_cinema.id_branch = table_data_cabang.id_branch INNER JOIN seat ON table_data_cabang.id_cinema_cabang = seat.id_cinema_cabang INNER JOIN table_movie 
            ON table_tickets.id_movie = table_movie.id_movie WHERE table_data_cabang.order_code = '${order_code}'`;
            connection.query(query, function(err, results){
                if(!err){
                    if(results.length == 0){
                        resolve({
                            status : 404,
                            message : 'data not found',
                            data : results
                        });
                    }else{
                        resolve({
                            status : 200,
                            message : 'succes',
                            data : results
                        });
                    }
                }else{
                    reject({
                        status : 500,
                        message : 'Internal Sever Error',
                        data : err
                    });
                }
            });
        });
    }
});

module.exports = order;