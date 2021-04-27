// define GLOBAL variables
var userAddress = document.querySelector("#user-address");
var selectRange = document.querySelector("#range-select");
var infoSubmitBtn = document.querySelector("#submit-btn");
var infoContainerEl = document.querySelector("#info-container");



// create function to trigger app functions
var initializeApp = function () {
    convertAddress();
    getRestaurants();
}

// create function to grab address from form and convert it into latitude and longitude
var convertAddress = function (e) {
    e.preventDefault();
    console.log("working");
    fetch('http://api.positionstack.com/v1/forward?access_key=ee94f47a6f59bccccb63518da296f930&query=' + userAddress.value + '&output=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            var latCoordinate = document.createElement("p");
            latCoordinate.innerHTML = response.data[0].latitude;
            var lonCoordinate = document.createElement("p");
            lonCoordinate.innerHTML = response.data[0].longitude;
            infoContainerEl.append(latCoordinate, lonCoordinate);
            
        });
}

// create function to grab range + preferred cuisine, make a fetch call using range, cuisine, and lat/lon
var getRestaurants = function () {

}


// create function to display the restaurant on the page
var createContent = function (e) {
    e.preventDefault();
    userAddress.value = "";
    var infoHeaderEl = document.createElement("h2");
    infoHeaderEl.innerHTML = "restaurant name";
    var infoDetailsEl = document.createElement("p");
    infoDetailsEl.textContent = "details: phone #, website link, menu optionss"
    infoContainerEl.append(infoHeaderEl, infoDetailsEl);

}





fetch("https://api.documenu.com/v2/restaurants/search/geo?key=337e793c7092becc4d3298568d6964ac&lat=33.445922&lon=-111.774391&distance=5&fullmenu&cuisine=American")
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
})

// on submit, trigger function
infoSubmitBtn.addEventListener("click", convertAddress);