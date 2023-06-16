const Opportunity = require("../models/opportunitySchema");
const Application = require("../models/applicationSchema");
const { parse } = require("dotenv");
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
const deletejob = async(req,res) =>{
    const { id } =   req.params;
    try{
        const deletejob = await Opportunity.findOneAndDelete({_id:id})
        const deleteapplication = await Application.findOneAndDelete({opportunityid:id})
        
        if(!deletejob && !deleteapplication){
            return res.status(400).json({message:"eror found"})
        }
        
    }catch(err){
        console.log(err)
    }
}
const getallapplication = async (req,res) =>{
    try{
        const user = await req.rootUser;
        const  application = await Application.find
        ({companyid:user._id})
        res.status(200).json({application})
    }catch(e){
        console.log(e)
    }
}
const getapplication = async (req,res) =>{
    const user = await req.rootUser;
        const {companyid} = user._id;

    const { Qualification, status, submissionDate } = req.query;
  
    const filter = { companyid };
    if (Qualification) {
        filter.Qualification = { $regex: Qualification, $options: 'i' };
      }
  
      if (status) {
        filter.status = status;
      }
  
     
      const applications = await Application.find(filter);
        res.json(applications);

    



      



    // let page = parseInt(req.query.page) -1|| 0;

    // let limit = Number(req.query.limit) || 5;


    // let status = req.query.status || "pending"



    // let skip = parseInt(req.query.skip) || 1
    //         const  application = await Application.find
    //     ({companyid:user._id}).skip(skip).limit(limit);

    //     const total = await Application.countDocuments({companyid:user._id})


        
        
        

        // res.json({
        //     success: true,
        //     total,
        //     limit,
        //     status,limit,
        //     application
        // });


    
}


module.exports = {createjob,updatejob,deletejob,getallapplication,getapplication}
