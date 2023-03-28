const weatherBox = document.getElementById('weather-box')
const cityNameInput = document.getElementById('city-name-input')
const searchButton = document.getElementById('search-button')


const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = ""

    let label = document.createElement("h3")
    label.textContent = cityName
    weatherBox.append(label)

    let areaName =  json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    weatherBox.append(area)

    let regionName = json.nearest_area[0].region[0].value
    let region  = document.createElement('li')
    region.className = `weather-box-item`
    region.innerHTML = `<strong>Region:</strong> ${regionName}`
    weatherBox.append(region)

    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement('li')
    country.className = `weather-box-item`
    country.innerHTML = `<strong>Country:</strong> ${countryName}`
    weatherBox.append(country)

    let temperatureValue = json.current_condition[0].FeelsLikeF
    let temperature = document.createElement('li')
    temperature.className = `weather-box-item`
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}°F`
    weatherBox.append(temperature)


    let avgTemperatureToday = json.weather[0].avgtempF
    let avgTemperatureTomorrow = json.weather[1].avgtempF
    let avgTemperatureTwoDaysOut = json.weather[2].avgtempF

    let maxTemperatureToday = json.weather[0].maxtempF
    let maxTemperatureTomorrow = json.weather[1].maxtempF
    let maxTemperatureTwoDaysOut = json.weather[2].maxtempF

    let minTemperatureToday = json.weather[0].mintempF
    let minTemperatureTomorrow = json.weather[1].mintempF
    let minTemperatureTwoDaysOut = json.weather[2].mintempF

    let avgTemperatureTodayC = json.weather[0].avgtempC
    let avgTemperatureTomorrowC = json.weather[1].avgtempC
    let avgTemperatureTwoDaysOutC = json.weather[2].avgtempC

    let maxTemperatureTodayC = json.weather[0].maxtempC
    let maxTemperatureTomorrowC = json.weather[1].maxtempC
    let maxTemperatureTwoDaysOutC = json.weather[2].maxtempC

    let minTemperatureTodayC = json.weather[0].mintempC
    let minTemperatureTomorrowC = json.weather[1].mintempC
    let minTemperatureTwoDaysOutC = json.weather[2].mintempC


    let todayElement = document.getElementById("today")
    let tomorrowElement = document.getElementById("tomorrow")
    let dayAfterTomorrowElement = document.getElementById("day-after-tomorrow")


    todayElement.innerHTML = `Today <br><br><strong>Avg Temperature:</strong> ${avgTemperatureToday}°F <strong>|</strong> ${avgTemperatureTodayC}°C <br><br> <strong>Max Temperature:</strong> ${maxTemperatureToday}°F <strong>|</strong> ${maxTemperatureTodayC}°C <br><br>  <strong>Min Temperature:</strong> ${minTemperatureToday}°F <strong>|</strong> ${minTemperatureTodayC}°C`
   
    tomorrowElement.innerHTML = `Tomorrow <br><br><strong>Avg Temperature:</strong> ${avgTemperatureTomorrow}°F <strong>|</strong> ${avgTemperatureTomorrowC}°C <br><br> <strong>Max Temperature:</strong> ${maxTemperatureTomorrow}°F <strong>|</strong> ${maxTemperatureTomorrowC}°C <br><br>  <strong>Min Temperature:</strong> ${minTemperatureTomorrow}°F <strong>|</strong> ${minTemperatureTomorrowC}°C`
   
    dayAfterTomorrowElement.innerHTML = `Day After Tomorrow <br><br><strong>Avg Temperature:</strong> ${avgTemperatureTwoDaysOut}°F <strong>|</strong> ${avgTemperatureTwoDaysOutC}°C <br><br> <strong>Max Temperature:</strong> ${maxTemperatureTwoDaysOut}°F <strong>|</strong> ${maxTemperatureTwoDaysOutC} <br><br>  <strong>Min Temperature:</strong> ${minTemperatureTwoDaysOut}°F <strong>|</strong> ${minTemperatureTwoDaysOutC}`



const addPreviousSearch = (cityName, temperature) => {
    let previousSearchesList = document.querySelector(".previous-searches-list")
    let updatePrevious = document.createElement("li")
    updatePrevious.textContent = `${cityName} - Feels like ${temperature}°F`
    previousSearchesList.append(updatePrevious)
    let noPreviousSearches = document.querySelector(".no-previous-searches")
    if(noPreviousSearches){
        noPreviousSearches.remove()
    }
}

addPreviousSearch(cityName, temperatureValue)
   
}

if (searchButton) {
    searchButton.addEventListener('click', event => {
      let cityName = cityNameInput.value
      cityNameInput.value = ""

      let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)

      receivedPromise.then(response => {
        return response.json()
      }).then(json => {
        fillWeatherBox(json, cityName)
      }).catch(error => {
        console.error(error)
      })
    })
}

//makes the enter key a functional input
if (cityNameInput) {
  cityNameInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
          let cityName = cityNameInput.value;
          cityNameInput.value = "";

          let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`);

          receivedPromise.then((response) => {
              return response.json();
          }).then((json) => {
              fillWeatherBox(json, cityName);
          }).catch((error) => {
              console.error(error);
          });
      }
  });
}

// change the colors of the h1 on each page load
const randomColor = () => {
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16)
  }
  return color
}

window.addEventListener('load', () => {
  let h1 = document.querySelector('.upper-box h1')
  let letters = h1.textContent.split('')
  h1.innerHTML = ''
  letters.forEach(letter => {
    let span = document.createElement('span')
    span.textContent = letter
    span.style.color = randomColor()
    h1.append(span)
  })
})

// Only first letter of city input is capitalized and the rest of the letters are lowercase
cityNameInput.addEventListener('change', () => {
  let cityName = cityNameInput.value.toLowerCase()
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1)
  cityNameInput.value = cityName
})


