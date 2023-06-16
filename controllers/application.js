const Application = require("../models/applicationSchema");
//appyiing for job by applicant using jobid and companyid for specific job
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
            new Application({Name,Email,Contact,Qualification,Coverletter,Resume,applicantid:user._id,companyid:companyid,opportunityid:opportunityid})
            
            await application.save()
            res.status(200).json({message:"Application created successfully"})
        }
    }catch(err){
        console.log(err)
    }
}

//delete specific job application by theier id
const deleteapplication = async(req,res) =>{

    const { id } =   req.params;
    try{
        const deleteapplication = await Application.findOneAndDelete({_id:id})
        
        if(!deleteapplication){
            return res.status(400).json({message:"eror found"})
        }
        
    }catch(err){
        console.log(err)
    }

   
}
//get all job application  for specific company or applicant

const getallapplication = async (req,res) =>{
    try{
        const user = await req.rootUser;
        // console.log(user)
        const  applicationforcompany =     await Application.find ({companyid:user._id})
         
        
        const applicationbycandidate = await Application.find({applicantid:user._id})
        ///one of them will be empty so we concat both of them for easy to pass the data alternaively 

        const application = applicationforcompany.concat(applicationbycandidate)
        res.status(200).json({application})
        

    }catch(e){
        console.log(e)
    }
}
//get specific job application by id
const getapplication = async (req,res) =>{
    const { id } =   req.params;
    try{
    
    
      const applications = await Application.find({opportunityid:id});
        // const totalapplication = applications.length;
        // cosole.log(totalapplication);
        res.json(applications);
    }catch(e){
        console.log(e)
    }
    



      



  

    
}
// http://localhost:5000/company/getapplicationby?date=2023-06-16
// http://localhost:5000/company/getapplicationby?status=pending
// http://localhost:5000/company/getapplicationby?qualifications=bachlors


const getallapplicationfilter = async (req, res) => {
    try {
      const user = await req.rootUser;
      const { qualifications, status, date } = req.query; // Assuming the filter criteria are passed as query parameters
      
      let filter = { companyid: user._id };
  
      if (qualifications) {
        filter.Qualification = qualifications;
      }
  
      if (status) {
        filter.status = status;
      }
  
      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);
        filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
      }
  
      const applicationforcompany = await Application.find(filter);
  
      const application = applicationforcompany;
      res.status(200).json({ application });
    } catch (e) {
      console.log(e);
    }
  };
  
module.exports = {createapplication,deleteapplication,getallapplication,getapplication,getallapplicationfilter}