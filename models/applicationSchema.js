const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema(
    {
    opportunityid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Opportunity'
    },
    companyid:{ 
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Company' 
    },
    applicantid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Applicant'
    },
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Contact:{
        type:Number,
        required:true
    },
    Qualification:{
        type:String,
        required:true
    },
    Coverletter:{ 
        type:String,
        required:true
    },
    Resume:{
        type:String,
        required:true
    },        
    status:{
        default:"pending",
        type:String,
    }
    

    

},
{
    timestamps:true
}
)


const Application = mongoose.model('Application',applicationSchema);



module.exports= Application;