const express = require('express')
const router = express.Router();
const {createapplication,deleteapplication} = require('../controllers/application')
const authenticate = require('../middleware/auth')

const {register,login,logout,} = require('../controllers/applicant')
router.post('/register',register)
router.post('/login',login)
//applicant create application
router.post('/createapplication',authenticate,createapplication);
router.put('deleteapplication/:id',authenticate,deleteapplication);
router.get('/logout',authenticate,logout)
module.exports = router;