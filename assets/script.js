// // Get references to HTML elements using their IDs
// var searchInputEl = document.getElementById("search-input");
// var searchButtonEl = document.getElementById("search-button");
// var cityNameEl = document.getElementById("cityname");
// var cityHistoryEl = document.getElementById("city-history");

// var indexs = [0, 7, 15, 23, 31, 39];
// // Set up arrays of references to HTML elements
// var cityDayEl = [
//   document.getElementById("cityday"),
//   document.getElementById("cityday1"),
//   document.getElementById("cityday2"),
//   document.getElementById("cityday3"),
//   document.getElementById("cityday4"),
//   document.getElementById("cityday5"),
// ];

// var tempEls = [
//   document.getElementById("temp"),
//   document.getElementById("temp1"),
//   document.getElementById("temp2"),
//   document.getElementById("temp3"),
//   document.getElementById("temp4"),
//   document.getElementById("temp5"),
// ];

// var humidEls = [
//   document.getElementById("humid"),
//   document.getElementById("humid1"),
//   document.getElementById("humid2"),
//   document.getElementById("humid3"),
//   document.getElementById("humid4"),
//   document.getElementById("humid5"),
// ];

// var windEls = [
//   document.getElementById("wind"),
//   document.getElementById("wind1"),
//   document.getElementById("wind2"),
//   document.getElementById("wind3"),
//   document.getElementById("wind4"),
//   document.getElementById("wind5"),
// ];

// var weatherIconEls = [
//   document.getElementById("weather-icon"),
//   document.getElementById("weather-icon1"),
//   document.getElementById("weather-icon2"),
//   document.getElementById("weather-icon3"),
//   document.getElementById("weather-icon4"),
//   document.getElementById("weather-icon5"),
// ];
// // Get reference to HTML element where weather information will be displayed
// var weatherDisplayEl = document.getElementById("displayweather");
// var weatherIconEl = document.getElementById("weather-icon");
// // Set API key and initialize empty arrays for cities, city history, and weather data

// var apiKey = "961c97474e283a72c3bce315872b931b";
// var cities = [];
// var city_history = [];
// var temps = [6];
// var humids = [6];
// var winds = [6];
// var dates = [6];

// // Function to get the latitude and longitude for a given city
// function getLocation(city) {
//   console.log("hello");
//   var locationUrl =
//     "https://api.openweathermap.org/geo/1.0/direct?q=" +
//     city +
//     "&appid=" +
//     apiKey;
//   // Fetch data from the API and return a JSON object
//   fetch(locationUrl)
//     .then(function (data) {
//       return data.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       console.log(data[0]);
//       console.log(data[0].name);
//       var lat = data[0].lat;
//       var lon = data[0].lon;
//       getWeather(lat, lon);
//     });
// }
// // Function to get the weather data for a given latitude and longitude
// function getWeather(lat, lon) {
//   var weatherUrl =
//     "https://api.openweathermap.org/data/2.5/forecast?lat=" +
//     lat +
//     "&lon=" +
//     lon +
//     "&units=metric" +
//     "&lang=english" +
//     "&appid=" +
//     apiKey;
//   fetch(weatherUrl)
//     .then(function (data) {
//       return data.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       displayWeather(data);
//     });
// }
// // Here the function takes in weather data from an API and updates the relevant DOM elements with the weather information
// function displayWeather(data) {
//   console.log(data);
//   // Extract the relevant weather data from the API response
//   var city = data.city.name;
//   cityHistoryEl.textcontext = "";

//   // Remember, pleaase loop through the first 6 items in the API response and extract the temperature, humidity, wind speed, and date
//   for (let i = 0; i < 6; i++) {
//     temps[i] = data.list[indexs[i]].main.temp;
//     humids[i] = data.list[indexs[i]].main.humidity;
//     winds[i] = data.list[indexs[i]].wind.speed;
//     dates[i] = new Date(data.list[indexs[i]].dt * 1000);
//   }
//   // Add the first 5 items in the API response to the "cities" array
//   for (let i = 0; i < 5; i++) {
//     cities.push(data.list[i]);
//   }

//   // Update the DOM elements with the relevant weather data
//   // Hello there, and welcome visitor - upon viewing this code you'll understand that for legacy purposes...
//   // this is where the trials and tribulations begin with having the relevant data appear for the module...
//   // please, ensure that if you follow my methodology and approach that you are careful with referrencing the correct data
//   // SO becareful when using similar wording
//   for (let j = 0; j < 6; j++) {
//     tempEls[j].textContent = "Temperature: " + temps[j] + "°C";
//     humidEls[j].textContent = "Humidity: " + humids[j] + "%";
//     windEls[j].textContent = "Wind Speed: " + winds[j] + "KM/H";
//     cityDayEl[j].textContent =
//       "City Day: " + city + " " + dates[j].toLocaleDateString();
//     weatherIconEls[j].setAttribute(
//       "src",
//       `https://openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`
//     );
//   }
// }

// // Always leave at bottum
// // This event listener is triggered when the user clicks the search button.
// // It retrieves the user's search input and calls the "getLocation" function to get the weather data
// searchButtonEl.addEventListener("click", function () {
//   var searchInput = searchInputEl.value;
//   getLocation(searchInput);
//   // Add the user's search input to the "city_history" array and update the city history on the page
//   if (city_history.length < 3) {
//     console.log(city_history);
//     city_history.unshift(searchInput);
//     console.log(city_history);
//   } else {
//     city_history.length = city_history.length - 1;
//     city_history.unshift(searchInput);
//   }
//   printCityHistory();
//   updateCityHistory(city_history);
// });

