const { v4:uuidv4 } = require('uuid')
const mysql = require('mysql2')
require('dotenv').config()
const date = require('../date_format')


// connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DBS
})
// ------------

exports.postJadwal = (req, res)=>{
    const id_jadwal = uuidv4()
    const id_movie = req.body.id_movie
    const id_cinema = req.body.id_cinema
    const hari = req.body.hari
    const jam = req.body.jam
    const dateNow = new Date()
    const created_at = date.dateFormat(dateNow)
    const updated_at = date.dateFormat(dateNow)

    connection.query(`
    INSERT INTO table_jadwal_tayang 
    (id_jadwal, id_movie, id_cinema, hari, jam, created_at, updated_at) 
    VALUES 
    ('${id_jadwal}', '${id_movie}', '${id_cinema}', '${hari}', '${jam}', '${created_at}', '${updated_at}')`, 
    function(err, results, fields){
            if(!err){
                res.status(201)
                res.send({ 
                    message : "sucess",
                    fieldCount : results.fieldCount,
                    affectRows : results.affectedRows,
                    insertId: results.insertId,
                    info:results.info,
                    serverStatus:results.serverStatus,
                    warningStatus:results.warningStatus
                })
            }else{
                res.status(400)
                // res.send({ message : "bad request"})
                res.send(err)
        }
    })
}

exports.getByIdCinema = (req, res) => {
    const id_cinema = req.params.id_cinema
    connection.query(`SELECT * FROM table_jadwal_tayang WHERE id_cinema='${id_cinema}'`, function(err, results, fields){
        if(!err){
            res.status(200)
            res.send(results)
        }else{
            res.status(400)
            res.send(err)
        }
    })
}

