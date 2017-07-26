var locatio = document.getElementById("location");
var pressur = document.getElementById("pressure");
var humidit = document.getElementById("humidity");
var weathe = document.getElementById("weather");
var temperatur = document.getElementById("temperature");
var weatherIcon = document.getElementById("weather-icon");

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
    console.log(response);
    locatio.innerText = response.name;
    weathe.innerText = response.weather[0].main;
    weatherIcon.src = response.weather[0].icon;
    pressur.innerText = response.main.pressure;
    humidit.innerText = response.main.humidity;
    temperatur.innerText = response.main.temp;
}

function errorHandler(jqXHR, textStatus, errorThrown ){
    console.log("AJAX api failed and is not available");
}

$(document).ready(function(){
    geolocator();
});
