// define GLOBAL variables
var userAddress = document.querySelector("#user-address");
var selectRange = document.querySelector("#range-select");
var infoSubmitBtn = document.querySelector("#submit-btn");
var infoContainerEl = document.querySelector("#info-container");

// create function to trigger app functions
var initializeApp = function (e) {
    e.preventDefault();
    convertAddress();
    getRestaurants();
}

// create function to grab address from form and convert it into latitude and longitude
var convertAddress = function () {
    console.log("working");
    fetch('http://api.positionstack.com/v1/forward?access_key=ee94f47a6f59bccccb63518da296f930&query=' + userAddress.value + '&output=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            // put latitude and longitude into local storage
            localStorage.setItem("latitude", response.data[0].latitude);
            localStorage.setItem("longitude", response.data[0].longitude);
        });
}

// create function to grab range + preferred cuisine, make a fetch call using range, cuisine, and lat/lon
var getRestaurants = function () {
    // retrieve latitude and longitude from local storage
    var geoLat = localStorage.getItem("latitude");
    var geoLon = localStorage.getItem("longitude");
    // fetch data
    fetch("https://api.documenu.com/v2/restaurants/search/geo?key=337e793c7092becc4d3298568d6964ac&lat=" + geoLat + "&lon=" + geoLon + "&distance=" + selectRange.value + "&fullmenu")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // create variable for random restaurant
            var randomChoice = Math.floor(Math.random() * data.data.length);
            console.log(randomChoice);
            // display restaurant info on page
            var restaurantName = document.createElement("h2");
            restaurantName.innerHTML = data.data[randomChoice].restaurant_name;
            var restaurantPhone = document.createElement("h2");
            restaurantPhone.innerHTML = data.data[randomChoice].restaurant_phone
            var restaurantSite = document.createElement("h2");
            restaurantSite.innerHTML = data.data[randomChoice].restaurant_website;
            infoContainerEl.append(restaurantName, restaurantPhone, restaurantSite);
        })
}

// on submit, trigger function
infoSubmitBtn.addEventListener("click", initializeApp);