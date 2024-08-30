const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "b49cbc33e32f7b845112f61706bcefdf";


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.Value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {

        }
        console.log(error);
        displayError(error);
    }
    else {
        displayError("Please enter the city");
    }

});

async function getWeatherData(city) {

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
   if(!response.ok){
    throw new Error("Could not fetch weather data");
   }
   return await response.json();
}
function displayWeatherInfo(data) {
    const {name: city, 
        main: {temp, humid}, 
    weather:[{description, id}]} = data;

    card.textContent="";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const temperature = document.createElement("p");
    const humid = document.createElement("p");
    const description = document.createElement("p");
    const emoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}ºC`;
    humidity.textContent = `Humidity: ${humidity}%`;
    description.textContent = description 

    cityDisplay.classList.add("place");
    tempDisplay.classList.add("tempDisplay");
    humidity.classList.add("humidity");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidity);
}
function getWeatherEmoji(weatherId) {

}
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}