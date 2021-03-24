const model = require("../models/user");
const standart_response = require('../utilities/standart_response')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const {email, password} = req.body
    if(email == undefined || password == undefined){
        res.json({
            status : 400,
            message : 'masukkan email dan password dengan benar'
        })
    }else{
        model.login(email, password)
        .then(response => {
            const payload = {email : response.results[0].email}
            jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '1h' }, function(err, token){
                res.json({
                    status : response.status,
                    message : response.message,
                    token : token
                })
            })
        })
        .catch(err =>{
            standart_response(res, err.status, err.message, [])
        });
    }
};
exports.verifycation = (req, res) => {
    const email = req.params.email;
    model.emailVerifycation(email)
    .then(response => {
        res.redirect('http://localhost:3000/signin')
    })
    .catch(err =>{
        res.send(err);
    });
};


exports.postUser = async (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;
    if(email == undefined || pass == undefined){
        standart_response(res, 400, "Bad Request", [])
    }else{
        model.register(email, pass)
        .then(response => {
            let { status, message , results} = response
            standart_response(res, status, message, results)
            next()
        })
        .catch(reject =>{
            let { status, message , err} = reject
            standart_response(res, status, message, err)
        });
    };
}
exports.updateUser = (req, res) => {
    const id_user = req.params.id;
    const {password, username, firstName, lastName, telephone} = req.body;
    model.updateUser(id_user, password, username, firstName, lastName, telephone)
    .then(response => {
        res.json({
            message : 'Data Updated',
            results : [response]
        }).status(201)
    })
    .catch(err =>{
        res.send(err);
    });
};
exports.getUserById = (req, res) => {
    const id_user = req.params.id;
    model.getUserById(id_user)
    .then(response => {
        res.status(201);
        res.send(response);
    })
    .catch(err =>{
        res.send(err);
    });
};
