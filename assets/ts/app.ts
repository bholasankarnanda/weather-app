const apiKey: string = "da879acfa6f124c235aa12d572d6cba0";

// Types for API responses
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
}

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

// Get city cordinates
async function getCityLocation(city: string): Promise<LocationData[]> {
  const url: string = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const res: Response = await fetch(url);
  return res.json();
}

// Get weather using latitude and logitude
async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const res: Response = await fetch(url);
  return res.json();
}

// Search function
async function handleSearch(e: Event): Promise<void> {
  const target = e.target as HTMLInputElement;
  const city: string = target.value.trim();
  const resultBox = document.getElementById("result") as HTMLDivElement;

  if (city === "") {
    resultBox.innerHTML = "";
    return;
  }

  const locationData: LocationData[] = await getCityLocation(city);

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
  const weatherData: WeatherData = await getWeather(lat, lon);
  const temperature: number = weatherData.main.temp;
  const weatherCondition = weatherData.weather[0];
  if (!weatherCondition) {
    resultBox.innerHTML = "Weather data not available.";
    return;
  }
  const condition: string = weatherCondition.description;

  resultBox.innerHTML = `
    <p><strong>Location:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${temperature}°C</p>
    <p><strong>Condition:</strong> ${condition}</p>
  `;
}

const citySearchInput = document.getElementById("citySearch") as HTMLInputElement;
citySearchInput.addEventListener("keyup", debounce(handleSearch, 1000));
