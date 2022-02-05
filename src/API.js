//Gets the user input and if it is a valid city it returns the longitude and latitude of the city

export async function getLocation(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=0ceca601b6ec492c48f648a360a26e03`);
    const format = await response.json();
    const longitude = format[0].lon;
    const latitude = format[0].lat;
    return { longitude, latitude };
  } catch (error) {
    console.error(error);
  }
}

export async function getWeather(lon, lat) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=0ceca601b6ec492c48f648a360a26e03`
    );

    const format = await response.json();
    const info = await format;
    return { info };
  } catch (err) {
    console.error(err);
  }
}
