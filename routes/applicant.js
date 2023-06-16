const express = require('express')
const router = express.Router();
const {createapplication,updateapplication} = require('../controllers/application')
const authenticate = require('../middleware/auth')

const {register,login,logout,} = require('../controllers/applicant')
router.post('/register',register)
router.post('/login',login)
router.put('/updatejob',authenticate,updateapplication)
//applicant create application
router.post('/createapplication',authenticate,createapplication);
router.get('/logout',authenticate,logout)
module.exports = router;