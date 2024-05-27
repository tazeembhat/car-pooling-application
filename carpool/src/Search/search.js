import React, { useState ,useRef ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap,DirectionsRenderer, useJsApiLoader , Autocomplete } from '@react-google-maps/api';
import PaymentComp from '../Payment/payment';
import GetClosestDriver from './GetClosestDriver';
import StripeCheckout from 'react-stripe-checkout';
import emailjs from 'emailjs-com';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../map/MapComponent';

const GOOGLE_MAP_API = "AIzaSyAYzgZ0C3PTyIDitR7BJ4Jvc-t6Y3G014s";

const containerStyle = {
  width: '550px',
  height: '500px',
  margin: '50px',
top:'-80px',
right: '100px'

};

//define a center point for Maps to load
const center = {
  lat: 37.7749,
  lng: -122.4194
};


const libraries = ['places'];
const RiderFinder = () => {
  const storedData = localStorage.getItem('rider');
  const parsedData = JSON.parse(storedData);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [directions, setDirections] = useState(null);
  const [seats, setSeat] = useState('');
  const  [diplayDrivers,setDisplayDrivers] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [avaiableDriver, setAvaiableDriver] = useState([]);
  const [riderLocation, setRiderLocation] = useState([]);
  const driverLocation = [40.7282, -74.0776];
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [showPayment, setshowPayment] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [costPerSeat, setCostPerSeat] = useState(0);

  

  useEffect(() => {
    async function fetchData() {
      const existingRecord = await fetch(`http://localhost:9000/riderRequest/${parsedData.userName}`);
      const existingRecordData = await existingRecord.json();
      if (!existingRecordData) {
        setShowButton(true);
        return;
      }
      else if (existingRecordData.length>0) {
        const recordRequested = existingRecordData.filter(record => record.CommuteStatus == 'Requested');
        const recordPayment = existingRecordData.filter(record => record.CommuteStatus == 'Approved' && record.PaymentFlag == 'N');
        //console.log(recordPayment)
        if (recordRequested.length>0) {
          <div className="alert">
          <span className="closebtn">&times;</span>  
          <strong>Hello, You have already requested</strong>
        </div> 
          return;
          }
        else if (recordPayment.length>0) {
          setshowPayment(true)
          return;
        }
      }
      else if (existingRecordData.CommuteStatus == 'Requested' ) {
        alert('You have already requested');
        <div className="alert">
        <span className="closebtn">&times;</span>  
        <strong>Hello, You have already requested</strong>
      </div> 
        return;
      }     
       else if (existingRecordData.CommuteStatus == 'Approved' && existingRecordData.PaymentFlag === 'N') {
        setshowPayment(true);
        return;
      }

      if (existingRecordData.CommuteStatus == 'Approved' && existingRecordData.PaymentFlag === 'Y'){
        setShowButton(true);
        return;
      }
    }
    
    fetchData();
  }, []);
  
  /** @type React.MutableRefObject<HTMLInputElement>*/
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement>*/
  const destinationRef = useRef();
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API 
    , libraries: libraries
  }
  )

  
  if(!isLoaded) {
    return (
      <div className="loading-spinner">
        <i className="fa fa-spinner fa-spin"></i>
        <span>Loading...</span>
      </div>
    );
  }



/*   const onOriginChange = (event) => {
    setOrigin(origin,[event.target.name] = event.target.value);
  }

  const onDestinationChange = (event) => {
    //setDestination(event.target.value);
  } */

  const onPickUpTimeChange = (event) => {
    setPickUpTime(event.target.value);
  }

  const onSeatChange = (event) => {
    setSeat(event.target.value);
  }

  const directionsCallback = (result) => {
    if (result != null) {
      setDirections(result);

    }
  }

