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