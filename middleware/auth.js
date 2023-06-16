const jwt = require("jsonwebtoken");

const Applicant = require("../models/applicantSchema");
const Company = require("../models/companySchema");



const authenticate = async (req,res,next)=>{
    
    try{
        const token = req.cookies.jwtoken;
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.SECRECT_KEY);
        const applicant = await Applicant.findOne({_id:verifyToken._id, "tokens.token": token});
        const company = await Company.findOne({_id:verifyToken._id, "tokens.token": token});

        const rootUser = applicant ? applicant : company;
        

        // await Applicant.findOne({ _id:verifyToken._id, "tokens.token": token})
        //  ||
        //   await Company.findOne({ _id:verifyToken._id, "tokens.token": token}); 
    //   const rootUser =  await Applicant.findOne({ _id:verifyToken._id, "tokens.token": token})
   
   
        if(!rootUser){
            throw new Error('User not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();

        
  
    
     }catch(e){
        res.status(401).send('Unauthorized:NO token provided');
        console.log(e);

    }
    
   
}
module.exports = authenticate;