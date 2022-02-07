import fromUnixTime from 'date-fns/fromUnixTime';

//
//Returns the icon for the weather
function getIcon(iconId) {
  return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
}

//Capitalize the first letter of each name of a city

function capitalizeCity(cityToCap) {
  cityToCap = cityToCap.split(' ');

  for (let i = 0; i < cityToCap.length; i++) {
    cityToCap[i] = cityToCap[i].charAt(0).toUpperCase() + cityToCap[i].substring(1);
  }

  return cityToCap.join(' ');
}

//DOM for the current weather information
const city = document.querySelector('.city');
const time = document.querySelector('.time');
const day = document.querySelector('.day');
const dmy = document.querySelector('.d-m-y');
const weatherDesc = document.querySelector('.weather-title');
const temp = document.querySelector('.temp');
const feels = document.querySelector('.feels');
const mainIcon = document.querySelector('.main-icon');
const desc = document.querySelector('.weather-desc');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const pressure = document.querySelector('.pressure');
const uvi = document.querySelector('.uvi');
const visibility = document.querySelector('.visibility');
const wind = document.querySelector('.wind-speed');
const clouds = document.querySelector('.clouds');
const humidity = document.querySelector('.humidity');

//Display the page with the current weather information fetched from the weather API after the user inputs a valid city
export function displayCurrentInfo(weather, cityName) {
  const current = weather.current;
  //Left side

  city.textContent = capitalizeCity(cityName);

  const date = fromUnixTime(current.dt + weather.timezone_offset - 7200);
  let storeDate = date.toString();
  storeDate = storeDate.split(' ');

  weatherDesc.textContent = current.weather[0].main;
  desc.textContent = current.weather[0].description;
  day.textContent = storeDate[0];
  time.textContent = storeDate[4].slice(0, 5);
  dmy.textContent = `${storeDate[2]} ${storeDate[1]} ${storeDate[3]} `;
  temp.textContent = current.temp + ' ° C';
  feels.textContent = `Feels like ${current.feels_like} ° C`;
  const imgId = current.weather[0].icon;
  mainIcon.src = getIcon(imgId);

  //Right side
  let dateSunrise = fromUnixTime(current.sunrise + weather.timezone_offset - 7200);
  dateSunrise = dateSunrise.toString();
  sunrise.textContent = `Sunrise :  ${dateSunrise.slice(16, 21)}`;

  let dateSunset = fromUnixTime(current.sunset + weather.timezone_offset - 7200);
  dateSunset = dateSunset.toString();
  sunset.textContent = `Sunset :  ${dateSunset.slice(16, 21)}`;

  pressure.textContent = `Pressure :  ${current.pressure} hPa`;
  uvi.textContent = `UV index :  ${current.uvi} UV`;
  visibility.textContent = `Visibility :  ${current.visibility / 100} km`;
  wind.textContent = `Wind speed :  ${current.wind_speed} m/s`;
  clouds.textContent = `Cloudiness :  ${current.clouds}%`;
  humidity.textContent = `Humidity : ${current.humidity}%`;
}

//Diplays the hourly weather for the next 24 hours
const forecastHourly = document.querySelector('.forecast-hourly');

export function displayHourly(weather) {
  for (let i = 0; i < 25; i++) {
    if (forecastHourly.firstChild) {
      forecastHourly.removeChild(forecastHourly.lastChild);
    }
  }

  weather.hourly.forEach((hour, i) => {
    if (i === 0 || i > 25) return;
    //Create the DOM for each card with the hourly forecast
    const card = document.createElement('div');
    const time = document.createElement('div');
    const icon = document.createElement('img');
    const title = document.createElement('div');
    const desc = document.createElement('div');
    const temperature = document.createElement('div');
    const feels = document.createElement('div');

    card.appendChild(time).classList.add('hourly-time');
    card.appendChild(icon).classList.add('hourly-icon');
    card.appendChild(title).classList.add('hourly-title');
    card.appendChild(desc).classList.add('hourly-desc');
    card.appendChild(temperature).classList.add('hourly-temperature');
    card.appendChild(feels).classList.add('hourly-feels');
    forecastHourly.appendChild(card).classList.add('hourly-card');

    //Get the values for each card

    let storeHour = fromUnixTime(hour.dt + weather.timezone_offset - 7200);
    storeHour = storeHour.toString();
    time.textContent = storeHour.slice(16, 21);
    const imgId = hour.weather[0].icon;
    icon.src = getIcon(imgId);
    title.textContent = hour.weather[0].main;
    desc.textContent = hour.weather[0].description;
    let stringTemp = hour.temp.toString();
    stringTemp = stringTemp.split('.');
    temperature.textContent = `${stringTemp[0]} ° C`;
    if (temperature.textContent === '-0 ° C') {
      temperature.textContent = '0 ° C';
    }
    let stringFeels = hour.feels_like.toString();
    stringFeels = stringFeels.split('.');
    feels.textContent = `Feels like ${stringFeels[0]} ° C`;
    if (feels.textContent === '-0 ° C') {
      feels.textContent = '0 ° C';
    }
  });
}

//
//Display the daily forecast for the next 7 days
const forecastDaily = document.querySelector('.forecast-daily');

export function displayDaily(weather) {
  for (let i = 0; i < 9; i++) {
    if (forecastDaily.firstChild) {
      forecastDaily.removeChild(forecastDaily.lastChild);
    }
  }

  weather.daily.forEach((day) => {
    //Create the DOM for each card with the daily forecast
    const card = document.createElement('div');
    const weekday = document.createElement('div');
    const date = document.createElement('div');
    const icon = document.createElement('img');
    const title = document.createElement('div');
    const desc = document.createElement('div');
    const min = document.createElement('div');
    const max = document.createElement('div');
    const timeDiv = document.createElement('div');
    const weatherDiv = document.createElement('div');
    const tempDiv = document.createElement('div');

    timeDiv.appendChild(weekday).classList.add('daily-day');
    timeDiv.appendChild(date).classList.add('daily-date');
    weatherDiv.appendChild(icon).classList.add('daily-icon');
    weatherDiv.appendChild(title).classList.add('daily-title');
    weatherDiv.appendChild(desc).classList.add('daily-desc');
    tempDiv.appendChild(min).classList.add('daily-min');
    tempDiv.appendChild(max).classList.add('daily-max');
    card.appendChild(timeDiv).classList.add('time-div');
    card.appendChild(weatherDiv).classList.add('weather-div');
    card.appendChild(tempDiv).classList.add('temp-div');
    forecastDaily.appendChild(card).classList.add('daily-card');

    //Get the values for each card

    let storeDay = fromUnixTime(day.dt + weather.timezone_offset - 7200);
    storeDay = storeDay.toString();
    weekday.textContent = storeDay.slice(0, 4);
    const storeDate = storeDay.split(' ');
    date.textContent = `${storeDate[2]} ${storeDate[1]} ${storeDate[3]} `;
    const imgId = day.weather[0].icon;
    icon.src = getIcon(imgId);
    title.textContent = day.weather[0].main;
    desc.textContent = day.weather[0].description;
    let stringTemp = `${day.temp.min}, ${day.temp.max}`;
    stringTemp = stringTemp.split(',');
    const minTemp = stringTemp[0].split('.');
    const maxTemp = stringTemp[1].split('.');
    min.textContent = `min :  ${minTemp[0]} ° C`;
    max.textContent = `max :  ${maxTemp[0]} ° C`;

    if (min.textContent.includes('-0')) min.textContent = `min :  0 ° C`;
    if (max.textContent.includes('-0')) max.textContent = `max :  0 ° C`;
  });
}
