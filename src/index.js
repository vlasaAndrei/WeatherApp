import _ from 'lodash';
import './Style/desktop.css';
import './Style/mobile.css';
import { getLocation, getWeather } from './API';
import { displayCurrentInfo, displayDaily, displayHourly } from './DOM';

//Getting the input value entered by the user and saving all the data for the location in weatherInfo
const searchInput = document.getElementById('search');
const form = document.getElementById('form');

async function weather(e, location) {
  e.preventDefault();
  try {
    if (location === undefined) {
      location = searchInput.value;
    }

    const lonLat = await getLocation(location);
    const weatherInfo = await getWeather(lonLat.longitude, lonLat.latitude);
    displayCurrentInfo(weatherInfo.info, location);
    displayHourly(weatherInfo.info);
    displayDaily(weatherInfo.info);
  } catch (error) {
    console.error(error);
  }
}

window.onload = (e) => {
  weather(e, 'Vatra Dornei');
};

form.addEventListener('submit', weather);