// // Retrieve city history from local storage, or initialize empty array if not present
// var city_history = JSON.parse(localStorage.getItem("city_history")) || [];

// // This function prints the city history on the page, with each city as a button that can be clicked to retrieve the weather data
// function printCityHistory() {
//   cityHistoryEl.innerHTML = "";
//   console.log(cityHistoryEl);
//   for (let i = 0; i < city_history.length; i++) {
//     const list = document.createElement("li");
//     list.setAttribute("id", city_history[i]);
//     cityHistoryEl.appendChild(list);
//     const container = document.getElementById(city_history[i]);
//     const button = document.createElement("button");
//     button.setAttribute("value", city_history[i]);
//     button.textContent = city_history[i];
//     container.appendChild(button);
//     button.addEventListener("click", function (event) {
//       const city = event.target.value;
//       console.log(city);
//       getLocation(city);
//     });
//   }
// }
// // This function updates the city history in local storage with the user's search input and calls the "printCityHistory" function to update the city history on the page
// function updateCityHistory(searchInput) {
//   localStorage.setItem("city_history", JSON.stringify(searchInput));
//   printCityHistory();
// }
// // Load city history on page load
// printCityHistory();

const elements = {
  searchInput: document.getElementById("search-input"),
  searchButton: document.getElementById("search-button"),
  cityName: document.getElementById("cityname"),
  cityHistory: document.getElementById("city-history"),
};

const indexs = [0, 7, 15, 23, 31, 39];
const cityDayEls = Array.from({ length: 6 }, (_, i) =>
  document.getElementById(`cityday${i === 0 ? "" : i}`)
);
const tempEls = Array.from({ length: 6 }, (_, i) =>
  document.getElementById(`temp${i === 0 ? "" : i}`)
);
const humidEls = Array.from({ length: 6 }, (_, i) =>
  document.getElementById(`humid${i === 0 ? "" : i}`)
);
const windEls = Array.from({ length: 6 }, (_, i) =>
  document.getElementById(`wind${i === 0 ? "" : i}`)
);
const weatherIconEls = Array.from({ length: 6 }, (_, i) =>
  document.getElementById(`weather-icon${i === 0 ? "" : i}`)
);

const weatherDisplayEl = document.getElementById("displayweather");
const weatherIconEl = document.getElementById("weather-icon");

const apiKey = "961c97474e283a72c3bce315872b931b";
const cities = [];
const cityHistory = [];
const temps = Array(6).fill(0);
const humids = Array(6).fill(0);
const winds = Array(6).fill(0);
const dates = Array(6).fill(new Date());

async function getLocation(city) {
  try {
    const locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const response = await fetch(locationUrl);
    const data = await response.json();
    const { lat, lon } = data[0];
    getWeather(lat, lon);
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}

async function getWeather(lat, lon) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=english&appid=${apiKey}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  try {
    const city = data.city.name;
    cityHistory.textContent = "";

    for (let i = 0; i < 6; i++) {
      temps[i] = data.list[indexs[i]].main.temp;
      humids[i] = data.list[indexs[i]].main.humidity;
      winds[i] = data.list[indexs[i]].wind.speed;
      dates[i] = new Date(data.list[indexs[i]].dt * 1000);
    }

    cities.push(...data.list.slice(0, 5));

    for (let j = 0; j < 6; j++) {
      tempEls[j].textContent = `Temperature: ${temps[j]}°C`;
      humidEls[j].textContent = `Humidity: ${humids[j]}%`;
      windEls[j].textContent = `Wind Speed: ${winds[j]}KM/H`;
      cityDayEls[j].textContent = `City Day: ${city} ${dates[
        j
      ].toLocaleDateString()}`;
      weatherIconEls[j].setAttribute(
        "src",
        `https://openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`
      );
    }
  } catch (error) {
    console.error("Error displaying weather:", error);
  }
}

elements.searchButton.addEventListener("click", function () {
  const searchInput = elements.searchInput.value;
  getLocation(searchInput);

  if (cityHistory.length < 3) {
    cityHistory.unshift(searchInput);
  } else {
    cityHistory.pop();
    cityHistory.unshift(searchInput);
  }
  updateCityHistory(cityHistory);
});

const storedCityHistory = JSON.parse(localStorage.getItem("city_history"));
if (Array.isArray(storedCityHistory)) {
  cityHistory.push(...storedCityHistory);
}

function printCityHistory() {
  elements.cityHistory.innerHTML = "";
  for (let i = 0; i < cityHistory.length; i++) {
    const listItem = document.createElement("li");
    listItem.setAttribute("id", `city-history-${i}`);
    elements.cityHistory.appendChild(listItem);

    const button = document.createElement("button");
    button.setAttribute("value", cityHistory[i]);
    button.textContent = cityHistory[i];
    listItem.appendChild(button);

    button.addEventListener("click", function (event) {
      const city = event.target.value;
      getLocation(city);
    });
  }
}

function updateCityHistory(searchInput) {
  localStorage.setItem("city_history", JSON.stringify(searchInput));
  printCityHistory();
}

printCityHistory();
