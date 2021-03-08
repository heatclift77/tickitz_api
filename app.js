const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
// const bodyParser = require('body-parser')

// my module
// const signUp = require('./routers/signUp')
// const signIn = require('./routers/signIn')
// const movie = require('./routers/movie')
// const ticket = require('./routers/tickets')
// const transactions = require('./routers/transaction')
// const user = require('./routers/user')
// const cinema = require('./routers/cinema')
// const jadwal = require('./routers/jadwal_tayang')
const router = require('./src/routers')
// --------

// midleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded())
// app.use('/SignUp', signUp)
// app.use('/SignIn', signIn)
// app.use('/movie', movie)
// app.use('/ticket', ticket)
// app.use('/transaction', transactions)
// app.use('/user', user)
// app.use('/cinema', cinema)
// app.use('/jadwal_tayang', jadwal)
app.use('/v1', router)
app.listen(process.env.PORT, ()=>{
    console.log(`running on port ${process.env.PORT}`);
})