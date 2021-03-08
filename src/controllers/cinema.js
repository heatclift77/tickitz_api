const { v4:uuidv4 } = require("uuid");
const mysql = require("mysql2");
require("dotenv").config();


// connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DBS
});
// ------------

exports.postCinema = (req, res)=>{
    const id_cinema = uuidv4();
    const id_movie = req.body.id_movie;
    const cinema = req.body.cinema;
    const price = req.body.price;

    connection.query(`
    INSERT INTO table_cinema 
    (id_cinema, id_movie, cinema, price) 
    VALUES 
    ('${id_cinema}', '${id_movie}', '${cinema}', '${price}')`, 
    function(err, results){
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
            }else{
                res.status(400);
                res.send({ message : "bad request"});
        }
    });
};

exports.getCinemaByIdMovie = (req, res) => {
    const id_movie = req.params.id_movie;
    connection.query(`SELECT * FROM table_cinema WHERE id_movie='${id_movie}'`, function(err, results){
        if(!err){
            res.status(200);
            res.send(results);
        }else{
            res.status(400);
            res.send(err);
        }
    });
};
