/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; 
const apiKey = '&appid=3d6f436d4c895fb8306b81741de9a110';  // Personal API Key for OpenWeatherMap API
let d = new Date();  // Create a new date instance dynamically with JS
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


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
        postData('/', {newDate, 'temperature': data.main.temp, feelings});
        updateUI(newDate, data.main.temp , feelings);
    })

    // .then(function(data){
        
    // })
}

//Update UI
function updateUI(date, temp, content) {
    document.getElementById('date').innerHTML = date;
    document.getElementById('temp').textContent = temp;
    document.getElementById('content').textContent = content;
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
const postData = async (url = '', data = {})=>{
    const resp = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
      const newData = await resp.json();
      return newData;
    } catch(error) {
    console.log('Error', error);
    }
}