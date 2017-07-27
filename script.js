var locatio = document.getElementById("location");
var pressur = document.getElementById("pressure");
var humidit = document.getElementById("humidity");
var weathe = document.getElementById("weather");
var minimumTemperature = document.getElementById("min-temp");
var maximumTemperature = document.getElementById("max-temp");
var weatherIcon = document.getElementById("weather-icon");
var temperatureLink = document.getElementById("temp-link");
var temperatureUnit = document.getElementById("temp-unit");


function geolocator(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, errorOnGeolocator);
    }
    else{
        console.log("Location services is not available");
    }
}

function showPosition(position){
    getLocationWeather(position.coords.latitude, position.coords.longitude);
}

function errorOnGeolocator(error){
    console.log("An error has occurred");
}

function getLocationWeather(latitude, longitude){
    $.ajax({
        datatype: "jsonp",
        jsonp: "jsonp",
        url: "https://fcc-weather-api.glitch.me/api/current",
        data:{
            lat: latitude,
            lon: longitude
        }
    })

    .done(update)
    .fail(errorHandler);
}

function update(response){
    if(response != null){
        console.log(response);
    locatio.innerText = response.name + ", " + response.sys.country;
    weathe.innerText = response.weather[0].main;
    weatherIcon.src = response.weather[0].icon;
    pressur.innerText = response.main.pressure;
    humidit.innerText = response.main.humidity;
    minimumTemperature.innerText = response.main.temp_min;
    maximumTemperature.innerText = response.main.temp_max;
}
else{
    console.log("No response from server");
}
    
}

function errorHandler(jqXHR, textStatus, errorThrown ){
    console.log("AJAX api failed and is not available");
}

function toFahrenheit(celsius){
    var number = ((9*celsius)/5)+32;
    return number.toFixed(2);
}

function toCelsius(fahrenheit){
    var number = (5*(fahrenheit-32))/9;
    return number.toFixed(2);
}

function tempLinkClicked(){
    if(temperatureUnit.innerHTML === "C"){
        minimumTemperature.innerHTML = toFahrenheit(minimumTemperature.innerHTML);
        maximumTemperature.innerHTML = toFahrenheit(maximumTemperature.innerHTML);
        temperatureUnit.innerHTML = "F";
    }
    else if(temperatureUnit.innerHTML === "F"){
        minimumTemperature.innerHTML = toCelsius(minimumTemperature.innerHTML);
        maximumTemperature.innerHTML = toCelsius(maximumTemperature.innerHTML);
        temperatureUnit.innerHTML = "C";
    }
}

$(document).ready(function(){
    geolocator();
    temperatureLink.addEventListener("click", tempLinkClicked);
});

