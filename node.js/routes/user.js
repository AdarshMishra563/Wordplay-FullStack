const mongoose=require('mongoose');
const ProductSch=new mongoose.Schema({username:{
    type:String,
    required:true,
    unique:true,
    trim:true
},email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
wins:{
    type:Number,
    default:0
}

});
    module.exports = mongoose.model('user',ProductSch);