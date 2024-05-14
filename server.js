const express = require("express");
const mongoose = require('mongoose')
require('dotenv').config();
const authRoute = require("./routes/auth")
const app = express();
// express parser which is alternate to bodyparser
app.use(express.json());

app.get('/health',(req, res)=>{
    console.log(' I am health API')
    res.json({service: "backend job listing API service",
status: "active",
time: new Date()})
})

app.use("/api/v1/auth",authRoute)

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB connected!")
})
.catch((error)=>{
    console.log("DB failed to connect",error)
})
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(` Backend server running at port : ${PORT}`);
});

