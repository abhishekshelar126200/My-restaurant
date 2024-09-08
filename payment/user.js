const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    id:String,
    name:String,
    email:String,
    password:String,
    confirmPassword:String,
    phoneNumber:String
})

const newUser=mongoose.model('resaurantUsers',userSchema);

module.exports=newUser;