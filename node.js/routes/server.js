
const mongoose=require('mongoose')
const express=require('express');
const connecttodb=require('./db');
const cors = require('cors');

const Model=require('./user')
connecttodb();
const app=express();
app.use(cors());
app.use(express.json());
const authRoutes=require('./auth-router')
app.use("/api/auth",authRoutes)

const PORT=  3000;
  
app.get('/',async (req,res)=>{
   
 
    const result =  await Model.find();
    
    console.log(resultb)
    res.status(200).json({ data: result, message: 'Data received successfully' });

})






app.listen(PORT,console.log(`started at port${PORT}`))





