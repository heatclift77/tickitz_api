const connection = require('../config/db')
const helper = ({
    dataKota : ()=>{
        return new Promise((resolve, reject)=>{
            const query = `select min(lokasi) lokasi from table_data_cabang GROUP BY lokasi`
            connection.query(query,(err, results)=>{
                if(!err){
                    resolve({
                        data : results
                    })
                }else{
                    reject({
                        data : err
                    })
                }
            })
        })
    }
})

module.exports = helper