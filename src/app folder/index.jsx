import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";

export default function Test(){
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/weather`, {
        params: {
          city,
        },
      });
      setWeather(response.data);
      setError(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h4" align="center">
          Weather App
        </Typography>
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={fetchWeather}
        >
          Get Weather
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        {weather && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">{`Weather in ${weather.name}`}</Typography>
            <Typography>{`Temperature: ${weather.main.temp} °C`}</Typography>
            <Typography>{`Description: ${weather.weather[0].description}`}</Typography>
            <Typography>{`ٌWind Speed: ${weather.wind.speed}km/h`}</Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
};

