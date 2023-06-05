import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiWeatherSunny, TiWeatherStormy, TiWeatherShower, TiWeatherDownpour, TiWeatherSnow, TiWeatherCloudy } from "react-icons/ti";
import { BsCloudFog } from "react-icons/bs";

const api = {
    key: "4ce2d69a9a47b36734f7d73ad75c6785",
    base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
    const city = "seoul";
    const url = `${api.base}weather?q=${city}&lang=kr&appid=${api.key}`;
    const [weather, setWeather] = useState({
        id: 0,
        description: "",
    });
    const [showWeather, setShowWeather] = useState(false);
    const [temperature, setTemperature] = useState("");

    useEffect(() => {
        axios.get(url).then((responseData) => {
            const data = responseData.data;
            setWeather({
                id: data.weather[0].id,
                description: data.weather[0].description,
            });
        });
    }, [url]);

    function selectIcon() {
        const iconCode = weather.id.toString();
        const isDayTime = iconCode.endsWith("d");
      
        if (iconCode === "800") {
          return isDayTime ? <TiWeatherSunny size="2rem" /> : <TiWeatherSunny size="2rem" />;
        } else if (iconCode.startsWith("2")) {
          return <TiWeatherStormy size="2rem" />;
        } else if (iconCode.startsWith("3")) {
          return <TiWeatherShower size="2rem" />;
        } else if (iconCode.startsWith("5")) {
          return <TiWeatherDownpour size="2rem" />;
        } else if (iconCode.startsWith("6")) {
          return <TiWeatherSnow size="2rem" />;
        } else if (iconCode.startsWith("7")) {
          return <BsCloudFog size="2rem" />;
        } else if (iconCode.startsWith("8")) {
          return <TiWeatherCloudy size="2rem" />;
        } else {
          return <TiWeatherSunny size="2rem" />;
        }
      }
      
    function handleMouseEnter() {
        setShowWeather(true);
        axios.get(url).then((responseData) => {
            const data = responseData.data;
            const temperatureCelsius = Math.round(data.main.temp - 273.15);
            setTemperature(temperatureCelsius);
        });
    }

    function handleMouseLeave() {
        setShowWeather(false);
        setTemperature("");
    }

    return (
        <div className="weathericon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {selectIcon()}
            {showWeather && (
                <div className="weather-detail">
                    <div className="weather-temperature">{temperature}°C</div>
                    <div className="weather-description">{weather.description}</div>
                </div>
            )}
        </div>
    );
}

export default Weather;