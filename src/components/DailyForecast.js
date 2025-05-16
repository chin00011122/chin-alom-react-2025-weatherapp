import React from "react";
import { DailyForecastWrapper, DailyItem } from "./styles/StyledComponents";
import { getWeatherDescription, formatDailyData } from "../utils/weather";

const DailyForecast = ({ weatherData }) => {
const dailyData = formatDailyData(weatherData);

  return (
    <DailyForecastWrapper>
      {dailyData.map((item,index)=>(
        <DailyItem key={index}>
          <p>{item.day}</p>
          <p>{getWeatherDescription(item.weatherCode)}</p>
          <p>{item.temperature}</p>
        </DailyItem>
      ))}
    </DailyForecastWrapper>
  );
};
export default DailyForecast;
