import React,{useState} from "react";
import {Link} from 'react-router-dom';

const Register = () => {
  const [username,setuserName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setconfirmPassword]=useState('');
  const [number,setNumber]=useState('');
  const addUser=async ()=>{
      const name=document.getElementById('name_field').value;
      const useremail=document.getElementById('email_field').value;
      const userpassword=document.getElementById('password_field').value;
      const userconfirmPassword=document.getElementById('passwordConfirm_field').value;
      const usernumber=document.getElementById('phoneNumber_field').value;
      let userData={
        name:username,
        email:useremail,
        password:userpassword,
        number:usernumber
      }
      const data=await JSON.parse(localStorage.getItem('userData')) || [];
      const foundData=await data.filter(user => user.email === useremail);
      if(foundData.length==0)
      {
        data.push(userData);
        console.log(data);
        localStorage.setItem('userData',JSON.stringify(data));
      }
      else{
        window.alert('User already exist');
      }
  }

  const handleName=(event)=>{
    setuserName(event.target.value);
  }
  const handleEmail=(event)=>{
    setEmail(event.target.value);
  }
  const handlePassword=(event)=>{
    setPassword(event.target.value);
  }
  const handleconfirmPassword=(event)=>{
    setconfirmPassword(event.target.value);
  }
  const handleNumber=(event)=>{
    setNumber(event.target.value);
  }

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 registration-form">
          <form className="shadow-lg" encType="multipart/form-data">
            <h1 className="mb-3">Register</h1>
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                onChange={(handleName)}
                value={username}
                
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                onChange={(handleEmail)}
                value={email}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                onChange={(handlePassword)}
                value={password}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm_field">Password Confirm</label>
              <input
                type="password"
                id="passwordConfirm_field"
                className="form-control"
                name="passwordConfirm"
                onChange={(handleconfirmPassword)}
                value={confirmPassword}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber_field">Phone Number</label>
              <input
                type="number"
                id="phoneNumber_field"
                className="form-control"
                name="phoneNumber"
                onChange={(handleNumber)}
                value={number}
              ></input>
            </div>

            <Link to='/login'
              onClick={addUser}
              id="register_button"
              className="btn btn-block py-3"
              // disabled={5 > 10 ? true : false}
            >
              REGISTER
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
