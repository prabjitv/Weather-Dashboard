$(".search-input").on("click", function (event) {
  event.preventDefault();
  var newCitySearch = $("#search-input").val();

  console.log(newCitySearch);

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCitySearch + "&units=imperial" + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);


      // newCity Display

      $("#newCityDisplay").text(newCitySearch.charAt(0).toUpperCase() + 
      newCitySearch.slice(1));

      // Icon

      var newCityIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      $("#newCityIcon").attr("src", newCityIcon);

      // Temp
      var newCityTemp = Math.floor(response.main.temp);
      console.log(newCityTemp);
      $("#newCityTemp").text("Current Temp. " + newCityTemp + "°F");

      // Wind Speed

      var newCityWindSpeed = Math.floor(response.wind.speed);
      console.log(newCityWindSpeed);
      $("#newCityWindSpeed").text("Wind Speed " + newCityWindSpeed + "mph");

      // UV Index ???

      // Hum
      var newCityHum = Math.floor(response.main.humidity);
      console.log(newCityHum);
      $("#newCityHum").text("Current Humidity " + newCityHum + "%");

      // Date
      var newCityDate = moment().format("MM/DD/YYYY");
      console.log(newCityDate);
      $("#newCityDate").text(newCityDate);

    });
})




