import React, { useState, useEffect } from "react";
import { Container } from "./components/styles/StyledComponents";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";

function App() { //Api를 불러옴, 서울의 날짜, 날씨 데이터 요청
  const API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=37.566&longitude=126.9784&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=Asia%2FTokyo&forecast_days=7";

  const [weatherData, setWeatherData] = useState(null);     //날씨 데이터를 저장, 처음에는 null
  const [isLoading, setIsLoading] = useState(true); //로딩 여부를 저장, 처음엔 true->데이터를 불러오는 중 

  useEffect(() => {
    fetch(API_URL) //컴포넌트가 처음 렌더링 될 때 API를 호출함
      .then((response) => response.json())   //응답데이터를 json으로 변환함
      .then((data) => {
        setWeatherData(data);    //날씨 데이터를 weatherData에 저장함
        setIsLoading(false);     //로딩 완료
      })    
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setIsLoading(false);     //error가 발생해도 로딩이 종료됨
      });
  }, []);

  return (
    <Container>   
      <CurrentWeather weatherData={weatherData} isLoading={isLoading} /> {/* 현재 날씨 컴포넌트 렌더링*/}
      {!isLoading && weatherData && ( //로딩 끝나면, 데이터가 있으면 시간별, 일별 데이터 표시
        <>
          <HourlyForecast weatherData={weatherData} />
          <DailyForecast weatherData={weatherData} />
        </>
      )}
    </Container>
  );
}

export default App;
