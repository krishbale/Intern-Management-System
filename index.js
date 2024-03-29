const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')

const express = require('express');

const app = express();

const Application = require('./models/applicationSchema')
require('dotenv').config();
app.use(cookieParser())

app.use(express.json())
const dbconnect = require('./DB/dbconnect')
const PORT = process.env.PORT || 5000

const companyRouter = require('./routes/company')
const applicantRouter = require('./routes/candidate');
const Opportunity = require("./models/jobSchema");
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.use('/company',companyRouter)
  app.use('/applicant',applicantRouter)

const startserver = async() =>{
  try{
    await dbconnect(process.env.MONGODB_URL);
    app.listen(PORT,async()=>{
      console.log(`Server is connected at http://localhost:${PORT}`)
  })
  }catch(e){
    console.log(e);
  }
}
startserver();