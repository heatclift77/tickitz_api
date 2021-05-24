const connection = require("../config/db");
const transaction = {
    getTransactionsByUser : (id_user, page) => {
        return new Promise((resolve, reject)=>{
            let transaction_page = (page == 1) ? page = 0:  page * 20 - 20;
            connection.query(`
            SELECT * 
            FROM table_transaction 
            WHERE id_user='${id_user}' 
            ORDER BY created_at 
            ASC
            LIMIT ${transaction_page}, 3 
            `, function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    },
    getTransaction : (page) => {
        return new Promise((resolve, reject)=>{
            let transaction_page = (page == 1) ? page = 0:  page * 5 - 5;
            connection.query(`
            SELECT * 
            FROM table_transaction 
            ORDER BY created_at 
            ASC
            LIMIT ${transaction_page}, 5 
            `, function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    },
    deleteByIdUser : (id_user) => {
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM table_transaction WHERE id_user='${id_user}'`, function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    },
    deleteById : (id_transaction)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM table_transaction WHERE id_transaction='${id_transaction}'`, function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    },
    CheckOut : (id_user, id_ticket, order_code, data_seat, id_transaction)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`INSERT INTO table_transaction (id_transaction, id_ticket, id_user) VALUES ('${id_transaction}','${id_ticket}','${id_user}')`)
            connection.query(`SELECT id_cinema_cabang FROM table_data_cabang WHERE order_code ='${order_code}'`, (err, results)=>{
                if(!err){
                    connection.query(`UPDATE seat SET no_seat = '${data_seat}' WHERE id_cinema_cabang = '${results[0].id_cinema_cabang}'`, (err, results)=>{
                        if(!err){
                            resolve({
                                status : 200,
                                message : 'transaksi berhasil',
                                data : results
                            })
                        }else{
                            reject({
                                status : 500,
                                message : 'terjadi kesalahan server'
                            })
                        }
                    })
                }else{
                    reject({
                        status : 500,
                        message : 'terjadi kesalahan server'
                    })
                }
            })
        })
    }
};

module.exports = transaction;