const calculateCost = (cost) => {
  setCostPerSeat(cost);
}

  const handleGeocodeLocation = async (location) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_MAP_API}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        const locationObject = ({latProp:lat,lngProp:lng});
        //console.log(locationObject.latProp)
        return locationObject;
        
      } else {
        setErrorMessage("Error while requesting geocoding API");
      }
    } catch (error) {
      setErrorMessage("Error while requesting geocoding API");
    }
  };
  
  const sendConfirmationEmail = () => {
    const templateID = 'template_a34i9to';
    const serviceID = 'service_ei1jycj';
    const userID = 'O25MTvtRdtBmJjw3S77ib';

    emailjs.send(serviceID, templateID, userID)
      .then((response) => {
        console.log('Email sent:', response.text);
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };

  const   searchForRide = async(event) => {
    event.preventDefault();
      const origincord =   await handleGeocodeLocation(originRef.current.value);
      
     const destinationcord = await handleGeocodeLocation(destinationRef.current.value);
    if (originRef.current.value && destinationRef.current.value && pickUpTime && seats) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originRef.current.value,
          destination: destinationRef.current.value,
          travelMode: 'DRIVING'
        },
        directionsCallback
      );
             setOrigin(origincord);
             setDestination(destinationcord);
             setDisplayDrivers(true);
    }
    
  }
  //console.log(showPayment == true)
  return (


      <div className='main-page'> 
     <div className='navMenu' >
      <a href='/riderHome'>Rider Home</a> &nbsp; &nbsp;
      <a href='/riderLogin'>Find a Ride</a> &nbsp; &nbsp;
      <a href='/riderpastRides'>Past Rides</a> &nbsp; &nbsp;
      <a href='/homePage'>Logout</a>
      <div className="dot"></div>
</div>
{/* <div className="alert">
        <span className="closebtn">&times;</span>  
        <strong>Hey, {driverId} </strong> You have a Ride Request !
      </div> */}
        <div>
  <img className="search-carpool" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif"/>
</div>
      <form className="search-login-form">
        <p className="search-login-text">
          <span className="fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-lock fa-stack-1x"></i>
          </span>
        </p>
        <Autocomplete>
        <input id="origin" type="text" name= 'Origin'   ref={originRef}  className="login-username" autoFocus={true} required={true} placeholder="From?" />
        </Autocomplete>

        <Autocomplete>
        <input  id="destination" type="text" name = 'Destination'   ref={destinationRef} className="login-username" autoFocus={true} required={true} placeholder="Where to?" />
        </Autocomplete>

        <input className="login-username" required={true} id="pickUpTime" type="datetime-local" value={pickUpTime} onChange={onPickUpTimeChange} placeholder="Time Please! " />
        
        <input id="seats" type="number" value={seats} onChange={onSeatChange} className="login-username" />
  
        {(showButton == true ) ? (<button type="submit"  className="search-login-submit" onClick={searchForRide}>GET ME A RIDE!</button>): <div className = 'message-request'>
        
        <div className="alert">
        <span className="closebtn">&times;</span>  
        <strong>Oops! Looks like you have already requested a ride. Kindly wait..</strong>
        </div> 
        </div> }
        
       
      </form>
     
      <div className="underlay-photo"></div>
      <div className="underlay-black"></div> 
      
      <div style={containerStyle}>

      </div>
   <div className='googleMap'>
      <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
          </div>
          <div>
            {(diplayDrivers === true) ? (<div>
              <GetClosestDriver
              startLat={origin.latProp}
              startLon={origin.lngProp}
              endLat={destination.latProp}
              endLon={destination.lngProp}
              seats = {seats}
              origin = {originRef.current.value}
              destination = {destinationRef.current.value}
              riderID = {parsedData.userName}
              
            />
            </div>) : null
          
          }
{/* <div>
  <GetClosestDriver/>
</div>
 */}
          {(showPayment == true) ? (
                      <div className="payment">
                      <PaymentComp  
                      cost = {calculateCost}
                    //  riderEmail = {userEmail}
                       riderEmail="tazeembhat@outlook.com"
                      //  riderUserName = {userName}
                       riderUserName="tazeem" 
                       />
                      </div>
           /*  <div className="payment">
           { <a  href="/payment" onClick={showPopup}>
        Confirm the seat! Let's complete the Payment....
        </a> }
        </div>  */

        ) : (
      <p></p>
        )}
      </div>
      </div>



);
};




  

export default RiderFinder;
