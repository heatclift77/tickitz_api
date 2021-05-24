
const { v4:uuidv4 } = require("uuid"); 
const connection = require("../config/db");
const id_tickets = uuidv4();
const timeStamp = require("time-stamp");
const ticket = {
    postTicket : (id_user, id_movie, id_cinema, seat, price) => {
        return new Promise((resolve, reject)=>{
            connection.query(
                `INSERT INTO table_tickets 
                (id_ticket, id_user, id_movie, id_cinema, seat, price)
                VALUES
                ('${id_tickets}', '${id_user}', '${id_movie}','${id_cinema}', '${seat}', '${price}')`,
                function(err, results) {
                    if(!err){
                        resolve(results);
                    }else{
                        reject(err);
                    }
            });
        });
    },
    getTicketsByDate : (id_movie)=>{
        return new Promise((resolve, reject)=>{
            // const today = timestamp('YYYY-MM-DD')
            const query = `
            SELECT 
            table_cinema.cinema, table_cinema.price ,table_jadwal_tayang.jam
            FROM table_jadwal_tayang 
            INNER JOIN table_cinema 
            ON table_jadwal_tayang.id_cinema = table_cinema.id_cinema 
            WHERE table_jadwal_tayang.id_movie = '${id_movie}'   `;
            connection.query(query, function(err, results){
                if(!err){
                    if(results.length == 0){
                        reject({
                            status:404,
                            message:"Not Found",
                        });
                    }else{
                        resolve(results);
                    }
                }else{
                    reject({
                        status:500,
                        message:"Internal Server Error"
                    });
                }
            });
        });
    },
    buyTicket : (id_tiket, cinema, movie, harga, kursi, id_user, id_movie, alamat_cinema, jam_tayang, jumlah_tiket, tanggal, metode_pembayaran) => {
        return new Promise((resolve, reject)=>{
            connection.query(
                `INSERT INTO tiket 
                (id_tiket, cinema, movie, harga, kursi, id_user, id_movie, alamat_cinema, jam_tayang, jumlah_tiket, tanggal, metode_pembayaran)
                VALUES
                ('${id_tiket}', '${cinema}', '${movie}','${harga}', '${kursi}', '${id_user}', '${id_movie}', '${alamat_cinema}', '${jam_tayang}' , '${jumlah_tiket}', '${tanggal}', '${metode_pembayaran}')`,
                function(err) {
                    if(!err){
                        resolve({
                            message:"transaction sukses", 
                            data:{
                                id_tiket : id_tiket,
                                id_user : id_user,
                                cinema : cinema,
                                alamat_cinema : alamat_cinema,
                                jam_tayang : jam_tayang,
                                tanggal : tanggal,
                                kursi : kursi,
                                movie: movie,
                                harga: harga,
                                jumlah_tiket:jumlah_tiket,
                                metode_pembayaran:metode_pembayaran
                            }, 
                            status:200
                        });
                    }else{
                        reject({message:err.message, status:500});
                    }
            });
        });
    },
    getTiketById : (id_tiket) => {
        return new Promise((resolve, reject)=>{
            const query =`SELECT * FROM tiket WHERE id_tiket='${id_tiket}'`
            connection.query(query, (err, results)=>{
                if(!err){
                    resolve({status:200, data:results[0]})
                }else{
                    reject({status:500, message:err.message})
                }
            })
        })
    },
    getTiket : () => {
        return new Promise((resolve, reject)=>{
            const query =`SELECT * FROM tiket`
            connection.query(query, (err, results)=>{
                if(!err){
                    resolve({status:200, data:results})
                }else{
                    reject({status:500, message:err.message})
                }
            })
        })
    },
    getTiketByIdUser : (id_user) => {
        return new Promise((resolve, reject)=>{
            const query =`SELECT * FROM tiket WHERE id_user='${id_user}'`
            connection.query(query, (err, results)=>{
                if(!err){
                    resolve({status:200, data:results})
                }else{
                    reject({status:500, message:err.message})
                }
            })
        })
    },
    getTiketByIdUserLimit : (id_user, limit, offset) => {
        return new Promise((resolve, reject)=>{
            const query =`SELECT * FROM tiket WHERE id_user='${id_user}' LIMIT ${limit} OFFSET ${offset}`
            connection.query(query, (err, results)=>{
                if(!err){
                    resolve({status:200, data:results})
                }else{
                    reject({status:500, message:err.message})
                }
            })
        })
    },
};

module.exports = ticket;