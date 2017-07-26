var location = document.getElementById("");
var weatherIcon = document.getElementById("");
var button = document.getElementById("test-button");
$(document).ready(function(){
    button.addEventListener("click", getLocationWeather(35, 127));
});

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
    console.log(JSON.stringify(response));
}

function errorHandler(jqXHR, textStatus, errorThrown ){

}