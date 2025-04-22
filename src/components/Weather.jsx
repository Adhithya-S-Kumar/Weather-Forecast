import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import sunny_icon from '../assets/sunny.png'
import drizzle_icon from '../assets/drizzle.jpg'
import cloud_icon from '../assets/cloud.webp'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.webp'


function Weather() {
    const inputRef =useRef()

    const [weatherData, setWeatherData]=useState(false)

    const allIcons={
        "01d": sunny_icon,
        "01n": sunny_icon,
        "02d": cloud_icon,
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
    const search = async(city)=>{
        if(city===""){
            alert("Enter City Name")
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message)
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sunny_icon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                pressure:data.main.pressure,
                description:data.weather[0].description
            })
     
        }catch(error){
           setWeatherData(false);
           console.error("Error in fetching weather data")
        }
    }

    useEffect(()=>{
        search("America")
    },[])


  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <i onClick={()=>search(inputRef.current.value)} class="fa-solid fa-magnifying-glass"></i>
        </div>
        
        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature} °C</p>
      <p className='location'>{weatherData.location}</p>
      <p className='description'>{weatherData.description}</p>

      <div className="weather-data">
        <div className="col">
        <div>
        <span>Humidity</span>
        <i class="fa-solid fa-droplet"></i>
        <p>{weatherData.humidity} %</p>
        </div>
        </div>

        <div className="col">
            <div>
            <span>Wind Speed</span>
            <i class="fa-solid fa-wind"></i>
            <p>{weatherData.windSpeed} km/h</p>
            </div>
        </div>

        <div className="col">
        
            <div>
            <span>Pressure</span>
            <i class="fa-solid fa-arrows-up-to-line"></i>
            <p>{weatherData.pressure} mb</p>
           </div>
        </div>
        
      </div>
        </>:<></>}

        
    </div>
  )
}

export default Weather
