$("#weather-div").hide();

var allCities = JSON.parse(localStorage.getItem("cityHistory"));

if (localStorage.getItem("cityHistory") === null) {
  allCities = [];
}


console.log(allCities);

// if (localStorage.getItem("cityHistory")) {
// };



$("#recent-list").on("click", ".past-city", function () { });

$("#clear").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  $("#recent-list").text("");
});

$(document).on("click", ".search-input, .past-city", function (event) {
  event.preventDefault();
  
  for (var i = 0; i < allCities.length; i++) {
    if (allCities[i] != null) {
      $("#recent-list").prepend('<button class="past-city list-group list-group-flush data-name="' + allCities[i] + '">' + allCities[i] + '</p>');
    };
  };
  
  var searchCity = "";
  if ($(this).hasClass("past-city")) {
    searchCity = $(this).attr("data-name");
  }
  else {
    searchCity = $("#search-input").val();
  }

  localStorage.setItem("newCity", searchCity);

  if (allCities.indexOf(searchCity) < 0) {
    if (searchCity != "") {
      allCities.push(searchCity);
      localStorage.setItem("cityHistory", JSON.stringify(allCities));
      $("#recent-list").prepend(`<button class="btn btn-primary past-city list-group list-group-flush data-name=" ${allCities[i]}">${allCities[i]} </>`);
    }
  }

  function timeToDisplay() {
    $("#weather-div").show();
    if (searchCity != "") {

      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial" + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";

      // AJAX call to OpenWeatherMap API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          // console.log(queryURL);
          // console.log(response);

          // searchCity Display --------------------------------------------------------

          $("#searchCityDisplay").text(searchCity.charAt(0).toUpperCase() +
            searchCity.slice(1));

          // Icon
          var searchCityIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
          $("#searchCityIcon").attr("src", searchCityIcon);

          // Temp
          var searchCityTemp = Math.floor(response.main.temp);
          $("#searchCityTemp").text("Current Temp. " + searchCityTemp + "°F");

          // Wind Speed
          var searchCityWindSpeed = Math.floor(response.wind.speed);
          $("#searchCityWindSpeed").text("Wind Speed " + searchCityWindSpeed + "mph");

          // UV Index 
          var lat = response.coord.lat;
          var lon = response.coord.lon;
          var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";
          $.ajax({
            url: uvURL,
            method: "GET"
          })
            .then(function (uvRes) {
              $("#searchCityUVIndex").text(uvRes.value);
              if (uvRes.value >= 0 && uvRes.value < 3) {
                $("#searchCityUVIndex").css("color", "#3ea72d");
              } else if (uvRes.value >= 3 && uvRes.value < 6) {
                $("#searchCityUVIndex").css("color", "#FFF300");
              } else if (uvRes.value >= 6 && uvRes.value < 8) {
                $("#searchCityUVIndex").css("color", "#f18b00");
              } else if (uvRes.value >= 8 && uvRes.value < 11) {
                $("#searchCityUVIndex").css("color", "#e53210");
              } else if (uvRes.value >= 11) {
                $("#searchCityUVIndex").css("color", "#b567a4");
              }

            });

          // Hum
          var searchCityHum = Math.floor(response.main.humidity);
          $("#searchCityHum").text("Current Humidity " + searchCityHum + "%");

          // Date
          var searchCityDate = moment().format("MM/DD/YYYY");
          $("#searchCityDate").text(searchCityDate);


          // 5 day forecast ---------------------------------------------------------

          function fiveDay() {
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial" + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";

            $.ajax({
              url: fiveDayURL,
              method: "GET"
            })
              .then(function (fiveDayRes) {

                // console.log(fiveDayRes);

                // 1st day
                $("#fiveIcon1").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[4].weather[0].icon + ".png");
                $("#fiveTemp1").text(Math.floor(fiveDayRes.list[4].main.temp) + "°F");
                $("#fiveHum1").text("Hum. " + Math.floor(fiveDayRes.list[4].main.humidity) + "%");
                $("#fiveDate1").text(moment().format("MM/DD/YYYY"));

                // 2nd day
                $("#fiveIcon2").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[12].weather[0].icon + ".png");
                $("#fiveTemp2").text(Math.floor(fiveDayRes.list[12].main.temp) + "°F");
                $("#fiveHum2").text("Hum. " + Math.floor(fiveDayRes.list[12].main.humidity) + "%");
                $("#fiveDate2").text(moment().add(1, "days").format("MM/DD/YYYY"));

                // 3rd day
                $("#fiveIcon3").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[20].weather[0].icon + ".png");
                $("#fiveTemp3").text(Math.floor(fiveDayRes.list[20].main.temp) + "°F");
                $("#fiveHum3").text("Hum. " + Math.floor(fiveDayRes.list[20].main.humidity) + "%");
                $("#fiveDate3").text(moment().add(2, "days").format("MM/DD/YYYY"));

                // 4th day
                $("#fiveIcon4").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[28].weather[0].icon + ".png");
                $("#fiveTemp4").text(Math.floor(fiveDayRes.list[28].main.temp) + "°F");
                $("#fiveHum4").text("Hum. " + Math.floor(fiveDayRes.list[28].main.humidity) + "%");
                $("#fiveDate4").text(moment().add(3, "days").format("MM/DD/YYYY"));

                // 5th day
                $("#fiveIcon5").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[36].weather[0].icon + ".png");
                $("#fiveTemp5").text(Math.floor(fiveDayRes.list[36].main.temp) + "°F");
                $("#fiveHum5").text("Hum. " + Math.floor(fiveDayRes.list[36].main.humidity) + "%");
                $("#fiveDate5").text(moment().add(4, "days").format("MM/DD/YYYY"));

              });
          };
          fiveDay();
        });
    }
    else {
      alert("Please enter a city.");
    };
  };
  timeToDisplay();
});


