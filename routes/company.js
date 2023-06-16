const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/auth')
const {register,login,logout,createjob } = require('../controllers/company')
router.post('/register',register)
router.post('/login',login)
router.post('/createjob',authenticate,createjob)


router.get('/logout',authenticate,logout)

module.exports = router;