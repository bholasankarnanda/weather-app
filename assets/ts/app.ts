const apiKey: string = "da879acfa6f124c235aa12d572d6cba0";

interface LocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherData {
  main: MainWeatherData;
  weather: WeatherCondition[];
  name: string;
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

// Debounce Function
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function showLoading() {
  const loading = document.getElementById("loading") as HTMLDivElement;
  loading.style.display = "block";
}

function hideLoading() {
  const loading = document.getElementById("loading") as HTMLDivElement;
  loading.style.display = "none";
}

// Get City Location
async function getCityLocation(city: string): Promise<LocationData[]> {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const res = await fetch(url);
  return res.json();
}

// Get Weather Details
async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const res = await fetch(url);
  return res.json();
}

function toCelsius(kelvin: number): number {
  return +(kelvin - 273.15).toFixed(1);
}

//  Search Function
async function handleSearch(e: Event): Promise<void> {
  const target = e.target as HTMLInputElement;
  const city = target.value.trim();
  const resultBox = document.getElementById("result") as HTMLDivElement;

  if (city === "") {
    resultBox.innerHTML = "";
    return;
  }

  const locationData = await getCityLocation(city);

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

  const weatherData = await getWeather(lat, lon);

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
}

const citySearchInput = document.getElementById(
  "citySearch"
) as HTMLInputElement;

const debouncedSearch = debounce(handleSearch, 1000);

citySearchInput.addEventListener("keyup", (e: Event) => {
  const target = e.target as HTMLInputElement;
  const city = target.value.trim();

  if (city === "") {
    hideLoading();
    const resultBox = document.getElementById("result") as HTMLDivElement;
    resultBox.innerHTML = "";
  } else {
    showLoading();
    const resultBox = document.getElementById("result") as HTMLDivElement;
    resultBox.innerHTML = "";
    debouncedSearch(e);
  }
});
