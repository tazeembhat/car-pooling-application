import React, { useState,useEffect , useRef } from 'react';
import { Link } from 'react-router-dom';
import RideRequestItems from '../rideRequestItems/rideRequestItems.js';

const Driverapproval = () => {
  const storedData = localStorage.getItem('driver');
  const driverData = JSON.parse(storedData);
  const driverId = driverData.userName; 
  const [rideRequest,setRideRequest] = useState([]);
  const [driverOrders,setDriverOrders] = useState([]);
  const [rating,setsetRating] = useState(0);
  const [error,setError] = useState('');
  

   useEffect( () => {
    showProfileInformation();
    showDriverOrderInformation();
  }, []); 
 
  const showProfileInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderRequest/`);
      if (response.ok) {
        const data = await response.json();
       // console.log(data)
        const filteredDrivers = data.filter(item =>
            item.CommuteStatus === 'Requested' &&
            item.DriverId ===  driverId  // Change column5 to the desired column for filtering
          );
        setRideRequest(filteredDrivers);
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };

  const showDriverOrderInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderOrders/${driverId}`);
      if (response.ok) {
        const orderdata = await response.json();
       // console.log(data)
       if(Array.isArray(orderdata)) {
        const filteredDriverOrder = orderdata.filter(item =>
          item.DriverPostStatus === 'Open' &&
          item.DriverId ===  driverId  // Change column5 to the desired column for filtering
        );
        if (filteredDriverOrder.Availableseats == 0) {
          fetch(`http://localhost:9000/riderOrders/${driverId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DriverPostStatus: 'Closed'}) // set the new status based on the checkbox value
        })
       

        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update reminder status');
          }
          // update the checkbox state in the component's state
          //setCheckBox(checked);
        })
        .catch(error => {
          console.error(error);
          // handle the error
        });
          } else {
            setDriverOrders(filteredDriverOrder);
          }
        }
        else if (orderdata.DriverPostStatus === 'Open' && orderdata.DriverId ===  driverId)    {
          setDriverOrders(orderdata);
        }
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };

  const removeRequest = (riderId) => {
    setRideRequest(rideRequest.filter((rideRequests) => rideRequests.RiderId !== riderId));
  fetch(`http://localhost:9000/riderRequest/${riderId}`, {  //fetch api with the call back function
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

  const data = Array.isArray(rideRequest) && rideRequest.map(c =>(
    <RideRequestItems 
    key = {c._id}
    userName = {c.RiderId}
    removeRequest = {removeRequest} 
    setDriverOrders = {driverOrders}
    riderseats = {c.Riderseats}
    avaialableseats = {driverOrders.Availableseats}
    //passing the function remove Reminder to the reminde items
    />)
  );

  return (
    <div >
      <div>
  <img className="driverapp-carpool" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif" alt="bgimg"/>
</div>
<div className='navMenu' >
      <a href='/driverHome'>Driver Home</a> &nbsp; &nbsp;
      <a href='/driverLogin'>Post a Ride</a> &nbsp; &nbsp;
      <a href='/pastRides'>Past Rides</a> &nbsp; &nbsp;
      <a href='/driverApproval'>Request Approval</a> &nbsp; &nbsp;
      <a href='/homePage'>Logout</a>
      <div className="dot"></div>
</div>
<div className="alert">
        <span className="closebtn">&times;</span>  
        <strong>Hey, {driverId} </strong> You have a Ride Request !
      </div>
<div className="underlay-photo"></div>
      <div className="underlay-black"></div>
   
      <div >
        {data}
      </div>

    </div>
  );
};

export default Driverapproval;