$(window).on("load", function () {
  var searchCity = localStorage.getItem("newCity");


  function timeToDisplay() {
    $(".weather-div").show();
    if (searchCity != "") {


      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial" + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";

      // AJAX call to OpenWeatherMap API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          // console.log(queryURL);
          // console.log(response);

          // searchCity Display --------------------------------------------------------

          $("#searchCityDisplay").text(searchCity.charAt(0).toUpperCase() +
            searchCity.slice(1));

          // Icon
          var searchCityIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
          $("#searchCityIcon").attr("src", searchCityIcon);

          // Temp
          var searchCityTemp = Math.floor(response.main.temp);
          $("#searchCityTemp").text("Current Temp. " + searchCityTemp + "°F");

          // Wind Speed
          var searchCityWindSpeed = Math.floor(response.wind.speed);
          $("#searchCityWindSpeed").text("Wind Speed " + searchCityWindSpeed + "mph");

          // UV Index 
          var lat = response.coord.lat;
          var lon = response.coord.lon;
          var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";
          $.ajax({
            url: uvURL,
            method: "GET"
          })
            .then(function (uvRes) {
              $("#searchCityUVIndex").text(uvRes.value);
              if (uvRes.value >= 0 && uvRes.value < 3) {
                $("#searchCityUVIndex").css("color", "#3ea72d");
              } else if (uvRes.value >= 3 && uvRes.value < 6) {
                $("#searchCityUVIndex").css("color", "#FFF300");
              } else if (uvRes.value >= 6 && uvRes.value < 8) {
                $("#searchCityUVIndex").css("color", "#f18b00");
              } else if (uvRes.value >= 8 && uvRes.value < 11) {
                $("#searchCityUVIndex").css("color", "#e53210");
              } else if (uvRes.value >= 11) {
                $("#searchCityUVIndex").css("color", "#b567a4");
              }

            });

          // Hum
          var searchCityHum = Math.floor(response.main.humidity);
          $("#searchCityHum").text("Current Humidity " + searchCityHum + "%");

          // Date
          var searchCityDate = moment().format("MM/DD/YYYY");
          $("#searchCityDate").text(searchCityDate);


          // 5 day forecast ---------------------------------------------------------

          function fiveDay() {
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial" + "&appid=f08f6b97b32d49e126f1db9e273b1c5d";

            $.ajax({
              url: fiveDayURL,
              method: "GET"
            })
              .then(function (fiveDayRes) {

                // console.log(fiveDayRes);

                // 1st day
                $("#fiveIcon1").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[4].weather[0].icon + ".png");
                $("#fiveTemp1").text(Math.floor(fiveDayRes.list[4].main.temp) + "°F");
                $("#fiveHum1").text("Hum. " + Math.floor(fiveDayRes.list[4].main.humidity) + "%");
                $("#fiveDate1").text(moment().format("MM/DD/YYYY"));

                // 2nd day
                $("#fiveIcon2").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[12].weather[0].icon + ".png");
                $("#fiveTemp2").text(Math.floor(fiveDayRes.list[12].main.temp) + "°F");
                $("#fiveHum2").text("Hum. " + Math.floor(fiveDayRes.list[12].main.humidity) + "%");
                $("#fiveDate2").text(moment().add(1, "days").format("MM/DD/YYYY"));

                // 3rd day
                $("#fiveIcon3").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[20].weather[0].icon + ".png");
                $("#fiveTemp3").text(Math.floor(fiveDayRes.list[20].main.temp) + "°F");
                $("#fiveHum3").text("Hum. " + Math.floor(fiveDayRes.list[20].main.humidity) + "%");
                $("#fiveDate3").text(moment().add(2, "days").format("MM/DD/YYYY"));

                // 4th day
                $("#fiveIcon4").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[28].weather[0].icon + ".png");
                $("#fiveTemp4").text(Math.floor(fiveDayRes.list[28].main.temp) + "°F");
                $("#fiveHum4").text("Hum. " + Math.floor(fiveDayRes.list[28].main.humidity) + "%");
                $("#fiveDate4").text(moment().add(3, "days").format("MM/DD/YYYY"));

                // 5th day
                $("#fiveIcon5").attr("src", "https://openweathermap.org/img/w/" + fiveDayRes.list[36].weather[0].icon + ".png");
                $("#fiveTemp5").text(Math.floor(fiveDayRes.list[36].main.temp) + "°F");
                $("#fiveHum5").text("Hum. " + Math.floor(fiveDayRes.list[36].main.humidity) + "%");
                $("#fiveDate5").text(moment().add(4, "days").format("MM/DD/YYYY"));

              });
          };
          fiveDay();
        });
    }

  };
  timeToDisplay();

});