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
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
// Get city cordinates
function getCityLocation(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const res = yield fetch(url);
        return res.json();
    });
}
// Get weather using latitude and logitude
function getWeather(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const res = yield fetch(url);
        return res.json();
    });
}
// Search function
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
        const temperature = weatherData.main.temp;
        const weatherCondition = weatherData.weather[0];
        if (!weatherCondition) {
            resultBox.innerHTML = "Weather data not available.";
            return;
        }
        const condition = weatherCondition.description;
        resultBox.innerHTML = `
    <p><strong>Location:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${temperature}°C</p>
    <p><strong>Condition:</strong> ${condition}</p>
  `;
    });
}
const citySearchInput = document.getElementById("citySearch");
citySearchInput.addEventListener("keyup", debounce(handleSearch, 1000));
export {};
//# sourceMappingURL=app.js.map