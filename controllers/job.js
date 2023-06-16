const Opportunity = require("../models/jobSchema");
const Application = require("../models/applicationSchema");
const { parse } = require("dotenv");
//create job by company
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
//update specific job by theier id
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
//delete specific job by theier id
const deletejob = async(req,res) =>{
    const { id } =   req.params;
    try{
        const deletejob = await Opportunity.findOneAndDelete({_id:id})
        const deleteapplication = await Application.findOneAndDelete({opportunityid:id})
        
        if(!deletejob && !deleteapplication){
            return res.status(400).json({message:"error found"})
        }
        
    }catch(err){
        console.log(err)
    }
}


//total job created by company
const viewjob = async(req,res) =>{
    const user = await req.rootUser;
    // const { id } =   req.params;
    try{
        const jobs = await Opportunity.find({companyid:user._id})
        res.status(200).json({jobs})
    }catch(err){
        console.log(err)
    }

}

//specific job details and  and their total applicants till now
const view1job = async(req,res) =>{
    const { id} =   req.params;
    try{
        const jobs = await Opportunity.find({_id:id})
        const applications = await Application.find({opportunityid:id});
        const totalapplication = applications.length;
        

        res.status(200).json({jobs,"totalapplication":totalapplication,applications})    

    }catch(err){
        console.log(err)
    }   
}

module.exports = {createjob,updatejob,deletejob,viewjob,view1job}
