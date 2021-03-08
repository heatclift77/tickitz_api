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
            LIMIT ${transaction_page}, 20 
            `, function(err, results, fields){
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
            let transaction_page = (page == 1) ? page = 0:  page * 20 - 20;
            connection.query(`
            SELECT * 
            FROM table_transaction 
            ORDER BY created_at 
            ASC
            LIMIT ${transaction_page}, 20 
            `, function(err, results, fields){
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
            connection.query(`DELETE FROM table_transaction WHERE id_user='${id_user}'`, function(err, results, fields){
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
            connection.query(`DELETE FROM table_transaction WHERE id_transaction='${id_transaction}'`, function(err, results, fields){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    }
};

module.exports = transaction;