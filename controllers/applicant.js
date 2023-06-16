
const bcrypt = require('bcryptjs');
const Application = require("../models/applicationSchema");
const Applicant = require("../models/applicantSchema");
// const mongoose = require('mongoose');
const register = async(req,res)=>{


    const {applicantname,address,description,interest, username , password, } = req.body;
    if(!username  || !password || !address || !description || !interest || !applicantname  ){
    
        return res.status(422).json({error: "please fill the field properly "})
    }
    try{
      const userExist =  await Applicant.findOne({ username:username })
      if(userExist){
        return res.status(422).json({error: "Choose another username "}) 
                     }else {
                        const user = new Applicant({ username , password, address, description, interest, applicantname })
                        
                        await  user.save()
                            res.json({message: "User registered successfully "}) 
                     }
    }catch(err){
        console.log(err);
    }
 








   

}
const login = async(req,res) =>{

    try{
        const { username , password, } = req.body;
        if(!username||!password){
            return res.status(422).json({error: "please fill the field properly "})
    
        }
        
        const userLogin = await Applicant.findOne({username:username})
        if(!userLogin){
            res.status(422).json({"message" : "Not a Valid Credentials"})
            console.log('Not valid Credentials')
        }else if(userLogin){

            //comparing password with bcryptjs
            const isMatch = await bcrypt.compare(password, userLogin.password)
            if(!isMatch){
                res.status(422).json({"message" : "Try again with valid passwords"})
            }else{
               

        //token generation
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            })
            res.status(200)
            .json({
                message:"user login successfull",
               
                success:true,
            });
            }
            
            }
            } catch(err){
                console.log(err)
               
            
        }
    

}
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
const logout = async(req,res) =>{
    console.log("logout server")    
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('user logout');
}
module.exports ={register,login,logout,createapplication}