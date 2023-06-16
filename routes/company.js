const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/auth')
const {createjob,updatejob, deletejob,viewjob,view1job} = require('../controllers/job')
const {register,login,logout, } = require('../controllers/company')
const {getapplication,getallapplication, getallapplicationfilter} = require('../controllers/application')
router.post('/register',register)
router.post('/login',login)
router.post('/createjob',authenticate,createjob)
router.put('/updatejob/:id',authenticate,updatejob);
router.put('/deletejob/:id',authenticate,deletejob);
router.get('/viewjob',authenticate,viewjob);
router.get('/viewjob/:id',authenticate,view1job);
router.get('/getapplication/:id',authenticate,getapplication);
router.get('/getallapplication/',authenticate,getallapplication);
router.get('/getapplicationby/',authenticate,getallapplicationfilter); 

router.get('/logout',authenticate,logout)

module.exports = router;