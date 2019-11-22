let appId ='8c93d7f78e9cbbec1918b5a3e5014bd1';
let units ='imperial';
let searchMethod = 'zip';

function getSearchMethod(searchTerm){
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' ===searchTerm)
    searchMethod ='zip';
  else
    searchMethod ='q';
}

function searchWeather(searchTerm){
  getSearchMethod(searchTerm);
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
    return result.json();
  }).then(result =>{
     init(result);
  })

}

function init(resultFromServer){
  switch(resultFromServer.weather[0].main){
    case 'Clear':
       document.body.style.backgroundImage ='url("images/clear.jpg")';
       break;

    case 'Clouds':
       document.body.style.backgroundImage ='url("images/cloudy.jpg")';
       break;

    case 'Rain':
    case'Drizzle':
    case 'Mist':
        document.body.style.backgroundImage ='url("images/rain.jpg")';
        break;

    case 'Thunderstorm':
        document.body.style.backgroundImage ='url("images/storm.jpg")';
        break;

    case 'Snow':
        document.body.style.backgroundImage ='url("images/snow.jpg")';
        break;

    default:
        break;
  }

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src = 'https://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
  let resultDescription =resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML =Math.floor(resultFromServer.main.temp) + '&#176';
  windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML ='Humidity levels at ' +resultFromServer.main.humidity + '%';

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth= weatherContainer.clientWidth;

  weatherContainer.style.left =`calc(50% - ${weatherContainerWidth/2}px)`;
  weatherContainer.style.top =`calc(50% -${weatherContainerHeight/0.5}px)`;
  weatherContainer.style.visibility = 'visible';
}


document.getElementById('searchBtn').addEventListener('click',() => {
  let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm)
    searchWeather(searchTerm);
})