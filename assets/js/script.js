var infoContainerEl = document.querySelector("#info-container");
var infoSubmitBtn = document.querySelector("#submit-btn");
var infoSubmitInput = document.querySelector("#search-term");



var createContent = function(e) {
    e.preventDefault();
    infoSubmitInput.value = "";
    var infoHeaderEl = document.createElement("h2");
    infoHeaderEl.innerHTML = "returned json object title";
    var infoDetailsEl = document.createElement("p");
    infoDetailsEl.textContent = "returned json object details"
    infoContainerEl.append(infoHeaderEl, infoDetailsEl);

}

infoSubmitBtn.addEventListener("click", createContent);