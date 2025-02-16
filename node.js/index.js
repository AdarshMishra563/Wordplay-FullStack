const mongoose=require('mongoose');
const express=require('express');
const Model=require('./routes/user')
const db=require('./routes/db')
db();
const cors=require('cors')
const app=express();
app.use(cors())
app.use(express.json());
app.post('/',async (req,res)=>{
    const {username,password}=req.body;
    const data=await Model.findOne({$or:[{username,password}]});
    res.status(200).json({data})
})
    app.listen(5500)