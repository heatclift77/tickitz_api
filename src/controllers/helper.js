const model = require('../models/helper')

exports.data_kota = (req, res)=>{
    model.dataKota()
    .then(response=>{
        res.json({
            data : response.data
        }).status(200)
    })
    .catch(err=>{
        res.json({
            data  : err.data
        }).status(500)
    })
}
