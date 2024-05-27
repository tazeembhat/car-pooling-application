<h1 style="font-family:'Courier New'"> CoRide</h1>
<h2 style="font-family:'Courier New'"> Car Pooling Application</h2>
Car pooling, also known as car sharing, is a transportation strategy where multiple individuals share a vehicle to travel together to a common destination. The theory behind car pooling is to reduce the number of cars on the road, ease traffic congestion, and lower carbon emissions.
<br> </br>
The idea of car pooling is rooted in the concept of sharing resources. By sharing a car, the costs associated with owning and maintaining a vehicle are spread among several people, reducing the financial burden on individual drivers. 
<br> </br>
In a carpooling app, the 'Rider' and 'Driver' roles are the two primary roles that users can assume. The rider is the person who is <b>seeking</b> a ride, while the driver is the person who is <b>offering</b> a ride.
<br> </br>
<img src="/carpool/src/Images/carpool3.jpg" alt="img"  />
<h1> Roles </h1>
<ul>
  <li> Driver </li>
  <p> The driver's role is to offer rides to riders who are seeking transportation. Drivers must create a profile within the carpooling app, specifying their vehicle type, pickup location, and desired route. Drivers can view ride requests and accept or decline them based on their availability and preference. Once a ride request is accepted, drivers must communicate with the rider, pick them up at the specified location, and transport them to the requested destination. </p>
  <p> After the ride, drivers can rate the rider and receive payment for the ride, which is typically handled within the app.</p>
  
  
  <li> Rider </li>
  <p> The rider's role is to search for available rides within the app, select a driver, and request a ride. The rider must provide details such as pickup location, drop-off location, and the number of passengers. Once a driver accepts the ride request, the rider can proceed with the payment and rate the driver after the ride is completed.'Stripe Library' is used for completing the payment and updating the status in the data base. </p>
</ul>
<h1> User Requirements/Flow </h1>
<h2> Driver </h2>
<ul>
  <li> An user can sign up as a Driver </li>
  <li> An user can post rides as per his/her date and time and routes he/she wants to go </li>
  <li> The driver gets options to accept/reject riders </li>
</ul>
<h2> Rider </h2>
<ul>
  <li> A rider can search for rides </li>
  <li> A rider can post their Origin , Destination , Date&Time of Pickup </li>
  <li> Once approved , rider will get an option to Pay </li>
  <li> Payment Page will be provided for the rider to enter Payment Details </li>
</ul>

<h2> Ride Matching </h2>
<ul>
  <li> Google Maps Directions API: This API allows developers to programmatically retrieve directions between two or more locations. While it doesn't explicitly offer ride matching functionality, it could potentially be used as part of a larger ride matching system to calculate routes and travel times.</li>
  <li> Google Places API: This API provides information about places, such as their name, address, and type. It could potentially be used to find nearby pickup and dropoff points for rides, or to search for places of interest along a route.</li>
  <li> Google Distance Matrix API: This API provides travel distance and time estimates between multiple origins and destinations. It could potentially be used to calculate the distance and estimated travel time between riders and drivers, as part of a ride matching algorithm.</li>
  <li> Payment Page will be provided for the rider to enter Payment Details </li>
</ul>

<p> The carpool driver-rider flow typically involves the following steps: </p>

<p> Driver creates a carpool: The driver initiates the carpool by creating a ride request on a carpooling platform or by reaching out to their co-workers, friends, or neighbors who might be interested in sharing a ride. </p>

<p> Rider joins the carpool: Interested riders respond to the carpool request by accepting the ride or expressing their interest in joining the carpool. </p>

<p> Pre-trip communication: The driver and the riders communicate with each other to finalize the pick-up and drop-off locations, timing, and any other details relevant to the ride. </p>

<p> Pick-up: The driver picks up the riders at the agreed-upon location and time. In some cases, the driver might pick up riders from different locations. </p>

<p> Ride: The driver drives the riders to the destination, which could be a workplace, school, or any other location. </p>

 <p> Drop-off: The driver drops off the riders at their respective destinations. </p>

<p> Post-trip communication: The driver and the riders might communicate with each other after the ride to provide feedback </p>


<h1> Steps to run the project </h1>
<ol>
  <li> Server </li>
  <ul>
    <li> cd backend</li>
    <li> run npm install </li>
    <li> node server.js </li>
  </ul>
  <li> Client </li>
  <ul>
    <li> cd carpool.js </li>
    <li> run npm install </li>
    <li> npm start </li>
  </ul>
</ol>
