fetch('https://wttr.in/?format=j1')
    .then(response => response.json())
    .then(json => fillWeatherBox(json, "Montreal"))

function fillWeatherBox(json, cityName) {
    const weatherBox = document.getElementById("weather-box")
    weatherBox.innerHTML = `
        <h3>${cityName}</h3>
        <li class='weather-box-item'><strong>Area:</strong> ${json.nearest_area[0].areaName[0].value}</li>
        <li class='weather-box-item'><strong>Region:</strong> ${json.nearest_area[0].region[0].value}</li>
        <li class='weather-box-item'><strong>Country:</strong> ${json.nearest_area[0].country[0].value}</li>
        <li class='weather-box-item'><strong>Currently:</strong> Feels like ${json.current_condition[0].FeelsLikeF}°F</li>
    `
}