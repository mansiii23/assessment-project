window.onload = function() {
	//variables			
	var appid = "APPID=8c93d7f78e9cbbec1918b5a3e5014bd1";	
	var currentDate = new Date();
	var dayNight = "day";	

	//setting the date
	var dateElem = document.getElementById("date");
	dateElem.innerHTML = currentDate.toDateString();
	var weatherApi=`https://api.openweathermap.org/data/2.5/weather?q=Toronto&${appid}`;
	httpReqWeatherAsync(weatherApi);
	//calling ipinfo.io/json function
	
	//request to openweathermap json
	function httpReqWeatherAsync(url, callback) {
		var httpReqWeather = new XMLHttpRequest();
		httpReqWeather.open("GET", url, true);
		httpReqWeather.onreadystatechange = function() {
			if(httpReqWeather.readyState == 4 && httpReqWeather.status == 200) {
				var jsonWeather = JSON.parse(httpReqWeather.responseText);
				console.log(jsonWeather)
				var weatherDesc = jsonWeather.weather[0].description;
				var id = jsonWeather.weather[0].id;
				var icon = `<i class="wi wi-owm-${id}"></i>`
				var temperature = jsonWeather.main.temp;
				var tempFaren = Math.round(1.8 * (temperature - 273) + 32)
				
				var humidity = jsonWeather.main.humidity;
				var windSpeed = jsonWeather.wind.speed; 
				
				var visibility = Math.round(jsonWeather.visibility / 1000);
				

				//find whether is day or night
				var sunSet = jsonWeather.sys.sunset;
				//sunset is 10 digits and currentDate 13 so div by 1000
				var timeNow = Math.round(currentDate / 1000);
				console.log(timeNow + "<" + sunSet +" = "+(timeNow < sunSet))
				dayNight = (timeNow < sunSet) ? "day" : "night";
				//insert into html page
				var description = document.getElementById("description");
				description.innerHTML = `<i id="icon-desc" class="wi wi-owm-${dayNight}-${id}"></i><p>${weatherDesc}</p>`;
				var tempElement = document.getElementById("temperature");
				tempElement.innerHTML = `${tempFaren}<i id="icon-thermometer" class="wi wi-thermometer"></i>`	;
				var humidityElem = document.getElementById("humidity");
				humidityElem.innerHTML = `${humidity}%`;
				var windElem = document.getElementById("wind");
				windElem.innerHTML = `${windSpeed}m/h`;
				var visibilityElem = document.getElementById("visibility");
				visibilityElem.innerHTML = `${visibility} miles`;
			}
		}
		httpReqWeather.send();
	}							
}