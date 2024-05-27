
import { BrowserRouter as Router, Route, Routes ,Link } from 'react-router-dom';
//import { Button } from 'antd';
import Search from '../Search/search.js';
import Driver from '../Driver/Driver.js';
import DriverRide from '../Driver/DriverCreateRide.js';
import CreateProfile from '../User/UserProfileCreation.js';
import RiderComp from '../Search/search.js';
import DriverComp from '../Driver/DriverCreateRide.js';
import ExampleComponent from '../example.js';
import HomePage from '../HomePage.js';
import AboutPage from '../AboutPage.js';
import Login from '../Login/LoginComp.js';
import Home from '../Home/Home.js';
import DriverHome from '../Home/DriverHome.js';
import RiderHome from '../Home/RiderHome.js';
import Payment from '../Payment/payment';
import DriverApproval from '../DriverApproval/driverApproval.js';
import DriverPastRides from '../DriverPastRides/driverPastRides.js';
import RiderPastRides from '../RiderPastRides/riderPastRides.js';

const Navbar = () => {


  return (

     
    <Router>
 
{/*      <Link to='/DriverRide'>Post the Ride for the Commuters</Link>
   <Link to='/about'>about</Link> */}
   
{/*    <Link to='/Search'>Search Ride</Link> */}
   {/* <Link to='/Create'>PROFILE CREATION</Link> */}


 
   <Routes>
     <Route path="/DriverRide" element={<DriverRide />}/>
    {/* <Route  path="/*" element={<HomePage/>} /> */}
     <Route path="/about" element={<AboutPage/>} />
     <Route path="/search" element={<Search/>} />
     <Route path="/payment" element={<Payment/>} />
     {/* <Route path="/search" element={<Search/>} /> */}
     <Route path="/*" element={<Home/>}/>
     <Route path="/homePage" element={<Home/>}/>
     <Route path="/createProfile" element={<CreateProfile/>} /> 
     <Route path="/login" element={<Login/>}/>
     <Route path="/riderLogin" element={<Search />}/>
     <Route path="/driverLogin" element={<DriverComp/>}/>
     <Route path="/driverHome" element={<DriverHome/>}/>
     <Route path="/riderHome" element={<RiderHome/>}/>
     <Route path="/driverApproval" element={<DriverApproval/>}/>
     <Route path="/pastRides" element={<DriverPastRides/>}/>
     <Route path="/riderpastRides" element={<RiderPastRides/>}/>
   </Routes>

    </Router>  
  );
};

export default Navbar;