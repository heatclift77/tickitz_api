const { v4: uuidv4} = require("uuid");
const mysql = require("mysql2");

exports.postAkun = (req, res)=>{
    const email = req.body.email;
    const pass = req.body.password;
    const id_user = uuidv4();

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "tickitz"
    });
    
    connection.query(
        `INSERT INTO table_akun (email, password, id_user) VALUES ('${email}', '${pass}', '${id_user}')`,
        function(err, results) {
            if(!err){
                res.status(201);
                res.send({ 
                    message : "sucess",
                    fieldCount : results.fieldCount,
                    affectRows : results.affectedRows,
                    insertId: results.insertId,
                    info:results.info,
                    serverStatus:results.serverStatus,
                    warningStatus:results.warningStatus
                });
                console.log(results);
            }else{
                res.status(400);
                res.send({ message : "email sudah digunakan"});
            }
        });
};