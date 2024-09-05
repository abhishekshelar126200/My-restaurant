import React,{useState,useEffect} from "react";
import Search from "./Search";
import {Link,useNavigate} from 'react-router-dom';
import Login from '../users/Login'

export default function Header({cartItems,isLogin,userLogged}){
    const [userLogin,setLogin]=useState(isLogin);
    const navigate = useNavigate();
    const userLogout=async ()=>{
        localStorage.setItem('isLogin','false');
        setLogin('false')
        userLogged();
    }
    const handleUser=(event)=>{
        if(event.target.value==='Log Out')
        {
            navigate('/');
            userLogout();
        }
    }
    useEffect(()=>{
        setLogin(isLogin);
    },[isLogin])
    return (
        <nav className="d-flex row sticky-top">
            <div className="d-flex align-items-center w-25">
                <img src="/images/logo.webp" alt="logo" className="logo w-50 h-75"/>
            </div>
            <div className="d-flex pl-5 align-items-center" style={{ width:'45%' }}>
                <Search/>
            </div>

            <div className="d-flex justify-content-around align-items-center" style={{ width:'30%' }}>
                <div className="d-flex align-items-center">
                    {
                        userLogin==='true' ? (
                            <Link to='/cart' className="" id="cart">
                            Cart
                            </Link>
                        ):
                        (
                            <Link to='/login' className="" id="cart">
                                Cart
                            </Link>
                        )
                        
                    }
                    
                    <span className="h-25 ml-2"id="cart_count">
                        {cartItems}
                    </span>
                </div>
            {
                userLogin==='true' ? (
                    <>
                    <div className="d-flex align-items-center">
                        <figure className="avatar avatar-nav">  
                            <img src="/images/images.png" alt="avatar"
                            className="rounded-circle"/>
                        </figure>
                        <select className="border-0 outline-0 bg-transparent text-white" style={{outline:"none",boxShadow:'none'}} onChange={(handleUser)}>
                            <option className="text-dark" value="">WSA Developer</option>
                            <option className="text-dark" value="">Home</option>
                            <option className="text-dark" value="">Order</option>
                            <option className="text-dark" value="Log Out">Log Out</option>
                        </select>
                        {/* <div onClick={(userLogout)} className="cursor-pointer">
                            Log out
                        </div> */}
                    </div>
                    </>
                ) : (

                    <Link to='/login' className="rounded bg-white w-25 p-1 text-black text-center">
                        Login
                    </Link>
                ) }
            






                </div>
        </nav>
    
    );
}
