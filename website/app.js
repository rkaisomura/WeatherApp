/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; 
const apiKey = '&appid=3d6f436d4c895fb8306b81741de9a110&units=imperial';  // Personal API Key for OpenWeatherMap API
let d = new Date();  // Create a new date instance dynamically with JS
let newDate = d.getMonth() + 1 + '.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const newZipCode =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
  
    getWeather(baseURL, newZipCode, apiKey)
    // New Syntax!
    .then(function (data){
      // Add data
        postData('/weather', {date:newDate, 'temperature': data.main.temp, 'place': data.name, textFeeling:feelings});
    })
    .then (function (data){
        updateUI();
    });
};

//Update UI
const updateUI = async() => {
    url = "/weather";
    const req = await fetch (url);
    try {
        const info = await req.json();
        document.getElementById('date').innerHTML = info.date;
        document.getElementById('temp').innerHTML = 'Actual temperature: ' + info.temp + ' °F';
        document.getElementById('place').innerHTML = 'Place: ' + info.place;
        document.getElementById('content').innerHTML = 'Today I am feeling: ' + info.textFeeling;
    }
    catch (error) {
        console.log("error", error);
    }
}


// Async GET
const getWeather = async (baseURL, newZipCode, apiKey) => {
    const resp = await fetch (baseURL + newZipCode + apiKey);
    console.log(resp);
    try {
        const data = await resp.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log ('Error', error);
    }
}

  
// Async POST
const postData = async (url, data = {})=>{
    const resp = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try{
        const newData = await resp.json();
        return newData;
    } catch (error) {
        console.log ('Error', error);
    }
}