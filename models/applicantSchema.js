const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const applicantSchema = new mongoose.Schema({
    applicantname:{
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
    interest:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
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
applicantSchema.pre('save', async function(next)  {
    
    if ( this.isModified('password'))
    {
        this.password=  await bcrypt.hash(this.password,12);
    }
    next();

 })

//generating token with jwt
 applicantSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRECT_KEY);
        this.tokens = this.tokens.concat({token:token}); 
         await this.save();
         return token;


    }catch(err){
        console.log(err)
    }
}


const Applicant = mongoose.model('Applicant',applicantSchema)

module.exports = Applicant;