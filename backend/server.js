//Importing reminders.js
import app from './carpooling-app/carpooling.js';
//creating the port
const port = 9000;
//starting the server value and listening
app.listen(9000, () => console.log(`server listening at ${port}`));