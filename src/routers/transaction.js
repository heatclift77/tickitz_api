const express = require('express')
const router = express.Router()
const transactions = require('../controllers/transaction.js')

router.delete('/delete/:id', transactions.deleteById)
router.delete('/delete/user/:id', transactions.deleteByIdUser)
router.get('/:page', transactions.getTransactions)
router.get('/user/get/:id_user/:page', transactions.getTransactionsByUser)

module.exports = router