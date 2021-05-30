const model = require("../models/user");
const standart_response = require("../utilities/standart_response");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    const {email, password} = req.body;
    if(email == undefined || password == undefined){
        res.json({
            status : 400,
            message : "masukkan email dan password dengan benar"
        });
    }else{
        model.login(email, password)
        .then(response => {
            const payload = {email : response.results[0].email};
            jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: "1h" }, function(err, token){
                res.json({
                    status : response.status,
                    message : response.message,
                    token : token,
                    data : response.results[0]
                });
            });
            
        })
        .catch(err =>{
            standart_response(res, err.status, err.message, []);
        });
    }
};
exports.verifycation = (req, res) => {
    const email = req.params.email;
    model.emailVerifycation(email)
    .then(response => {
        res.redirect(`${process.env.DOMAIN}/signin`)
    })
    .catch(err =>{
        res.send(err);
    });
};
exports.postUser = async (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(email, pass);
    if(email == undefined || pass == undefined){
        standart_response(res, 400, "Bad Request", []);
    }else{
        model.register(email, pass)
        .then(response => {
            let { status, message , results} = response;
            standart_response(res, status, message, results);
            next();
        })
        .catch(reject =>{
            let { status, message , err} = reject;
            standart_response(res, status, message, err);
        });
    }
};
exports.updateUser = (req, res) => {
    const id_user = req.params.id;
    const { username, firstName, lastName, telephone } = req.body;
    model.updateUser(id_user, username, firstName, lastName, telephone)
    .then(response => {
        res.json({
            message : "Data Updated",
            results : [response]
        }).status(201);
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
exports.HandleForgotPass = (req, res) => {
    const email = req.body.email;
    if(email == undefined){
        standart_response(res, 400, `key = ${email}, key Harus email`);
    }else{
        model.HandleForgotPass(email)
        .then(response => {
            standart_response(res, response.status, response.message, response.data.length);
        })
        .catch(err =>{
            standart_response(res, err.status, err.message, err.data.length);
        });
    }
};
exports.confirmNewPass = (req, res) => {
    const { newPass, email } = req.body;
    if(newPass == undefined || email == undefined){
        standart_response(res, 400, "masukkan key dengan benar", []);
    }else{
        model.handleChangePass(newPass, email)
        .then(response => {
            standart_response(res, response.status, response.message, []);
        })
        .catch(err =>{
            standart_response(res, err.status, err.message, err.data.length);
        });
    }
};
exports.setPassword = (req, res) => {
    const { password } = req.body
    const id_user = req.params.id
    if(password == undefined){
        res.json({
            status : 400,
            message : 'bad request'
        }).status(400)
    }else{
        model.setPassword(password, id_user)
        .then(response=>{
            res.json({
                status : response.status,
                message : response.message
            })
        })
        .catch(err=>{
            res.json({
                status : err.status,
                message : err.message,
                err : err.err
            })
        })
    }
}
exports.getKota = (req, res)=>{
    model.getKota()
    .then(response=>{
        res.json({
            status:response.status,
            data:response.data
        })
    })
}
exports.getCinema = (req, res)=>{
    const kota = req.body.kota
    model.getCinemaList(kota)
    .then(response=>{
        res.json({
            status:response.status,
            data:response.data
        })
    })
}
exports.sendDataUser = (req, res)=>{
    const {token} = req.body
    jwt.verify(token, process.env.PRIVATE_KEY, function(err, decode){
        if(!err){
            const email = decode.email
            model.sendDataUser(email)
            .then(response=>{
                standart_response(res, 200, response.message, response.data)
            })
            .catch(err=>{
                standart_response(res, 500, err.message, err.data)
            })
        }else{
            
        }
    });
}
exports.updateImgProfil = (req, res) => {
    const { id_user } = req.body;
    const img = `${process.env.SELF}/img/${req.file.filename}`
    model.updateImgProfile(id_user, img)
    .then(response => {
        res.status(201).json({status:response.status,message:response.message})
    })
    .catch(err =>{
        res.status(201).json({status:err.status,message:err.message})
    });
};
