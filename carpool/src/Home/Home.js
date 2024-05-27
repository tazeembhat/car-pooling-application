import { BrowserRouter as Router, Route, Routes ,Link } from 'react-router-dom';
import './Home.css';
import img from '../Images/newhome.png';


const Home = () =>{
    return(
        <div className='main'>
             <div>
             <img className='home5' src={img} style={{display: 'flex-col', width: "100%"}}  alt="logo"/>
                <h2>
                    <Link to ='/login'>
                        <button className='car'>
                            Let's take a ride!
                        </button>
                    </Link>
                </h2>
            </div>
        </div>             
    );

  
};
export default Home;