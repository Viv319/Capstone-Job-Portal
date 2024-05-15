const express = require("express");
const mongoose = require('mongoose')
require('dotenv').config();
const authRoute = require("./routes/auth")
const app = express();
// express parser which is alternate to bodyparser
app.use(express.json());

const jobRoute= require("./routes/job")

app.get('/',(req, res) => {
    res.send("Welcome to Job Portal")
})

app.get('/health',(req, res)=>{
    console.log(' I am health API')
    res.json({service: "backend job listing API service",
    status: "active",
    time: new Date()})
})

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/auth",jobRoute)

app.use((error, req, res, next)=>{
    console.log(error);
    res.status(500),
    res.json({errorMessage: "Something went wrong"});
})

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

