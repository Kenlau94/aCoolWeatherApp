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
