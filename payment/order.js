const mongoose=require('mongoose');

const recordSchema=new mongoose.Schema({
    id:String,
    restaurant:String,
    orderItem:String,
    itemsCount:String,
    amount:String,
    status:Boolean,
    orderDate:String,
});

const newRecord=mongoose.model('order',recordSchema);

module.exports=newRecord