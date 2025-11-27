# Weather App 🌤️

A modern, responsive weather application built with **TypeScript**, **HTML**, and **CSS** that provides real-time weather information for any city in the world using the OpenWeatherMap API.

## Features ✨

- 🔍 **City Search**: Search for weather by city name with real-time results
- 📊 **Detailed Weather Information**: View comprehensive weather data including:
  - Current temperature
  - "Feels like" temperature
  - Min/Max temperatures
  - Weather conditions with icons
  - Humidity percentage
  - Atmospheric pressure
  - Geographic coordinates (latitude & longitude)
- ⏱️ **Debounced Search**: Optimized search with 1-second debounce to reduce API calls
- 💾 **Loading States**: User-friendly loading indicator while fetching data
- 🎨 **Beautiful UI**: Modern gradient background with responsive design
- 📱 **Mobile Responsive**: Works seamlessly on all device sizes

## Project Demo 🎬

Watch the app in action:

<video width="320" height="240" controls>
  <source src="assets/video/weatherapp.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Project Structure 📁

```
Weather app/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── style.css       # Application styling
│   ├── js/
│   │   ├── app.js          # Compiled JavaScript
│   │   └── app.d.ts        # TypeScript definitions
│   ├── ts/
│   │   └── app.ts          # TypeScript source code
│   └── video/
│       └── weatherapp.mp4  # Demo video
```

## Technologies Used 🛠️

- **TypeScript**: Strongly-typed JavaScript for better code quality
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and gradients
- **OpenWeatherMap API**: Real-time weather data
- **Fetch API**: Asynchronous API calls

## Installation & Setup 🚀

### Prerequisites

- Node.js and npm installed on your system

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Weather app"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build TypeScript**

   ```bash
   npm run build
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## How to Use 📝

1. Launch the application in your browser
2. Type any city name in the search input field
3. The app will automatically search and display weather information after 1 second
4. View the detailed weather card with all relevant information
5. Clear the input to reset the results

## Code Overview 📚

### Main TypeScript (`assets/ts/app.ts`)

#### Key Interfaces

- **LocationData**: Stores geographic information (name, latitude, longitude, country)
- **WeatherCondition**: Describes weather conditions (id, description, icon)
- **MainWeatherData**: Contains temperature and atmospheric data
- **WeatherData**: Complete weather information for a location

#### Key Functions

**`debounce<T>(fn: T, delay: number)`**

- Utility function that delays function execution
- Prevents excessive API calls during rapid typing
- Delay set to 1000ms (1 second)

**`showLoading()` / `hideLoading()`**

- Display/hide the loading indicator
- Manages user feedback during API calls

**`getCityLocation(city: string)`**

- Fetches geographic data for a given city
- Uses OpenWeatherMap Geocoding API
- Returns array of matching locations

**`getWeather(lat: number, lon: number)`**

- Retrieves weather data for specific coordinates
- Uses OpenWeatherMap Current Weather API
- Returns comprehensive weather information

**`toCelsius(kelvin: number)`**

- Converts Kelvin temperature to Celsius
- Rounds to 1 decimal place

**`handleSearch(e: Event)`**

- Main search handler function
- Processes user input, validates, and fetches data
- Displays weather information or error messages
- Async function that awaits API responses

### HTML (`index.html`)

- Simple, semantic structure
- Input field for city search
- Loading indicator div
- Result container for weather display
- Responsive meta tags for mobile devices

### CSS (`assets/css/style.css`)

- **Gradient Background**: Beautiful blue gradient (135deg)
- **Card Design**: Centered white card with shadow
- **Input Styling**: Blue-themed input with focus state
- **Typography**: System fonts with proper hierarchy
- **Responsive**: Flexbox-based centered layout

## API Integration 🌐

### OpenWeatherMap API

**Geocoding API** (Geo 1.0)

```
https://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={apiKey}
```

**Current Weather API** (2.5)

```
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}
```

**API Key**: `da879acfa6f124c235aa12d572d6cba0` (configured in the app)

## Temperature Conversion ℃

- API returns temperature in Kelvin
- Converted to Celsius: `K - 273.15`
- Displayed with 1 decimal place precision

## Features Explained 🔧

### Debouncing

- Implements a debounce function to optimize API usage
- Waits 1 second after the user stops typing before making an API call
- Reduces unnecessary requests and improves performance

### Error Handling

- Validates city existence
- Checks for weather data availability
- Displays user-friendly error messages

### Loading States

- Shows "Please Wait...." during API calls
- Clears loading message when results arrive
- Resets on input clear

## Future Enhancements 💡

- 🌍 Geolocation-based weather
- 📅 Extended forecast (7-day, 14-day)
- 🌙 Dark/Light theme toggle
- ❤️ Favorite cities
- 📊 Weather charts and graphs
- 🔔 Weather alerts
- 🌍 Multiple language support

## Browser Compatibility 🌐

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing 🤝

Feel free to fork this project and submit pull requests for any improvements.

## Support 📞

For issues or questions, please open an issue in the repository.

---

**Enjoy checking the weather!** ☀️🌧️⛈️
