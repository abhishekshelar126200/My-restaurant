const express=require('express');
const app=express();
const path=require('path');
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongoose=require('mongoose');
const { v4: uuidv4 } = require('uuid');
const order=require('./order.js');


const stripe=require("stripe")('sk_test_51PttijP8cLBj066MwY9i8zWFryl8qGrsF31avNyMLLfIfYFMwlA5YF3htFJPurJNoEUQvumsRqRCzJbxm65DZqRv00cui17l8N');
const conn=mongoose.connect("mongodb+srv://abhishekshelar1262003:1557Abhi@abhishek.i4cx7te.mongodb.net/?retryWrites=true&w=majority&appName=Abhishek")

// app.get('/',(req,res)=>{
//     res.send('Hello world!');
// });

app.post('/create-checkout-session',async (req,res)=>{
    const body=req.body;
    let products=[];
    Object.keys(body).map(key=>{
        body[key].map(item=>{
            products.push(item);
        })
    })
    const lineItems=products.map((product)=>({
        price_data:{
            currency:"INR",
            product_data:{
                name:product.name,
                images:[product.images[0].url]
            },
            unit_amount:parseInt(product.price,10)*100,
        },
        quantity:parseInt(product.quantity,10)
    }));
    

    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:lineItems,
        mode:'payment',
        success_url:"http://localhost:3000/orderPlaced",
        cancel_url:"http://localhost:3000/cart"
    })
    
    res.json({id:session});
});

app.post('/addRecord',async (req,res)=>{
    const body=req.body;
    console.log(body)
    body.map(async item=>{
        const uniqueId = uuidv4();
        const existingOrder = await order.findOne({ orderItem: item.name });
        if(!existingOrder)
        {
            console.log("1");
            await order.create({
                id:uniqueId,
                restaurant:item.restaurant,
                orderItem:item.name,
                itemsCount:item.quantity,
                amount:item.price * item.quantity,
                status:0,
                orderDate:item.date
            });
        }   
        
    })
    const data=await order.find({});
    res.json(data);
});

app.get('/fetchData',async (req,res)=>{
    const data=await order.find({});
    console.log(data);
    res.json(data);
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(4000);