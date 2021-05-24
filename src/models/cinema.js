const connection = require("../config/db");
const cinemas = ({
    postCinema : (id_cinema, cinema, alamat, kota, list_tayang, img, kursi)=>{
        return new Promise((resolve, reject)=>{
            const query = `
            INSERT INTO table_cinema 
            (id_cinema, cinema, list_tayang, alamat, kota, img, kursi) 
            VALUES 
            ('${id_cinema}', '${cinema}', '${list_tayang}', '${alamat}', '${kota}', '${img}', '${kursi}')`;
            connection.query(query, function(err, results){
                if(!err){
                    resolve({message : "success", status : 200});
                }else{
                    reject({message : err.message, status : 500});
                }
            });
        });
    },
    getCinema : ()=>{
        return new Promise((resolve, reject)=>{
            const query = `SELECT * FROM table_cinema `;
            connection.query(query, function(err, results){
                if(!err){
                    resolve({message : "success", status : 200, data : results});
                }else{
                    reject({message : err.message, status : 500});
                }
            });
        });
    },
    updateKursi : (id_cinema, data_kursi_cinema )=>{
        return new Promise((resolve, reject)=>{
            const query = `UPDATE table_cinema SET kursi='${data_kursi_cinema}' WHERE id_cinema='${id_cinema}'  `;
            connection.query(query, function(err, results){
                if(!err){
                    resolve({message : "success", status : 200, data : results});
                }else{
                    reject({message : err.message, status : 500});
                }
            });
        });
    },
    getCinemaByKota : (kota)=>{
        return new Promise((resolve, reject)=>{
            const query = `SELECT * FROM table_cinema WHERE kota='${kota}'`;
            connection.query(query, function(err, results){
                if(!err){
                    resolve({message : "success", status : 200, data : results});
                }else{
                    reject({message : err.message, status : 500});
                }
            });
        });
    },
    getCinemaWithLimit : (limit, offset) => {
        return new Promise((resolve, reject)=>{
            const query = `SELECT * FROM table_cinema LIMIT ${limit} OFFSET ${offset}`;
            connection.query(query, function(err, results){
                if(!err){
                    resolve({message : "success", status : 200, data : results});
                }else{
                    reject({message : err.message, status : 500});
                }
            });
        });
    }
})

module.exports = cinemas