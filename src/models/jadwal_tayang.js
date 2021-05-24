const connection = require("../config/db");
const jadwal_tayang = ({
    jadwal_tayang : (code_ticket)=>{
        return new Promise((resolve, reject)=>{
            const query = `SELECT price,jam,img,alamat,cinema, lokasi, alamat, order_code, tgl, order_code, no_seat
            from table_jadwal_tayang INNER JOIN table_cinema 
            ON table_jadwal_tayang.id_cinema = table_cinema.id_cinema 
            INNER JOIN table_tickets 
            ON table_jadwal_tayang.id_ticket = table_tickets.id_ticket 
            INNER JOIN table_data_cabang 
            ON table_cinema.id_branch = table_data_cabang.id_branch
            INNER JOIN seat
            ON table_data_cabang.id_cinema_cabang = seat.id_cinema_cabang
            WHERE table_tickets.code_ticket = '${code_ticket}'
            `;
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
    },
    jadwalTayangByDate : (date, code_ticket)=>{
        return new Promise((resolve, reject)=>{
            const query =  `SELECT price,jam,img,alamat,cinema,lokasi,alamat,order_code,tgl,no_seat
            from table_jadwal_tayang INNER JOIN table_cinema 
            ON table_jadwal_tayang.id_cinema = table_cinema.id_cinema 
            INNER JOIN table_tickets 
            ON table_jadwal_tayang.id_ticket = table_tickets.id_ticket 
            INNER JOIN table_data_cabang 
            ON table_cinema.id_branch = table_data_cabang.id_branch
            INNER JOIN seat
            ON table_data_cabang.id_cinema_cabang = seat.id_cinema_cabang
            WHERE table_tickets.code_ticket = '${code_ticket}' AND table_jadwal_tayang.tgl = '${date}'`
            connection.query(query, (err, results)=>{
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
            })
        })
    },
    jadwalTayangByDateNKota :  (date, kota, code_ticket) => {
        return new Promise((resolve, reject)=>{
            const query =  `SELECT price,jam,img,alamat,cinema,lokasi,alamat,order_code,tgl,no_seat
            from table_jadwal_tayang INNER JOIN table_cinema 
            ON table_jadwal_tayang.id_cinema = table_cinema.id_cinema 
            INNER JOIN table_tickets 
            ON table_jadwal_tayang.id_ticket = table_tickets.id_ticket 
            INNER JOIN table_data_cabang 
            ON table_cinema.id_branch = table_data_cabang.id_branch
            INNER JOIN seat
            ON table_data_cabang.id_cinema_cabang = seat.id_cinema_cabang
            WHERE table_tickets.code_ticket = '${code_ticket}' AND table_jadwal_tayang.tgl = '${date}' AND table_data_cabang.lokasi = '${kota}'`
            connection.query(query, (err, results)=>{
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
            })
        })
    }
});

module.exports = jadwal_tayang;