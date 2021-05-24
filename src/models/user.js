const { v4:uuidv4 } = require("uuid");
const connection = require("../config/db");
const timestamp = require("time-stamp");
const bcrypt = require("bcryptjs");
const user = {
    register : (email, pass) => {
        const id_user = uuidv4();
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT COUNT(email) AS email FROM table_user WHERE email='${email}'`, function(err, results){
                if(!err){
                    if(results[0].email == 0){
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(pass, salt);
                        connection.query(
                            `INSERT INTO table_user (id_user, email, password, img_profil)
                            VALUES 
                            ('${id_user}','${email}','${hash}', '${process.env.SERVER}img/default.png')
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
                        });
                    }
                }else{
                    reject({
                        status : 500,
                        message : "internal Server Error",
                        err : err
                    });
                }
            });
        });
    },
    updateUser : (id_user, username, firstName, lastName, telephone)=>{
        return new Promise((resolve, reject)=>{
            const updated_at = timestamp("YYYY-MM-DD HH:mm:ss");
            connection.query(
                `UPDATE table_user 
                SET telephone='${telephone}', username='${username}', firstName='${firstName}', lastName='${lastName}', updated_at='${updated_at}'
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
    setPassword : (password, id_user) => {
        return new Promise ((resolve, reject)=>{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            connection.query(`UPDATE table_user SET password='${hash}' WHERE id_user='${id_user}'`, function(err, results){
                if(!err){
                    resolve({
                        status : 200,
                        message : 'password updated'
                    })
                }else{
                    reject({
                        status : 500,
                        message : 'internal server error',
                        err : err
                    })
                }
            })
        })
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
                        });
                    }else{
                        const passwordMatch = bcrypt.compareSync(pass, results[0].password);
                        if(passwordMatch){
                            if(results[0].verified == "true"){
                                resolve({
                                    status : 200,
                                    message : "Login Succes",
                                    results : results
                                });
                            }else{
                                reject({
                                    status : 406,
                                    message : "Belum terverifikasi"
                                });
                            }
                        }else{
                            reject({ 
                                status : 400,
                                message : "password salah"
                            });
                        }
                    }
                }else{
                    reject({
                        status : 500,
                        message : "Internal Server Error",
                        results : err
                    });
                }
            });
        });
    },
    emailVerifycation : (email) => {
        return new Promise((resolve, reject)=> {
            connection.query(`UPDATE table_user SET verified='true' WHERE email='${email}'`, function(err, results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        });
    },
    HandleForgotPass : (email) => {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM table_user WHERE email='${email}'`, function(err, results){
                if(!err){
                    if(results.length == 0){
                        reject({
                            status : 400,
                            message : "Email Belum Terdaftar",
                            data : results
                        });
                    }else{
                        resolve({
                            status : 200,
                            message : "account approved",
                            data : results
                        });
                    }
                    resolve(results);
                }else{
                    reject({
                        status : 500,
                        message : "kesalahan server",
                        data : results
                    });
                }
            });
        });
    },
    handleChangePass : (newPass, email) => {
        return new Promise((resolve, reject)=>{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPass, salt);
            const changePass = `UPDATE table_user SET password='${hash}' WHERE email='${email}'`;
            connection.query(changePass, (err, results)=>{
                if(!err){
                    resolve({
                        status : 200,
                        message : "update Succes",
                        data : results
                    });
                }else{
                    reject({
                        status : 500,
                        message : "kesalahan server",
                        data : results
                    });
                }
            });
        });
    },
    getKota : (id_kota)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM kota`, function(err, results){
                if(!err){
                    resolve({
                        status:200,
                        data:results
                    })
                }else{
                    reject({
                        status:500,
                        message:'internal server error'
                    })
                }
            })
        })
    },
    getCinemaList : (kota)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM ${kota}`, function(err, results){
                if(!err){
                    resolve({
                        status:200,
                        data:results
                    })
                }else{
                    reject({
                        status:500,
                        message:'internal server error'
                    })
                }
            })
        })
    },
    sendDataUser : (email)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM table_user WHERE email='${email}'`, function(err, results){
                if(!err){
                    resolve({
                        message : 'token Valid',
                        data : results
                    })
                }else{
                    reject({
                        message : 'error',
                        data : err
                    })
                }
            })
        })
    },
    updateImgProfile : (id_user, img)=>{
        return new Promise((resolve, reject)=>{
            connection.query(
                `UPDATE table_user SET img_profil='${img}' WHERE id_user='${id_user}'`,
            function(err, results){
                if(!err){
                    resolve({status:200, message:"update profile berhasil"});
                }else{
                    reject({status:500, message:err.message});
                }
            });
        });
    }
};

module.exports = user;