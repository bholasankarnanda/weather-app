var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "da879acfa6f124c235aa12d572d6cba0";
// Debounce Function
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
function showLoading() {
    const loading = document.getElementById("loading");
    loading.style.display = "block";
}
function hideLoading() {
    const loading = document.getElementById("loading");
    loading.style.display = "none";
}
// Get City Location
function getCityLocation(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const res = yield fetch(url);
        return res.json();
    });
}
// Get Weather Details
function getWeather(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const res = yield fetch(url);
        return res.json();
    });
}
function toCelsius(kelvin) {
    return +(kelvin - 273.15).toFixed(1);
}
//  Search Function
function handleSearch(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = e.target;
        const city = target.value.trim();
        const resultBox = document.getElementById("result");
        if (city === "") {
            resultBox.innerHTML = "";
            return;
        }
        const locationData = yield getCityLocation(city);
        if (locationData.length === 0) {
            resultBox.innerHTML = "City not found.";
            return;
        }
        const location = locationData[0];
        if (!location) {
            resultBox.innerHTML = "City not found.";
            return;
        }
        const { lat, lon, name } = location;
        const weatherData = yield getWeather(lat, lon);
        hideLoading();
        if (!weatherData.weather[0]) {
            resultBox.innerHTML = "Weather data not available.";
            return;
        }
        const temp = toCelsius(weatherData.main.temp);
        const feels = toCelsius(weatherData.main.feels_like);
        const minTemp = toCelsius(weatherData.main.temp_min);
        const maxTemp = toCelsius(weatherData.main.temp_max);
        const humidity = weatherData.main.humidity;
        const pressure = weatherData.main.pressure;
        const condition = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        if (resultBox.innerHTML.trim() === "") {
            hideLoading();
        }
        resultBox.innerHTML = `
    <div class="weather-card">
      <h3>${name}, ${weatherData.sys.country}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather" />

      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Feels Like:</strong> ${feels}°C</p>
      <p><strong>Min / Max:</strong> ${minTemp}°C / ${maxTemp}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Pressure:</strong> ${pressure} hPa</p>
      <p><strong>Latitude:</strong> ${weatherData.coord.lat}</p>
      <p><strong>Longitude:</strong> ${weatherData.coord.lon}</p>
    </div>
  `;
    });
}
const citySearchInput = document.getElementById("citySearch");
const debouncedSearch = debounce(handleSearch, 1000);
citySearchInput.addEventListener("keyup", (e) => {
    const target = e.target;
    const city = target.value.trim();
    if (city === "") {
        hideLoading();
        const resultBox = document.getElementById("result");
        resultBox.innerHTML = "";
    }
    else {
        showLoading();
        const resultBox = document.getElementById("result");
        resultBox.innerHTML = "";
        debouncedSearch(e);
    }
});
export {};
//# sourceMappingURL=app.js.map