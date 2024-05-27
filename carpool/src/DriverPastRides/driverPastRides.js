import React, { useState,useEffect , useRef } from 'react';
import { Link } from 'react-router-dom';
import DriverPastOrders from './driverOrderitems.js';
import './driverOrderItems.css';
import './driverPastRides.css';

const DriverPastRides = () => {
  const storedData = localStorage.getItem('driver');
  const driverData = JSON.parse(storedData);
  const driverId = driverData.userName; 
  const [driverOrders,setDriverOrders] = useState([]);
  const [rating,setsetRating] = useState(0);
  const [error,setError] = useState('');
  

   useEffect( () => {
    //showRideInformation();
    showCommuterInformation();
  }, []); 
 
/*   const showRideInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderRequest/`);
      if (response.ok) {
        const data = await response.json();
       // console.log(data)
        const filteredDrivers = data.filter(item =>
            item.CommuteStatus === 'Approved' &&
            item.DriverId ===  driverId // Change column5 to the desired column for filtering
          );
        setRideRequest(filteredDrivers);
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  }; */
  const showCommuterInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderOrders/`);
      if (response.ok) {
     const orderdata = await response.json();
      // console.log(orderdata)
        const filteredDriverOrder = orderdata.filter(item =>
            item.DriverPostStatus !== 'Cancelled' &&
            item.DriverId ==  driverId  // Change column5 to the desired column for filtering
          ); 
          setDriverOrders(filteredDriverOrder);         
      } else {
        setError('Failed to data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };

  const removeRequest = (driverID) => {
    setDriverOrders(driverOrders.filter((rideRequests) => rideRequests.DriverId !== driverID));
    fetch(`http://localhost:9000/riderRequest/${driverID}`, {  //fetch api with the call back function
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete reminder status');
      }
      else {
        
        console.log('Successfully deleted');
      }
    })
    .catch(error => {
      console.error(error);
      // handle the error
    });
  }

/*   const rideRequestData = Array.isArray(rideRequest) && rideRequest.map(c =>(
    <RideRequestItems 
    key = {c._id}
    userName = {c.RiderId}
    removeRequest = {removeRequest} 
    setDriverOrders = {driverOrders}
    riderseats = {c.Riderseats}
    avaialableseats = {driverOrders.Availableseats}
    //passing the function remove Reminder to the reminde items
    />)
  ); */

  const DriverOrderData = Array.isArray(driverOrders) && driverOrders.map(c =>(
    <DriverPastOrders 
    key = {c._id}
    driverid = {c.DriverId}
    //riderId = {c.RiderId}
    removeRequest = {removeRequest} 
    origin = {c.StartingLocation}
    destination = {c.Destination}
    orders = {c.DriverOrderNumber}
    status = {c.DriverPostStatus}
    //passing the function remove Reminder to the reminde items
    />)
  );
  return (
    <div >
      <div>
  <img className="carpool1" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif" alt="bgimg"/>
</div>
<div className='navMenu' >
      <a href='/driverHome'>Driver Home</a> &nbsp; &nbsp;
      <a href='/driverLogin'>Post a Ride</a> &nbsp; &nbsp;
      <a href='/pastRides'>Past Rides</a> &nbsp; &nbsp;
      <a href='/driverApproval'>Request Approval</a> &nbsp; &nbsp;
      <a href='/homePage'>Logout</a>
      
</div>
<div className='grid-conatiner-view-drivers'>
        {DriverOrderData}
      </div>
<div className="underlay-photo"></div>
      <div className="underlay-black"></div>

    </div>
  );
};

export default DriverPastRides;