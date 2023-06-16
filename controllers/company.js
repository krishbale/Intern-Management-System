const  Company = require( "../models/companySchema");
const bcrypt = require('bcryptjs');
const Opportunity = require("../models/opportunitySchema");
//register
const register = async(req,res)=>{


    const {companyname,address,description,industry, username , password, } = req.body;
    if(!username  || !password || !address || !description || !industry || !companyname  ){
    
        return res.status(422).json({error: "please fill the field properly "})
    }
    try{
      const userExist =  await Company.findOne({ username:username })
      if(userExist){
        return res.status(422).json({error: "Choose another username "}) 
                     }else {
                        const user = new Company({ username , password, address, description, industry, companyname })
                        
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
        
        const userLogin = await Company.findOne({username:username})
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

const createjob = async(req,res) =>{
    const {department,Jobtitle,descriptions,skills,deadline,salary} = req.body;

    if(!department || !Jobtitle || !descriptions || !skills || !deadline || !salary){   

        return res.status(422).json({error: "please fill the field properly "})
    }
    try{
        const user = await req.rootUser;
        // console.log(user)
        if(user){
            const job = new Opportunity({department,Jobtitle,descriptions,skills,deadline,salary,companyid:user._id})
            await job.save()
            res.status(200).json({message:"job created successfully"})
        }
    }catch(err){
        console.log(err)
    }
}
//logout
const logout = async(req,res) =>{
    console.log("logout server")    
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('user logout');
}
module.exports ={register,login,logout,createjob}