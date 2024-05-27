import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import emailjs from '@emailjs/browser';
import Confetti from 'react-confetti';


const Payment = ({ riderUserName, riderEmail , cost}) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const amt = localStorage.getItem("cost");
  const handleToken = async (token) => {
    const response = await fetch('http://localhost:9000/payment/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token.id,
        cost: amt, // in cents
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      setPaymentComplete(true);
     
    } else {
      setPaymentComplete(true);
      sendConfirmationEmail();
      //change later
      //setPaymentComplete(true);
      alert('Payment Failed!');  //Need to fix it
    }
  };

  const sendConfirmationEmail = () => {
    const templateID = 'template_tluo9a6';
    const serviceID = 'service_icqxqp9';
    const publicKey = 'nHMnh-PFXKfMcooMB';

    emailjs.send(serviceID, templateID, publicKey)
      .then((response) => {
        console.log('Email sent:', response.text);
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };

  return (
    <div>
      {!paymentComplete ? (
        <StripeCheckout
          stripeKey="pk_test_51PJF2FSEo16jwVOXkVJ7x8DZx7rGHumnvPPelfU6zkDYhaDXMy2W9f462NwhqyqdSq1tTN4Bg7u48oWbz841qwVO00hj5bVk2T"
          token={handleToken}
          amount={amt*100} // in cents
          currency='INR'
          name="CoRide"
          description="Ride payment"
        />
      ) : (

        <div className="success-message" onClick={sendConfirmationEmail}>
          <alert>Payment Successful!</alert>
        </div>
      )}
      {
         
      paymentComplete && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500} recycle={false} />}
    </div>
  );
};

export default Payment;
