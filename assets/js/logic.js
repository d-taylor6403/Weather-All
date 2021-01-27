ethereum.autoRefreshOnNetworkChange = false;


let apiKey = "499ce56ad6a0c9b70ccec9e740631631";
let date = new Date();
let currentDate = date.toLocaleDateString();
let history = [];
let newCityBtn = $("#history");




function getSearchValue() {
    let city = $("input").val().trim();
    console.log(city);
    newCity(city)
    $("input").val(" ")
}



function newCity(city) {
    let cityEl = document.createElement("li");
    cityEl.setAttribute("class", "btn btn-block");
    cityEl.classList.add("history")
    cityEl.textContent = city;
    console.log(history);

    //Check history array for existing city. if history array is empty it will create new city without checking.
    //if history arr contains values it will check each to see if it exist. 
    //if it exist, it will log it and call populate weather
    //if it doesn't it will create new city
    console.log("checking history")
    console.log(history.length)
    if (history.length > 0) {

        console.log(history)
        console.log(city)

        if ((history.includes(city)) === true) {
            console.log("city already exist")
        } else {
            console.log("adding new city");
            newCityBtn.append(cityEl);
            populateWeather(city);
        };

    } else {
        console.log("history is blank")
        newCityBtn.append(cityEl);
        populateWeather(city)
    };
};


$("cityEl").on("click", function() {
    console.log(event.target.tagName)

    if (event.target.tagName == "LI") {
        populateWeather(event.target.textContent)
    }
});

function populateWeather(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            history.push(city);
            localStorage.setItem("history", JSON.stringify(history));


            //empty out <div> before appending current weather data
            $("#currentWeather").empty();

            //create html content for current weather

            let title = $("<h3>").addClass("card-title").text(data.name + "(" + currentDate + ")");
            let card = $("<div>").addClass("card");
            let wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            let humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            let tempHigh = $("<p>").addClass("card-text").text("High: " + data.main.temp_max + "°F");
            let tempLow = $("<p>").addClass("card-text").text("Low: " + data.main.temp_min + "°F");
            let cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            //append to page
            title.append(img);
            cardBody.append(title, tempHigh, tempLow, humid, wind);
            card.append(cardBody);
            $("#currentWeather").append(card);

        })
};










$("#searchButton").on("click", getSearchValue)

    //on click of btn-primary 
    //Check if localStorage already container value
    //if yes call populateWeather
    //if no call newCity


    // When populate weather is called, the openWeather api is hit and generated current forecast
    //then call UVIndex and fiveDayForecast


    //When newCity is called, a new item is created for the history and then populateWeather is called.
