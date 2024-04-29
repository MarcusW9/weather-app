// import _ from "lodash";
import { format } from "date-fns";
import "./style.css";

const cityDisplay = document.querySelector('#city')
const temperature = document.querySelector('#temperature')
const highLow = document.querySelector('#high-low')
const searchbar = document.querySelector('#searchbar')
const searchBtn = document.querySelector('#search-btn')

const forecast = document.querySelector('#forecast')

function convertKelvin(kelvin) {
  let celsius = kelvin - 273.15 
  celsius = Math.round(celsius);
  return celsius
}

const formatForecast = (data) => {
  const daily = {}
   Object.keys(data.list).forEach(current => {
    const date = data.list[current].dt_txt.split(' ')[0]
    if (!daily[date]) {
      daily[date] = {
        maxTemp: -Infinity,
        minTemp: Infinity
      }
    }
    daily[date].maxTemp = Math.max(daily[date].maxTemp, data.list[current].main.temp_max);
    daily[date].minTemp = Math.min(daily[date].minTemp, data.list[current].main.temp_min);
   })
   Object.keys(daily).forEach( day => {
    const formattedDay = format(day, 'E');
    const formattedDate = format(day, 'd');


      const projectDay = document.createElement('div')
      projectDay.classList.add('forecast-day')
      const projectDate  = document.createElement('div')
      projectDate.textContent = `${formattedDay}, ${formattedDate}`
      
      const projectHighLow = document.createElement('div')
      projectHighLow.textContent = `H:${convertKelvin(daily[day].maxTemp)}° L:${convertKelvin(daily[day].minTemp)}`

      projectDay.appendChild(projectDate)
      projectDay.appendChild(projectHighLow)
      
      forecast.appendChild(projectDay)

      return projectDay
   })
}

const getForecast = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=87a88cdcacc6e330c9a627b2480cb637`
  const res = await fetch(url, {mode:'cors'})
  const data = await res.json()
  forecast.innerHTML = ""
  formatForecast(data)
}

const getWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=87a88cdcacc6e330c9a627b2480cb637`
  const res = await fetch(url,  {mode:'cors'})
  const data = await res.json()
  cityDisplay.textContent = `${data.name}`
  temperature.textContent = `${convertKelvin(data.main.temp)}°`
  highLow.textContent = `H:${convertKelvin(data.main.temp_max)}° L:${convertKelvin(data.main.temp_min)}°`
  // .then(info => info.main.temp)
}

const getGeo = async (city) => {
  console.log(city)
  const url = (`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=87a88cdcacc6e330c9a627b2480cb637`)
  const res = await fetch(url, {mode:'cors'})
  const data = await res.json()
  getWeather(data[0].lat, data[0].lon)
  getForecast(data[0].lat, data[0].lon)
}

getGeo('London')

searchBtn.addEventListener("click", (e) => {
  if (searchbar.value && searchbar.value !== "") {
    getGeo(searchbar.value)
  }
})

