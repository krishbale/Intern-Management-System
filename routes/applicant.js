const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/auth')
const {register,login,logout,createapplication} = require('../controllers/applicant')
router.post('/register',register)
router.post('/login',login)
router.post('/createapplication',authenticate,createapplication);

router.get('/logout',authenticate,logout)
module.exports = router;