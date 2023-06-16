const express = require('express')
const router = express.Router();
const {createapplication,deleteapplication,getallapplication, getapplication} = require('../controllers/application')
const authenticate = require('../middleware/auth')

const {register,login,logout,} = require('../controllers/candidate')
router.post('/register',register)
router.post('/login',login)
//applicant create application
router.post('/createapplication',authenticate,createapplication);
router.put('deleteapplication/:id',authenticate,deleteapplication);
router.get('/logout',authenticate,logout)
//get all application applied  for specific applicant
router.get('/getallapplication',authenticate,getallapplication);
//get specific application by application id
router.get('/getapplication/:id',authenticate,getapplication);
module.exports = router;