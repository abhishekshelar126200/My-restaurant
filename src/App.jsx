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


export default function App() {
  const [cartItems,setcartItems]=useState(null);
  const oncartReduce=()=>{
    setcartItems(parseInt(localStorage.getItem('cartItems'),10)-1);
    localStorage.setItem('cartItems',parseInt(localStorage.getItem('cartItems'),10)-1);
  }
  const oncartChange=()=>{
    setcartItems(parseInt(localStorage.getItem('cartItems'),10)+1);
    localStorage.setItem('cartItems',parseInt(localStorage.getItem('cartItems'),10)+1);
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
        <Header cartItems={cartItems}/>
        <Routes>
          <Route path="/" element={<Restaurant/>}/>
          <Route path="/:restaurant" element={<Restaurant/>}/>
          <Route path="/menu/:restId" element={<Menu oncartChange={oncartChange}/>}/>
          <Route path="/cart" element={<Cart oncartReduce={oncartReduce}/>}/>
        </Routes>
      </Router>
    </div>
    <Footer/>
    
  </div>
  );
}
