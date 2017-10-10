var APPID = "bfa78ec99ed99d642e5f3c7e5e106107";
var temp;
var humidity;
var loc;
var wind;
var pressure;
var icon;

// Global Variables

function update(weather) {
    temp.innerHTML = weather.temp;
    humidity.innerHTML = weather.humidity;
    loc.innerHTML = weather.loc;
    wind.innerHTML = weather.wind;
    pressure.innerHTML = weather.pressure;
    icon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png";
}

// Update of HTML elements to show in the browser

window.onload = function () {
    temp = document.getElementById('temp');
    humidity = document.getElementById('humidity');
    loc = document.getElementById('location');
    wind = document.getElementById('wind');
    pressure = document.getElementById('pressure');
    icon = document.getElementById('icon');
    updateByCity("Plovdiv");
}

// Default OnLoad parameters for the city of Plovdiv

function updateByCity(city) {
    var url ="http://api.openweathermap.org/data/2.5/weather?" +
      "q=" + city +
      "&APPID=" + APPID;
    sendRequest(url);
}

// URL formation for the API call

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.temp = Math.round(data.main.temp - 273.15);
            weather.humidity = data.main.humidity;
            weather.loc = data.name;
            weather.wind = data.wind.speed;
            weather.pressure = data.main.pressure;
            weather.icon = data.weather[0].icon;
            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// API call funtion itself

function onClick() {
    var change = document.getElementById('clicker');
    if (change.innerHTML === "to Fahrenheit/Imperial") {
        change.innerHTML = "to Celsius/Metric";
    } else {
        change.innerHTML = "to Fahrenheit/Imperial";
    }
}

// Button to switch between units

function showCity() {
    var city = document.getElementById('city');
    updateByCity(city.value);
}

// This is how it all executes, by searching for a city

function converter() {
    var changer = document.getElementById('clicker');
    var winder = document.getElementById('winder');
    var temper = document.getElementById('temper');
    var presser = document.getElementById('presser');
    if (changer.innerHTML === "to Fahrenheit/Imperial") {
        winder.innerHTML = " KmPH";
        temper.innerHTML = " °C";
        presser.innerHTML = " hPa";
    } else {
        winder.innerHTML = " MPH";
        temper.innerHTML = " °F";
        presser.innerHTML = " PSI";
    }
}

// Converting metric units when button is pressed

function c2f() {
    var cel = document.getElementById('temp').innerHTML;
    var units = document.getElementById('clicker').innerHTML;
    if (units === "to Celsius/Metric") {
        temp = cel * 100;
    } else {
        alert("putkata mi");
    }
}