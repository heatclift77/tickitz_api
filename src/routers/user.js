const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')

router.post('/addUser', user.postUser)
router.put('/update/:id', user.updateUser)
// router.get('/', user.getUser)
// router.get('/:id', user.getUserById)

module.exports = router