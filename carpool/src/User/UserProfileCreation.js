import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes ,Link } from 'react-router-dom';
import './ProfileCreation.css';


const ProfileCreation = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const [driverName, setdriverName] = useState("");
  const [email, setEmail] = useState("");
  const [commuterType, setcommuterType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlerePasswordChange = (event) => {
    setrePassword(event.target.value);
  };

  const handledriverNameChange = (event) => {
    setdriverName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlecommuterTypeChange = (event) => {
    setcommuterType(event.target.value);
  };

 const handleLogin = () =>{
    navigate('/login');
 }

  const handleSubmit = async (event) => {
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
    alert('Sign up successfull!');
    navigate('/login');
    event.preventDefault();
    let postDriver = false;
    let postRider = false; 
    const existingRecord = await fetch(`http://localhost:9000/userAuths/${username}`);
    const existingRecordData = await existingRecord.json();
    // Filter the results based on the username field
    
   // const recordExists = existingRecordData.some(record => record.userName === username || record.userPassword === password );

    if (existingRecordData) {
    setError('Record with same username already exists! Lets login');
    setShowLoginButton(true);
    return;
   
    }
    else {  
      try {
        const response = await fetch("http://localhost:9000/userAuths/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName:username,
            userPassword:password,
            userEmail:email,
            commuterType:commuterType,
          }),
        });
        if (response.ok) {
        // alert("Profile Created!")
         if(commuterType === 'Rider'){
          postRider = true;
         }
         else {
          postDriver = true;
         }
        } else {
          setError("There was an error creating your profile.");
        }
        console.log(postRider);
      } catch (error) {
        console.error(error);
        setError("There was an error creating your profile.");
      }
      if (postDriver === true) {
        try {
          const responsedriver = await fetch("http://localhost:9000/drivers/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              DriverName:name,
              DriverEmail:email,
              DriverUserName:username,
              ratings: 0
            }),
          });
          if (responsedriver.ok) {
          //
          // alert(" driver Profile Created!")
           postDriver = false;
          } else {
            setError("There was an error creating your driver profile.");
          }
        } catch (error) {
          console.error(error);
          setError("There was an error creating your driver profile.");
        }
      }
      else if (postRider=== true)
      {
        try {
          const responsedriver = await fetch("http://localhost:9000/riders/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              RiderName:name,
              RiderEmail:email,
              RiderUserName:username,
              ratings: 0
              
            }),
          });
          if (responsedriver.ok) {
          // alert(" Rider Profile Created!")
           postRider = false;
          } else {
            setError("There was an error creating your rider profile.");
          }
        } catch (error) {
          console.error(error);
          setError("There was an error creating your rider profile.");
        } 
      }
      
    }
  };

/*   if (redirectToLogin) {
    return <Redirect to="/login" />;
  } */

  return (
    
  <div className="flex items-center justify-between"> 
    <div>
      <img className="carpool-profile" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif"/>
    </div>
    <form className="signup-login-form">
      <p className="profile-login-text">
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-lock fa-stack-1x"></i>
        </span>
      </p>
      <input type="email" value={email} onChange={handleEmailChange}  className="login-username" autoFocus={true} required={true} placeholder="Email" />
      <input type="text" value={username} onChange={handleUsernameChange} className="login-username" autoFocus={true} required={true} placeholder="Username" />
      <input type="text" value={name} onChange={handleNameChange} className="login-username" autoFocus={true} required={true} placeholder="name" />
      <input className="login-password" required={true} type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <select id="commuterType" name="commuterType" className="profile-login-username" value={commuterType} onChange={handlecommuterTypeChange}>
        <option  value="">Select</option>
        <option  value="Rider">Rider</option>
        <option  value="Driver">Driver</option>
      </select>
      <div>
        <input type="submit" onClick={handleSubmit} name="Login" value="CREATE PROFILE" className="ml-10 px-4 py-2 mt-6 mb-14 hover:bg-slate-300 font-medium bg-slate-50 rounded-lg" />
      </div>
    </form>
    <a href="/login" className="login underline mt-6">Already have an Account, Login</a>
    <div className="profile-underlay-photo"></div>
    <div className="profile-underlay-black"></div> 
</div>
  );
};
   /* /* {/*    <img src="/carpool.jpg" alt="bgimg" className="bckimg"/> */
    {/* <form className="profile-creation" onSubmit={handleSubmit}>
      <h2>Profile Creation</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br></br>
      <label>
        Name:
        <input type="text" value={driverName} onChange={handledriverNameChange} />
      </label>
      <br></br>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br></br>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br></br>
      <label>
       Re-Password:
        <input type="password" value={repassword} onChange={handlerePasswordChange} />
      </label>
      <br></br>
      <label>
        Commuter Status:
        <select value={commuterType} onChange={handlecommuterTypeChange}>
          <option value="">Select</option>
          <option value="Rider">Rider</option>
          <option value="Driver">Driver</option>
        </select>
      </label>
      <br></br>
      <button type="submit">Create Profile</button>
      {showLoginButton && (
  
        <button type="submit">
        <Link to="/login">* LOG IN * </Link>
      </button>
      )}
    </form> 
    </div> 
  
 */}

export default ProfileCreation;
