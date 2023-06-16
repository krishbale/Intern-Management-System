const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/auth')
const {createjob,updatejob, deletejob,getallapplication, getapplication} = require('../controllers/opportunity')
const {register,login,logout, } = require('../controllers/company')
router.post('/register',register)
router.post('/login',login)
router.post('/createjob',authenticate,createjob)
router.put('/updatejob/:id',authenticate,updatejob);
router.put('/deletejob/:id',authenticate,deletejob);
router.get('/getallapplication/',authenticate,getallapplication);
// router.get('/getapplications',authenticate,getapplication)

router.get('/logout',authenticate,logout)

module.exports = router;