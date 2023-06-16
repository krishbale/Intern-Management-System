const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)
const opportunitySchema = new mongoose.Schema(
    {
    companyid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Company'
    },
    department:{
        type:String,
        required:true
    },
    Jobtitle:{
        type:String,
        required:true
    },
    descriptions:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }

    

},
{
    timestamps:true
}
)


const Opportunity = mongoose.model('Opportunity',opportunitySchema);



module.exports= Opportunity;