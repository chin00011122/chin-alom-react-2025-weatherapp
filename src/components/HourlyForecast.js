import React from "react";
import { HourlyForecastWrapper, HourlyItem } from "./styles/StyledComponents";
import { getWeatherDescription, formatHourlyData } from "../utils/weather";

const HourlyForecast = ({ weatherData }) => {
const hourlyData = formatHourlyData(weatherData);

  return (
    <HourlyForecastWrapper>
      {hourlyData.map((item,index)=>(
        <HourlyItem key={index}>
          <p>{item.hourLabel}</p>
          <p>{item.temperature}</p>
          <p>{getWeatherDescription(item.weatherCode)}</p>
        </HourlyItem>
      ))}
    </HourlyForecastWrapper>
  )
};

export default HourlyForecast;
