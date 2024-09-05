import React, { Fragment, useEffect,useState } from "react";
import Loader from "../layouts/Loader";
import { LiaRupeeSignSolid } from "react-icons/lia";

const OrderDetails = () => {

  // const data = [
  //   {
  //     id: 1,
  //     restaurant: 'Pizza Palace',
  //     orderItems: 'Pepperoni Pizza, Garlic Bread',
  //     numOfItems: 2,
  //     amount: '$25.99',
  //     status: 'Delivered',
  //     orderDate: '2024-08-31',
  //   },
  //   {
  //     id: 2,
  //     restaurant: 'Burger Bonanza',
  //     orderItems: 'Cheeseburger, Fries, Soda',
  //     numOfItems: 3,
  //     amount: '$15.49',
  //     status: 'In Progress',
  //     orderDate: '2024-09-01',
  //   },
  //   {
  //     id: 3,
  //     restaurant: 'Sushi Central',
  //     orderItems: 'California Roll, Miso Soup',
  //     numOfItems: 2,
  //     amount: '$18.75',
  //     status: 'Pending',
  //     orderDate: '2024-09-01',
  //   },
  // ];
  const [data,setData]=useState(null);
  useEffect(()=>{
    const fetchData=async ()=>{
      const response=await fetch('http://localhost:4000/fetchData');  
      const session=await response.json();
      console.log(session);
      setData(session);
    }
    fetchData();
    console.log(data);
  },[])
  return (
    <>
      {data ==null ? (
        <Loader />
      ) : (
        <>
          <div className="container mt-4">
      <h3 className="mb-4">Order History</h3>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Restaurant</th>
            <th>Order Items</th>
            <th>Nums of Items</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id}>
              <td>{order.restaurant}</td>
              <td>{order.orderItem}</td>
              <td>{order.itemsCount}</td>
              <td>{order.amount}</td>
              {
                order.status ? (
                  <td>Ordered</td>
                )
                :
                (
                  <td>Processing</td>
                )
               
              }
              
              <td>{order.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
