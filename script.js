$(".search-input").on("click", function (event) {
  event.preventDefault();
  var newCitySearch = $("#search-input").val();

  console.log(newCitySearch);

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCitySearch + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";

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
    });
})




