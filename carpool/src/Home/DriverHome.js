import React, { useState,useEffect , useRef } from 'react';
//import { Button , Input } from 'antd';
import { useJsApiLoader ,GoogleMap, LoadScript, DirectionsService, DirectionsRenderer,Autocomplete } from '@react-google-maps/api';


import { FaStar } from "react-icons/fa";



import '../Home/DriverHome.css';
import { Link } from 'react-router-dom';

const libraries = ['places'];
const DriverRide = () => {
 const storedData = localStorage.getItem('driver');
  const driverData = JSON.parse(storedData);
  const driverId = driverData.userName;
  const [profileData,setProfileData] = useState([]);
  const [rating,setsetRating] = useState(0);
  const [error,setError] = useState('');
  const [rate, setRate] = useState(0);
    

   useEffect( () => {
    showProfileInformation();
  }, []); 
 
  const showProfileInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/drivers/${driverId}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        console.log(profileData);
        const ratings = data.ratings; // Use the updated data from response.json()
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, rating) => acc + rating, 0);
          const average = sum / ratings.length;
          console.log('Average rating:', average);
          setsetRating(average);
        } else {
          setsetRating(0);
        }
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };
  
  return (
    <div >
      

  <div className='navMenu' >
      <a href='/driverHome'>Driver Home</a> &nbsp; &nbsp;
      <a href='/driverLogin'>Post a Ride</a> &nbsp; &nbsp;
      <a href='/pastRides'>Past Rides</a> &nbsp; &nbsp;
      <a href='/driverApproval'>Request Approval</a> &nbsp; &nbsp;
      <a href='/homePage'>Logout</a>
      <div className="dot"></div>
</div>
<div>
  <img className="driver-carpool" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif" alt="bgimg"/>
</div>
    {/*  <h1>
        Profile
     </h1>
      <div >
        <label>Raing</label>{rating}
      </div>
      <div >
        <label>Name</label>{profileData.DriverName}
      </div>
      <div >
        <label>Email</label>{profileData.DriverEmail}
      </div> */}

      <div className="card">
      <img src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="John" />
    
      <p className="title">Driver: &nbsp;
      
      {profileData.DriverName}
      <br></br>
      <p className='title'> Email:&nbsp; 

      {profileData.DriverEmail}
      </p>
      
      <p className='title'> Ratings : 
      {profileData.ratings}

      </p>
      
      </p>
     
    </div>
   

      <div className="underlay-photo"></div>
      <div className="underlay-black"></div>
    </div>



  );
};

export default DriverRide;