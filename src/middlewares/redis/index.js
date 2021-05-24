const redis = require("redis");
const client = redis.createClient(6379);

const cacheMovie = (req, res, next)=>{
    client.get("dataMovie", (err, data)=>{
        if(data != null){
            res.json({
                status : 200,
                data : JSON.parse(data)
            });
        }else{
            next();
        }
    });
};

module.exports = cacheMovie;