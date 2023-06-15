const express = require('express');
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.listen(PORT,async()=>{
    console.log(`Server is connected at http://localhost:${PORT}`)
})