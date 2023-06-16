const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const companySchema = new mongoose.Schema({
    companyname:{
        type:String,
        required:true,
    }
    ,
    address:{
        type:String,
        required:true,
    },
  
    description:{
        type:String,
        required:true,
    },
    industry:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true

            }

        }
       
    ],
})
//encrypting password with bcryptjs
companySchema.pre('save', async function(next)  {
    
    if ( this.isModified('password'))
    {
        this.password=  await bcrypt.hash(this.password,12);
    }
    next();

 })

//generating token with jwt
 companySchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRECT_KEY);
        this.tokens = this.tokens.concat({token:token}); 
         await this.save();
         return token;


    }catch(err){
        console.log(err)
    }
}



const Company = mongoose.model('Company',companySchema)
module.exports = Company