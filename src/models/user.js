const { v4:uuidv4 } = require("uuid");
const connection = require("../config/db");
const timestamp = require("time-stamp");
const user = {
    postUser : (email, pass) => {
        const id_user = uuidv4();
        const created_at = timestamp("YYYY-MM-DD HH:mm");
        const updated_at = timestamp("YYYY-MM-DD HH:mm");
        return new Promise((resolve, reject)=>{
            connection.query(
                `INSERT 
                INTO table_user 
                (id_user, email, password, created_at, updated_at)
                VALUES 
                ('${id_user}','${email}','${pass}','${created_at}','${updated_at}')
                `,
                function(err, results, fields){
                    if(!err){
                        resolve(results);
                    }else{
                        reject(err);
                    }
            });
        });
    },
    updateUser : (id_user, pass, username, firsName, lastName, telephone)=>{
        return new Promise((resolve, reject)=>{
            const updated_at = timestamp("YYYY-MM-DD HH:mm:ss");
            connection.query(
                `UPDATE table_user 
                SET telephone='${telephone}', password='${pass}', username='${username}', firstName='${firsName}', lastName='${lastName}', updated_at='${updated_at}'
                WHERE id_user='${id_user}'
                `,
            function(err, results, fields){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    }
};

module.exports = user;