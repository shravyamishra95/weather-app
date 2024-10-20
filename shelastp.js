
const apiKey = "f8662d4e08e38d7541e1a56ddbe00eb3"; // Replace with your actual API key

document.getElementById("search-button").addEventListener("click", getWeather);

async function getWeather() {
  const location = document.getElementById("country-input").value;
  if (!location) {
    alert("Please enter a country name");
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  if (data.cod === 200) {
    displayWeather(data);
  } else {
    alert("Error fetching weather data: " + data.message);
  }
}

function getWeatherEmoji(description) {
  const weatherEmojis = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "🌥️",
    "broken clouds": "☁️",
    "shower rain": "🌧️",
    rain: "🌧️",
    "light rain": "🌦️",
    "moderate rain": "🌧️",
    "heavy rain": "🌧️",
    thunderstorm: "⛈️",
    snow: "❄️",
    mist: "🌫️",
  };

  return weatherEmojis[description] || "☁️"; // Default emoji if no match
}

function displayWeather(data) {
  const weatherDescription = data.weather[0].description;
  const emoji = getWeatherEmoji(weatherDescription);

  document.getElementById(
    "location"
  ).innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById("description").innerText = `${emoji} ${
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)
  }`;
  document.getElementById(
    "humidity"
  ).innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").innerText = `Wind: ${data.wind.speed} km/h`;
  document.getElementById("temperature").innerText = `${Math.round(
    data.main.temp
  )} °C`;

  const date = new Date(data.dt * 1000);
  document.getElementById("time").innerText = `${date.toLocaleString("en-IN", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  })}`;
}

// Optionally, you can also add an event listener for pressing Enter
document
  .getElementById("country-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });
