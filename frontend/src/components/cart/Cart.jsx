import React,{useEffect,useState} from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import {loadStripe} from '@stripe/stripe-js';
let fakeCartItems = [
  {
    foodItem: {
      images: [
        {
          public_id: "kaala_channa_chat image",
          url: "https://b.zmtcdn.com/data/dish_photos/94a/c01f4e8fcce05666b8a28eadd627394a.jpg?fit=around|130:130&crop=130:130;*,*",
          _id: "1",
        },
      ],
      name: "Kaala Channa Chat",
      price: 120,
      _id: "123",
    },
    quantity: 1,
    _id: "cart123",
  },
  {
    foodItem: {
      images: [
        {
          public_id: "Pani puri image",
          url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/FOOD_CATALOG/IMAGES/CMS/2024/3/11/b3734c76-eba3-4509-86ed-aa774e6336e4_e7abf189-300f-4cc7-bc9b-fc42a24c8178.png_compressed",
          _id: "2",
        },
      ],
      name: "Pani puri",
      price: 50,
      _id: "456",
    },
    quantity: 1,
    _id: "cart456",
  },
];

const Cart = ({oncartReduce}) => {
  const [data,setData]=useState({});
  const [countCart,setCountCart]=useState(0);
  const [quantity,setQuantity]=useState({});
  const [reRender,setreRender]=useState(0);
  const removeCartItem=async (id,restName)=>{
    oncartReduce();
    setCountCart(countCart-1)
    let foodItems=await JSON.parse(localStorage.getItem('foodItems'));
    
    let filterfoodItems=[]
    filterfoodItems=await foodItems[restName].filter(item => item._id.$oid !== id);
    if(filterfoodItems.length==0)
    {
      delete foodItems[restName];
    }
    else{
      foodItems[restName]=filterfoodItems;
    }
    
    setData(foodItems);
    localStorage.setItem('foodItems',JSON.stringify(foodItems));
  }

  const addQuantity=async (id,restaurant)=>{
    const storedData = JSON.parse(localStorage.getItem('foodItems'))
    storedData[restaurant].filter(item =>{
      if(item._id.$oid===id)
      {
        item.quantity=parseInt(item.quantity,10)+1;
      }
    })
    localStorage.setItem('foodItems',JSON.stringify(storedData));
    setreRender(!reRender);
  }
  const reduceQuantity=(id,restaurant)=>{
    setreRender(!reRender);
    const storedData = JSON.parse(localStorage.getItem('foodItems'))
    storedData[restaurant].filter(item =>{
      if(item._id.$oid===id)
      {
        if(parseInt(item.quantity,10)!=0)
        {
          item.quantity=parseInt(item.quantity,10)-1;
        }
        else{
          window.alert("Already 0");
        }
      }
    })
    localStorage.setItem('foodItems',JSON.stringify(storedData));
  }

  const makePayments=async (item)=>{
    console.log(item);
    localStorage.setItem('orderDetails',JSON.stringify({}));
    let foods=JSON.parse(localStorage.getItem('orderDetails')) || {};
    let order=[];
    localStorage.setItem('order',JSON.stringify({}));
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    Object.keys(item).map(key=>{
      if(!foods[key])
      {
        foods[key]=[];
      }
      item[key].map(food=>{
        food['date']=formattedDate;
        food['restaurant']=key;
        foods[key].push(food);
        order.push(food);
      })
      
    })
    localStorage.setItem('order',JSON.stringify(order));
    localStorage.setItem('orderDetails',JSON.stringify(foods));
    console.log(JSON.parse(localStorage.getItem('orderDetails')));
    const stripe=await loadStripe('pk_test_51PttijP8cLBj066MyYkePmLJohVgloTPxDFNjEgJIf6WaDXBZ1ahuu7zId4SfcQg0aRyEZMCRvvuzeUHBMHnSsio00QWD83wJ7')
    const body={
      products:item
    }

    const headers={
      'Content-Type':'application/json'
    }

    const response=await fetch('http://localhost:4000/create-checkout-session',{
      method:"POST",
      headers:headers,
      body:JSON.stringify(item)
    })

    const session=await response.json();
    const result=stripe.redirectToCheckout({
      sessionId:session.id.id
    })
    if(result.error)
    {
      console.log(result.error);

    }
  }

//  useEffect(()=>{
//     setData(JSON.parse(localStorage.getItem('foodItems')));
//  },[quantity]);

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('foodItems')) || {};
    setData(storedData);
    let tempQuantity={};
    Object.keys(storedData).map((key)=>{
      storedData[key].map((item,index)=>{
        tempQuantity[item._id.$oid]=parseInt(item.quantity,10);
      })
    });
    // console.log(tempQuantity);
    setQuantity(tempQuantity);
    const storedCartCount = parseInt(localStorage.getItem('cartItems'), 10) || 0;
    setCountCart(storedCartCount);
  },[reRender]);

  return (
    <>
      {Object.keys(data).length !=0 ?
        (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{countCart} items</b>
          </h2>
          {Object.keys(data).map(key=>(
            <>
              <h3 className="mt-5">
                Restaurant: <b>{key}</b>
              </h3>
               {
                data[key].map((subItem,index)=>(
                  <div className="row d-flex justify-content-between align-items-center cartt border-bottom border-dark">
                    <div className="col-12 col-lg-8">
                        <div className="cart-item d-flex align-content-center" key={index}>
                          <div className="row">
                            <div className="col-4 col-lg-3">
                              {
                                <img
                                  src={subItem.images[0].url}
                                  alt="items"
                                  height="90"
                                  width="115"
                                />
                              }
                            </div>
                            <div className="col-5 col-lg-3">{subItem.name}</div>
                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                              <p id="card_item_price">
                                <LiaRupeeSignSolid />
                                {subItem.price}
                              </p>
                            </div>
                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                              <div className="stockCounter d-inline">
                                <span onClick={()=>(reduceQuantity(subItem._id.$oid,key))} className="btn btn-danger minus">-</span>
                                <input
                                  type="number"
                                  className="form-control count d-inline"
                                  value={quantity[subItem._id.$oid]}
                                />
                                <span onClick={()=>(addQuantity(subItem._id.$oid,key))} className="btn btn-primary plus">+</span>
                              </div>
                            </div>
                            <div onClick={()=>removeCartItem(subItem._id.$oid,key)} className="col-4 col-lg-1 mt-4 mt-lg-0">
                              <i
                                id="delete_cart_item"
                                className="fa fa-trash btn btn-danger"
                              ></i>
                            </div>
                          </div>
                   
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>
                          Subtotal:
                          <span className="order-summary-values">
                            {quantity[subItem._id.$oid]}
                            (Units)
                          </span>
                        </p>
                        <p>
                          Total:
                          <span className="order-summary-values">
                            <LiaRupeeSignSolid />
                            {
                                subItem.price* quantity[subItem._id.$oid]

                            }
                          </span>
                        </p>
                        <hr />
                      </div>
                    </div>
                    
             </div>
             
                ))
               }
             </>
          ))}
          {
            data.length ==0 ? (<div>Your cart is empty</div>)
            :
            (
            <div className="text-center">
              <button onClick={()=>(makePayments(data))} id="checkout_btn" className="btn text-white w-25">
                Check Out
              </button>
            </div>)
          }
          
          
        </>
      ):
      <h2 className="mt-5">Your Cart is empty</h2>
    }
    </>
  );
};

export default Cart;
