import React,{useState,useEffect} from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import Footer from "./components/layouts/Footer";
import Menu from "./components/layouts/Menu";
import Restaurant from "./components/layouts/Restaurant";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodItem from "./components/layouts/FoodItem";
import Cart from './components/cart/Cart'
import Login from './components/users/Login'
import Register from './components/users/Register'
import OrderSuccess from "./components/cart/OrderSuccess";
import OrderDetails from './components/order/OrderDetails'


export default function App() {
  const [cartItems,setcartItems]=useState(null);
  const [isLogin,setisLogin]=useState(localStorage.getItem('isLogin'));
  const userLogged=()=>{
    setisLogin(localStorage.getItem('isLogin'));
  }
  const oncartReduce=()=>{
    setcartItems(parseInt(localStorage.getItem('cartItems'),10)-1);
    localStorage.setItem('cartItems',parseInt(localStorage.getItem('cartItems'),10)-1);
  }
  const oncartChange=()=>{
    localStorage.setItem('cartItems','1');
    setcartItems(parseInt(localStorage.getItem('cartItems'),10)+1 || 1);
    localStorage.setItem('cartItems',parseInt(localStorage.getItem('cartItems'),10)+1 || '1');
  }
  useEffect(()=>{
    setcartItems(parseInt(localStorage.getItem('cartItems'),10) || 0);
  },[])
  return (
     <div className="App">
      {/* <Router>
        <Routes>
            <Route path='*' element={} />
        </Routes>
      </Router> */}
    <div className="container container-fluid">
      <Router>
        <Header cartItems={cartItems} isLogin={isLogin} userLogged={userLogged}/>
        <Routes>
          <Route path="/" element={<Restaurant/>}/>
          <Route path="/:restaurant" element={<Restaurant/>}/>
          <Route path="/menu/:restId" element={<Menu oncartChange={oncartChange} isLogin={isLogin}/>}/>
          <Route path="/cart" element={<Cart oncartReduce={oncartReduce}/>}/>
          <Route path='/login' element={<Login userLogged={userLogged} isLogin={isLogin}/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/orderPlaced' element={<OrderSuccess />}/>
          <Route path='/orderDetails' element={<OrderDetails />}/>

        </Routes>
      </Router>
    </div>
    <Footer/>
    
  </div>
  );
}
