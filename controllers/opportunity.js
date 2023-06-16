const Opportunity = require("../models/opportunitySchema");

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
const updatejob = async(req,res) =>{    
   const { id } =   req.params;
   const {department,Jobtitle,descriptions,skills,deadline,salary} = req.body;
try{
    const doc = await Opportunity.findOneAndUpdate({_id:id},
        {
            $set:{
                "department":department,
                "Jobtitle":Jobtitle,
                "descriptions":descriptions,
                "skills":skills,
                "deadline":deadline,
                "salary":salary,
            }},
            )
            if(!doc){
                return res.status(400).json({message:"eror found"})
            }
}catch(err){
    console.log(err)
}
res.status(200).json({message:"job updated successfully"})
   
}
module.exports = {createjob,updatejob}
