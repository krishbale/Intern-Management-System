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
    try {
      const { page, limit } = req.query;
  
      const options = {};
  
      if (page && limit) {
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = parseInt(page) * parseInt(limit);
        options.skip = startIndex;
        options.limit = parseInt(limit);
      }
  
      const jobs = await Opportunity.find({ companyid: user._id }, null, options);
      res.status(200).json({ jobs });
    } catch (err) {
      console.log(err);
    }

}

//specific job details and  and their total applicants till now
// http://localhost:5000/company/viewjob/648c23d8741f362522245b76?page=1&limit=2
const view1job = async(req,res) =>{
  const { id } = req.params;
  const { page, limit } = req.query;

  try {
    const jobs = await Opportunity.find({ _id: id });

    let options = {};

    if (page && limit) {
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = parseInt(page) * parseInt(limit);
      options = { skip: startIndex, limit: parseInt(limit) };
    }

    const applications = await Application.find({ opportunityid: id }, null, options);
    const totalapplication = applications.length;

    res.status(200).json({ jobs, totalapplication, applications });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {createjob,updatejob,deletejob,viewjob,view1job}
