const { v4:uuidv4 } = require('uuid')
const mysql = require('mysql2')
require('dotenv').config()


// connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DBS
})
// ------------

exports.getMovie = (req, res)=>{
    let data = req.params.page
    movie_page = (data == 1) ? data = 0:  data * 5 - 5;
    connection.query(`SELECT * FROM table_movie LIMIT ${movie_page}, 5`, function(err, results, fields){
        if(!err){
            res.status(200)
            res.send(results)
        }else{
            res.send(err)
        }
    })
}
exports.getMovieById = (req, res)=>{
    let id_movie = req.params.id
    connection.query(`SELECT * FROM table_movie WHERE id_movie = '${id_movie}'`, function(err, results, fields){
        if(!err){
            res.status(200)
            res.send(results)
        }else{
            res.send(err)
        }
    })
}
exports.searchMovie = (req, res)=>{
    const key = req.params.key
    connection.query(`SELECT * FROM table_movie WHERE title LIKE '${key}_%'`, function(err, results, fields){
        if(!err){
            res.status(200)
            res.send(results)
        }else{
            res.send(err)
        }
    })
}

exports.postMovie = (req, res)=>{
    const id_movie = uuidv4()
    const title = req.body.title
    const genre = req.body.genre
    const release_date = req.body.release_date
    const directed_by = req.body.directed_by
    const duration = req.body.duration
    const casts = req.body.casts
    const synopsis = req.body.synopsis
    const created_at = new Date()
    const updated_at = new Date()

    connection.query(`INSERT INTO table_movie 
    (id_movie, title, genre, release_date, directed_by, duration, casts, synopsis, created_at, updated_at) 
    VALUES 
    ('${id_movie}', '${title}', '${genre}', '${release_date}', '${directed_by}', '${duration}', '${casts}', '${synopsis}', '${created_at}', '${updated_at}')`, 
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
                console.log(results);
            }else{
                res.status(400)
                res.send({ message : "bad request"})
                console.log(title, genre, duration, directed_by, casts, synopsis, release_date);
                console.log(err);
        }
    })
}