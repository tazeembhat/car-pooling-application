
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes ,Link } from 'react-router-dom';
//import { Button } from 'antd';
import Search from './Search/search.js';
import Driver from './Driver/Driver.js';
import DriverRide from './Driver/DriverCreateRide.js';
import CreateProfile from './User/UserProfileCreation.js';
import './App.css';
import RiderComp from './Search/search.js';
import DriverComp from './Driver/DriverCreateRide.js';
import ExampleComponent from './example.js';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Login from './Login/LoginComp.js';
import Navbar from './Navbar/Navbar';
function App() {
  return (

       
   <Navbar/>
       

  );
  
}

export default App;
