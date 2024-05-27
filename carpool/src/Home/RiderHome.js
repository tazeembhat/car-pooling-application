import React, { useState,useEffect , useRef } from 'react';
import { Link } from 'react-router-dom';
import './RiderHome.css';

const libraries = ['places'];
const Rider = () => {
   const storedData = localStorage.getItem('rider');
  const driverData = JSON.parse(storedData);
  const driverId = driverData.userName;
  const [profileData,setProfileData] = useState([]);
  const [rating,setsetRating] = useState(0);
  const [error,setError] = useState('');
    

   useEffect( () => {
    showProfileInformation();
  }, []); 
 
  const showProfileInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riders/${driverId}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        console.log(data);
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
      <a href='/riderHome'>Rider Home</a> &nbsp; &nbsp;
      <a href='/riderLogin'>Find a Ride</a> &nbsp; &nbsp;
      <a href='/riderpastRides'>Past Rides</a> &nbsp; &nbsp;
      <a href='/homePage'>Logout</a>
      <div className="dot"></div>
</div>
<div>
  <img className="driver-carpool" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif" alt="bgimg"/>
</div>
<div className="card">
      <img src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="John" />
    
      <p className="title">Rider: &nbsp;
      
      {profileData.RiderName}
      <br></br>
      <p className='title'>  Email: &nbsp;
      {profileData.RiderEmail}
      </p>
      <br></br>
      <p className='title'> Ratings: &nbsp;
      {profileData.ratings}

      </p>
      </p>
     
    </div>

      <div className="underlay-photo"></div>
      <div className="underlay-black"></div>

     {/* <h1>
        Profile
     </h1>
      <div >
        <label>Raing</label>{rating}
      </div>
      <div >
        <label>Name</label>{profileData.RiderName}
      </div>
      <div >
        <label>Email</label>{profileData.RiderEmail}
      </div> */}
    </div>
  );
};

export default Rider;