import React,{useEffect, useState} from "react";
import Loader from "../layouts/Loader";
import {Link} from 'react-router-dom'

const Login = ({userLogged,isLogin}) => {
  const [userLogin,setisLogin]=useState(false)
  const loginUser=async ()=>{
    const email=document.getElementById('email_field').value;
    const password=document.getElementById('password_field').value;
    const userData=await JSON.parse(localStorage.getItem('userData'));
    const userFound=await userData.filter(user => user.email === email);
   
    if(userFound.length==0)
    { 
      window.alert('Incorrect email or password');
    }
    else{
      if(userFound[0].password===password)
      {
        localStorage.setItem('isLogin','true');
        setisLogin('true');
        userLogged();
      }
      else{
        window.alert('Incorrect email or password');
      }
    }
  }

  useEffect(()=>{
    setisLogin(isLogin);
  },[isLogin]);
  return (
    <>
      {5 > 10 ? (
        <Loader />
      ) : (
        <>
        {
          userLogin==='true' ? (
            <>
            <div className="w-100 d-flex justify-content-center align-items-center" style={{ height:"300px"}}>
            <div className="row justify-content-center w-100">
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

                  <h2 className="">Login Successfully.</h2>

                  <Link to={`/menu/${localStorage.getItem('restId')}`}>Go to Menu</Link>
                </div>
              </div>
               
            </div>
               
            </>
          ):
          (
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg">
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    // value={"abc.email.com"}
                  ></input>
                </div>
                <div className="form-group ">
                  <label htmlFor="password_field">
                    Password <span>( not less than 8 character)</span>
                  </label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    // value={"12345678"}
                  ></input>
                </div>
                <a className="float-right mb-4">Forgot Password</a>
                <Link
                to="/"
                  id="login_button"
                  className="btn btn-block py3"
                  onClick={(loginUser)}
                >
                  LOGIN
                </Link>
                <Link to='/register' className="float-right mt-3">NEW USER?</Link>
              </form>
            </div>
          </div>
          )
          
        }
         
        </>
      )}
    </>
  );
};

export default Login;
