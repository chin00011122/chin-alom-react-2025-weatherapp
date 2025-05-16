import React from "react";
import {
  CurrentWeatherWrapper,
  Temperature,
  WeatherCode,
} from "./styles/StyledComponents";
import { getWeatherDescription } from "../utils/weather";

const CurrentWeather = ({ weatherData, isLoading }) => {
  if (isLoading) {
    return <div>불러오는 중...</div>;
  }
  if(!weatherData||!weatherData.hourly){
    return <div>현재 날씨 데이터를 불러 올 수 없습니다.</div>
  }

  const time=weatherData.hourly.time;
  const temperature_2m=weatherData.hourly.temperature_2m;
  const weather_code=weatherData.hourly.weather_code;
  const now= new Date();
  let closestIndex=0;
  for(let i=0; i<time.length; i++){
    const forecastTime=new Date(time[i]);
    if(forecastTime>now){  //예보 시간이 지금보다 클때, 미래일때
      closestIndex=i;      // 그 시간을 가장 가까운 시간으로 지정
      break;
    }
  }
  const temperature=temperature_2m[closestIndex];
  const weathercode=weather_code[closestIndex];
  console.log("현재 예보 시간: ", closestIndex);
  return (
    <CurrentWeatherWrapper>
      <Temperature>{temperature}°C</Temperature>
      <WeatherCode>{getWeatherDescription(weathercode)}</WeatherCode>
    </CurrentWeatherWrapper>
  );
};
export default CurrentWeather;
