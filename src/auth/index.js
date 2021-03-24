const jwt = require('jsonwebtoken')

const verify = (req, res, next)=>{
    const authorization = req.headers.authorization
    if(!authorization){
        return res.json({
            message : 'Error, Server Butuh Token'
        }).status(400)
    }
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.PRIVATE_KEY, function(err, decode){
        if(err){
            res.json({
                message : 'token Invalid'
            }).status(400)
        }else{
            next()
        }
    })
}

module.exports = {verify}