export const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: "맑음",
    1: "대체로 맑음",
    2: "부분적으로 흐림",
    3: "흐림",
    45: "안개",
    48: "짙은 안개",
    51: "약한 이슬비",
    53: "보통 이슬비",
    55: "강한 이슬비",
    61: "약한 비",
    63: "보통 비",
    65: "강한 비",
    71: "약한 눈",
    73: "보통 눈",
    75: "강한 눈",
  };
  return weatherCodes[code] || "알 수 없음";  
};

export const formatHourlyData = (weatherData) => {
  if (!weatherData) return [];
  // 밑에 코드 채워주세요
  /*latitude, longitude: 서울 좌표 (37.566°N, 126.9784°E)
hourly: 시간별 날씨 데이터 포함:
temperature_2m: 섭씨 온도
weather_code: 날씨 상태 코드
daily: 일별 날씨 데이터 포함:
weather_code: 일별 날씨 상태 코드
temperature_2m_max: 일 최고 기온
timezone: Asia/Tokyo
forecast_days: 7일 예보 */
const time= weatherData.hourly.time; //시간
const temperature_2m=weatherData.hourly.temperature_2m; //섭씨 온도
const weather_code= weatherData.hourly.weather_code; //날시 상태 코드

const currentDayHour=new Date(); //현재 날짜, 시간

const parsed=[]; 
for (let i=0; i< time.length; i++){
  const hour=new Date(time[i]);
  if(currentDayHour<=hour&&parsed.length<12){
    parsed.push({
      hourLabel: `${hour.getHours()}시`,   //시간
      temperature: `${temperature_2m[i]}°C`,//섭씨 온도
      weatherCode: weather_code[i], //날씨 설명
    })
  }
}
console.log("formatHourlyData: ", parsed);
console.log("현재 시각: ", currentDayHour);

  return parsed;
};

export const formatDailyData = (weatherData) => {
  if (!weatherData) return [];  //날씨데이터가 없으면 빈 배열 반환
  // 밑에 코드 채워주세요
  const day= weatherData.daily.time; //날짜 배열
  const temperature_2m_max=weatherData.daily.temperature_2m_max //최고 온도
  const weather_code=weatherData.daily.weather_code //날씨 코드

  return day.map((dateStr, index)=>{    //map 반복
    const dayDate=new Date(dateStr);  
    const formattedDate=dayDate.toLocaleDateString("ko-KR",{  //한글
      month: "long",  //5월 16일로 출력
      day:"numeric", 
    });
    const weekOneChar=dayDate.toLocaleDateString("ko-KR",{
      weekday:"long"  //금요일

    }).charAt(0); //금
    return{
        day: `${formattedDate} (${weekOneChar})`, //5월 16일 (금)
        temperature: `${temperature_2m_max[index]}°C` ,
        weatherCode: weather_code[index], 
    }



  })
};
