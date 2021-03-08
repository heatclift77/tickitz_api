// const connection = require('../connection')
const mysql = require("mysql2");
const { v4:uuidv4 } = require("uuid"); 

exports.login = (req, res)=>{
    const email = req.body.email;
    const pass = req.body.password;

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "tickitz"
    });

    connection.query(
        `SELECT email FROM table_akun WHERE email='${email}' AND password ='${pass}'`,
        function(err, results, fields) {
            if(!err){
                if(results.length > 0){
                    res.status(200);
                    res.send({ token : uuidv4()});
                }else{
                    res.status(400);
                    res.send({message:"email atau password salah"});
                }
            }else{
                res.send(err);
            }
        });
};