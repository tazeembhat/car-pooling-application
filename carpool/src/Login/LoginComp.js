import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes ,Link } from 'react-router-dom';
import './Login.css';
import img from '../Images/carrrr.avif';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [commuterStatus, setCommuterStatus] = useState("");
  const [error, setError] = useState("");
  const [riderLoginButton, setRiderLoginButton] = useState(false);
  const [driverLoginButton, setDriverLoginButton] = useState(false);
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommuterStatusChange = (event) => {
    setCommuterStatus(event.target.value);
  };
  const handlRiderLogin = () =>{
    navigate('/riderLogin');
 }
 const handleDriverLogin = () =>{
  
  //validations

    navigate('/driverLogin');
 }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !username || !password) {
      alert('Please fill out all fields.');
      return;
    }

    // Check if the email address is valid
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Submit the form

    //console.log(username)
    const existingRecord = await fetch(`http://localhost:9000/userAuths/${username}`);
    const existingRecordData = await existingRecord.json();
    //const recordExists = existingRecordData.some(record => record.userName === username || record.userEmail === email );
    if (!username || !password) {
      alert("All fields are required.");
      return;
    }/* 
    if (commuterStatus !== "Rider" && commuterStatus !== "Driver") {
      alert("Invalid commuter status selected.");
      return;
    } */
  
   // existingRecordData.forEach(record =>{
    if (existingRecordData) {
      if (existingRecordData.userName == username && existingRecordData.userPassword == password) {
        if(existingRecordData.commuterType === 'Rider' ){
          setRiderLoginButton(true);
           localStorage.setItem('rider', JSON.stringify(existingRecordData));
           
           navigate('/riderLogin');
            return;
        }
        else if (existingRecordData.commuterType === 'Driver'){
          console.log('entered')
            setDriverLoginButton(true);
            localStorage.setItem('driver', JSON.stringify(existingRecordData));
            navigate('/driverLogin');
            return;
        }
        else{
          <div className="alert">
          <span className="closebtn">&times;</span>  
          <strong>OOps! Authentication Issues Suspected. </strong>
        </div>

        }
      
    }
    }
    else {
      <div className="alert">
      <span className="closebtn">&times;</span>  
      <strong>OOps! Authentication Issues Suspected. </strong>
    </div>

    }

    

   // })
       
  }

  return (

    <div> 
    <form className="loginpage-login-form">
      <p className="login-text">
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-lock fa-stack-1x"></i>
        </span>
      </p>
      <input type="email" value={email} onChange={handleEmailChange}  className="login-username" autoFocus={true} required={true} placeholder="Email" />
      <input type="text" value={username} onChange={handleUsernameChange} className="login-username" autoFocus={true} required={true} placeholder="Username" />
      <input className="login-password" required={true} type="text" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <button type="button"  onClick={handleSubmit} name="Login" value="LOG IN" className="login-login-submit" > LOG IN </button>

      <p className="login-sign-up">Don't have an account?
       <a  href="/createProfile" className="underline"> Sign up now</a></p>
    </form>
<div>
  <img className="login-carpool" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif"/>
</div>
    {/* <a href="#" className="loginn-forgot-pass">forgot password?</a> */}

    <div className="login-underlay-photo"></div>
    <div className="login-underlay-black"></div> 

    </div>
      );
    };


export default Login;
