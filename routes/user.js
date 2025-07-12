const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = 'c18a467e14766e52380dcfd974df7fbb'; // replace with your key

// GET home page
router.get("/", (req, res) => {
  res.render("home"); // your form page
});

// POST form data
router.post("/", async (req, res) => {
  const city = req.body.city;
  console.log("City entered:", city);

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = response.data;

    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;

    res.render("submit", {
      city: weatherData.name,
      temperature,
      description,
      humidity,
      windSpeed,
      longitude,
      latitude
    });
  } catch (error) {
    console.error(error);
    res.render("submit", {
      city: city,
      temperature: null,
      description: null,
      humidity: null,
      windSpeed: null,
      longitude: null,
      latitude: null,
      error: "Could not fetch weather data. Please check the city name."
    });
  }
});

module.exports = router;
