// define GLOBAL variables
var userAddress = document.querySelector("#user-address");
var selectRange = document.querySelector("#range-select");
var infoSubmitBtn = document.querySelector("#submit-btn");
var infoContainerEl = document.querySelector("#info-container");
var previousRecommendations = document.querySelector("#previous-recommendations")

// create function to trigger app functions
var initializeApp = function (e) {
    e.preventDefault();
    infoContainerEl.innerHTML = "";
    convertAddress();
    getRestaurants();
}

// create function to grab address from form and convert it into latitude and longitude
var convertAddress = function () {
    console.log("working");
    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=2Kv1V0Uxm90yjYNLeEq2Yy0fnQ715KOG&location=" + userAddress.value)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response.results[0].locations[0].displayLatLng.lat);
            // put latitude and longitude into local storage
            localStorage.setItem("latitude", response.results[0].locations[0].displayLatLng.lat);
            localStorage.setItem("longitude", response.results[0].locations[0].displayLatLng.lng);
        });
}

// create function to grab range + preferred cuisine, make a fetch call using range, cuisine, and lat/lon
var getRestaurants = function () {
    // retrieve latitude and longitude from local storage
    var geoLat = localStorage.getItem("latitude");
    var geoLon = localStorage.getItem("longitude");
    // fetch data
    fetch("https://api.documenu.com/v2/restaurants/search/geo?key=ea209cb4b01eac83d95edb06c142fae8&lat=" + geoLat + "&lon=" + geoLon + "&distance=" + selectRange.value + "&fullmenu")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // create variable for random restaurant
            var randomChoice = Math.floor(Math.random() * data.data.length);
            console.log(randomChoice);
            var choice = data.data[randomChoice];
            // display restaurant info on page
            var recDivEl = document.createElement("div");
            recDivEl.setAttribute("class", "recommendation");
            var restaurantName = document.createElement("h4");
            restaurantName.setAttribute("class", "card-title");
            restaurantName.innerHTML = choice.restaurant_name;
            var restaurantType = document.createElement("h4");
            restaurantType.innerHTML = choice.cuisines;
            var restaurantPhone = document.createElement("h4");
            restaurantPhone.innerHTML = choice.restaurant_phone
            var restaurantAddress = document.createElement("h4");
            restaurantAddress.innerHTML = choice.address.street;
            var saveRecBtn = document.createElement("button");
            saveRecBtn.setAttribute("class", "save-btn");
            saveRecBtn.innerHTML = "<h5>Save<i class='fas fa-bookmark'></i></h5>";
            var nextRecBtn = document.createElement("button");
            nextRecBtn.setAttribute("class", "next-btn");
            nextRecBtn.innerHTML = "<h5>Next<i class='fas fa-angle-right fa-lg'></i></h5>";
            recDivEl.append(restaurantName, restaurantType, restaurantPhone, restaurantAddress, saveRecBtn, nextRecBtn);
            infoContainerEl.appendChild(recDivEl);
            var recommendationObject = {
                name: choice.restaurant_name,
                phone: choice.restaurant_phone,
                address: choice.address.street
            };
            localStorage.setItem("previousRec", JSON.stringify(recommendationObject));
            saveRecBtn.addEventListener("click", populatePreviousRecs);
            nextRecBtn.addEventListener("click", searchAgain);

        })
}

// create function to search again
var searchAgain = function() {
    infoContainerEl.innerHTML = "";
    getRestaurants();
}

// create function to put recommendation in sidebar
var populatePreviousRecs = function() {
    var recommendationObject = JSON.parse(localStorage.getItem("previousRec"));
    var recommendationCard = document.createElement("div");
    recommendationCard.setAttribute("class", "saved-recommendation");
    var previousRecName = document.createElement("h4");
    previousRecName.innerHTML = recommendationObject.name;
    var previousRecPhone = document.createElement("h4");
    previousRecPhone.innerHTML = recommendationObject.phone;
    var previousRecAddress = document.createElement("h4");
    previousRecAddress.innerHTML = recommendationObject.address;
    recommendationCard.append(previousRecName, previousRecPhone, previousRecAddress);
    previousRecommendations.appendChild(recommendationCard);
    
}


// on submit, trigger function
infoSubmitBtn.addEventListener("click", initializeApp)
