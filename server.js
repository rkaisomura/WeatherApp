// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;


// Spin up the server
// Callback to debug
const server = app.listen(port, ()=> {
    console.log(`Running on localhost: ${port}`);
})


// GET route which returns projectData
app.get('/weather', function (req, resp) {   
  resp.send(projectData);
});


// POST route
app.post('/weather', (req, resp) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temperature,
    place: req.body.place,
    textFeeling: req.body.textFeeling
  }
  console.log(projectData);
})