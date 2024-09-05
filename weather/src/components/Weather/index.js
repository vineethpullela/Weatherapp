import "./index.css"
import search_icon from "../../asserts/search.png";
import clear_icon from "../../asserts/clear.png";
import cloud_icon from "../../asserts/cloud.png";
import drizzle_icon from "../../asserts/drizzle.png";
import rain_icon from "../../asserts/rain.png";
import snow_icon from "../../asserts/snow.png";
import wind_icon from "../../asserts/wind.png";
import humidity_icon from "../../asserts/humidity.png";
import { useEffect, useRef, useState } from "react";

const api_id="3ec1db52cff9ac5d48af22cae44331c2";

const Weather=()=>{
    const inputRef=useRef("");
  
  const [weatherData,setWeatherData]=useState(false);

  const allicons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,

  }

  

const search =async(city)=>{
   if(city===""){
    alert("Enter City Name");
    return;
   }

    
    try{
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_id}`;
const response=await fetch(url);
const data= await response.json();
if(!response.ok){
    alert(data.message);
    return;
}
console.log(data)
const icon=allicons[data.weather[0].icon]||clear_icon;
setWeatherData({
    humidity:data.main.humidity,
    windSpeed:data.wind.speed,
    temperature:Math.floor(data.main.temp),
    location:data.name,
    icon:icon
})
    }catch(error){
setWeatherData(false);
alert("Enter valid City Name")
console.error("Error in fetching weather data")
    }
}

useEffect(()=>{
    search("Hyderabad");
    
    },[])

    return(
        <div className="weather-container">
            <div className="search-bar-container">
            <input type="text" ref={inputRef} className="search-input" placeholder="Search"/>
            <img src={search_icon} className="search-icon" alt="" onClick={()=>search(inputRef.current.value)}  />
            </div>
            {weatherData?<> <img src={weatherData.icon} alt="" className="weather-icon"/>
<p className="temperature">{weatherData.temperature}°c</p>
<p className="city-name">{weatherData.location}</p>
           <div className="weather-data">
            <div className="col">
            <img src={humidity_icon} className="weather-cast-icon" alt=""/>
            <div className="">
                <p className="weather-p">{weatherData.humidity} %</p>
                <span className="weather-span">Humidity</span>
            </div>
            </div>
            <div className="col">
            <img src={wind_icon} className="weather-cast-icon" alt=""/>
            <div className="">
                <p className="weather-p">{weatherData.windSpeed} km/h</p>
                <span className="weather-span">Wind Speed</span>
            </div>
            </div>
           </div></>:<></>}


           
         
        </div>
    )
}


export default Weather