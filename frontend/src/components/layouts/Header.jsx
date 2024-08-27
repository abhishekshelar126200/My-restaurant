import React from "react";
import Search from "./Search";
import {Link} from 'react-router-dom';

export default function Header({cartItems}){
    return (
        <nav className="d-flex row sticky-top">
            <div className="d-flex align-items-center w-25">
                <img src="/images/logo.webp" alt="logo" className="logo w-50 h-50"/>
            </div>
            <div className="d-flex pl-5 align-items-center" style={{ width:'45%' }}>
                <Search/>
            </div>

            <div className="d-flex justify-content-around align-items-center" style={{ width:'30%' }}>
                <div className="d-flex align-items-center">
                    <Link to='/cart' className="" id="cart">
                        Cart
                    </Link>
                    <span className="h-25 ml-2"id="cart_count">
                        {cartItems}
                    </span>
                </div>
            {
                10>5?(
                    <>
                    <div className="d-flex align-items-center">
                        <figure className="avatar avatar-nav">  
                            <img src="/images/images.png" alt="avatar"
                            className="rounded-circle"/>
                        </figure>
                        <select className="border-0 outline-0 bg-transparent text-white" style={{outline:"none",boxShadow:'none'}}>
                            <option className="text-dark" value="">WSA Developer</option>
                            <option className="text-dark" value="">Home</option>
                            <option className="text-dark" value="">Order</option>
                        </select>
                    </div>
                    </>
                ) : (

                    <div className="rounded bg-white w-25 p-1 text-black text-center">
                        Login
                    </div>
                ) }
            






                </div>
        </nav>
    
    );
}
