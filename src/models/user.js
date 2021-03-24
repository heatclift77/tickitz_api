const { v4:uuidv4 } = require("uuid");
const connection = require("../config/db");
const timestamp = require("time-stamp");
const bcrypt = require('bcryptjs');
const user = {
    register : (email, pass) => {
        const id_user = uuidv4();
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT COUNT(email) AS email FROM table_user WHERE email='${email}'`, function(err, results){
                if(results[0].email == 0){
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(pass, salt);
                    connection.query(
                        `INSERT INTO table_user (id_user, email, password)
                        VALUES 
                        ('${id_user}','${email}','${hash}')
                        `,
                        function(err, results){
                            if(!err){
                                resolve({
                                    status : 201,
                                    message : "Created",
                                    results : results
                                });
                            }else{
                                reject({
                                    status : 500,
                                    message : "internal Server Error",
                                    err : err.message
                                });
                            }
                    });
                }else{
                    reject({
                        status : 400,
                        message : "EMAIL SUDAH TERDAFTAR !!!",
                        results : results
                    })
                }
            })
        });
    },
    updateUser : (id_user, password, username, firstName, lastName, telephone)=>{
        return new Promise((resolve, reject)=>{
            const updated_at = timestamp("YYYY-MM-DD HH:mm:ss");
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            connection.query(
                `UPDATE table_user 
                SET telephone='${telephone}', password='${hash}', username='${username}', firstName='${firstName}', lastName='${lastName}', updated_at='${updated_at}'
                WHERE id_user='${id_user}'
                `,
            function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    },
    getUserById : (id_user)=>{
        return new Promise((resolve, reject)=>{
            connection.query(
                `SELECT * FROM table_user WHERE id_user='${id_user}'`,
            function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    },
    login : (email, pass)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM table_user WHERE email='${email}'`,function(err, results){
                if(!err){
                    if(results.length == 0){
                        reject({
                            status : 400,
                            message : "EMAIL BELUM TERDAFTAR!!! Silahkan register dulu",
                            results : results
                        })
                    }else{
                        const passwordMatch = bcrypt.compareSync(pass, results[0].password);
                        if(passwordMatch){
                            if(results[0].verified == 'true'){
                                resolve({
                                    status : 200,
                                    message : "Login Succes",
                                    results : results
                                })
                            }else{
                                reject({
                                    status : 406,
                                    message : "Belum terverifikasi"
                                })
                            }
                        }else{
                            reject({ 
                                status : 400,
                                message : "password salah"
                            })
                        }
                    }
                }else{
                    reject({
                        status : 500,
                        message : "Internal Server Error",
                        results : err
                    })
                }
            })
        })
    },
    emailVerifycation : (email) => {
        return new Promise((resolve, reject)=> {
            connection.query(`UPDATE table_user SET verified='true' WHERE email='${email}'`, function(err, results){
                if(!err){
                    resolve(results)
                }else{
                    reject(err)
                }
            })
        })
    }
};

module.exports = user;