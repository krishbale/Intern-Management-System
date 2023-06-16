const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/auth')
const {register,login,logout} = require('../controllers/company')
router.post('/register',register)
router.post('/login',login)
router.get('/logout',authenticate,logout)
module.exports = router;