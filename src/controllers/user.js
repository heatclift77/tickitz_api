const model = require("../models/user");
// exports.getUser = (req, res)=>{
//     connection.query(`SELECT * FROM table_user ORDER BY created_at ASC`, function(err, results, fields){
//         if(!err){
//             res.status(200)
//             res.send(results)
//         }else{
//             res.status(400)
//             res.send(err)
//         }
//     })
// }
// exports.getUserById = (req, res)=>{
//     const id_user = req.params.id_user
//     connection.query(`SELECT * FROM table_user WHERE id_user='${id_user}' ORDER BY created_at ASC`, function(err, results, fields){
//         if(!err){
//             res.status(200)
//             res.send(results)
//         }else{
//             res.status(400)
//             res.send(err)
//         }
//     })
// }

exports.postUser = (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    model.postUser(email, pass)
    .then(response => {
        res.status(201);
        res.send(response);
    })
    .catch(err =>{
        res.send(err);
    });
};
exports.updateUser = (req, res) => {
    const id_user = req.params.id;
    const pass = req.body.pass;
    const username =  req.body.username;
    const firsName =  req.body.firstName;
    const lastName =  req.body.lastName;
    const telephone =  req.body.telephone;
    model.updateUser(id_user, pass, username, firsName, lastName, telephone)
    .then(response => {
        res.status(201);
        res.send(response);
    })
    .catch(err =>{
        res.send(err);
    });
};