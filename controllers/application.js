const Application = require("../models/applicationSchema");

const createapplication = async(req,res) =>{
    const opportunityid = req.query.opportunityid;
    const companyid = req.query.companyid;
console.log(req.query)
  
    const {
        Name,
        Email,
        Contact,
        Qualification,
        Coverletter,
        Resume
    } = req.body;

    if(!Name || !Email || !Contact || !Qualification || !Coverletter || !Resume){


        return res.status(422).json({error: "please fill the field properly "})
    }

    try{
        const user = await req.rootUser;
        // console.log(user)
        if(user){
            const application = 
            new Application({Name,Email,Contact,Qualification,Coverletter,Resume,applicant:user._id,companyid:companyid,opportunityid:opportunityid})
            
            await application.save()
            res.status(200).json({message:"Application created successfully"})
        }
    }catch(err){
        console.log(err)
    }
}
const updateapplication = async(req,res) =>{
    
   
}
module.exports = {createapplication,updateapplication}