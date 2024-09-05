import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
const OrderSuccess = () => {
  useEffect(()=>{
    localStorage.setItem('foodItems',JSON.stringify({}));
    localStorage.setItem('cartItems',0);
    const storeData=async ()=>{
      const headers={
        'Content-Type':'application/json'
      }
      console.log(localStorage.getItem('order'));
      const orderData=localStorage.getItem('order');
      const response=await fetch('https://my-restaurant-i131.onrender.com/addRecord',{
        method:"POST",
        headers:headers,
        body:orderData
      })
      const session=await response.json();
      // console.log(session);
      // const tempData=await JSON.parse(localStorage.getItem('orderDetails'));
      // session.map((item,index)=>{
      //   if(tempData[item.name])
      //   {
      //     tempData[item.name][index]['status']=item.status;
      //   }
      // })
      // localStorage.setItem('orderDetails',JSON.stringify(tempData));
    }
    storeData();
  },[])
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>

          <h2>Your Order has been placed successfully.</h2>

          <Link to='/orderDetails'>Go to Orders</Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
