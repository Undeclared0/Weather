let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let weather_date = document.querySelector('.weather_date');
let weather_day = document.querySelector('.weather_day');
let climate = document.getElementById("climate");
let var_date = new Date();
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const apiID = '2c15ca7a4523d434a9872a7fdf30f4cb';

let var_dt = Math.round((var_date.getTime())/1000);

searchButton.addEventListener('click', (e) => {

    e.preventDefault();
    getWeather(searchInput.value);
    // searchInput.blur(function () {
    //   if (searchInput.val() == 0) {
    //     searchInput.val('  Enter City Name ')
    //   }
    // })
    searchInput.value = '';


});



const getWeather = async (city) => {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}`,

            { mode: 'cors' }
        );

        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        const { country } = weatherData.sys;

        loc.textContent = name+', '+country;
        searchInput.value = loc.textContent;
        climate.textContent = main;
        weather_date.innerHTML = set_Date(var_date);
        weather_day.innerHTML = set_Day();
        tempvalue.textContent = Math.round(feels_like - 273);
        if (id < 300 && id > 200) {
            tempicon.src = "thunderstorm.svg"
        }
        else if (id < 400 && id > 300) {
            tempicon.src = "sun.svg"
        }
        else if (id < 600 && id > 500) {
            tempicon.src = "rain.svg"
        }
        else if (id < 700 && id > 600) {
            tempicon.src = "snowflake.svg"
        }
        else if (id < 800 && id > 700) {
            tempicon.src = "clouds.svg"
        }
        else if (id == 800) {
            tempicon.src = "clouds-and-sun.svg"
        }




    }
    catch (error) {
        alert('city not found!');
    }





};


window.addEventListener('load', () => {
  let long
  let lat

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude
      lat = position.coords.latitude
      const proxy = 'https://cors-anywhere.herokuapp.com/'

      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiID}`

      fetch(api)
        .then((response) => {
          return response.json()
        })

        .then((data) => {
          const { name } = data
          const { feels_like } = data.main
          const { id, main } = data.weather[0]
          const { country } = data.sys

          loc.textContent = name + ', ' + country
          searchInput.value = name + ', ' + country
          climate.textContent = main
          weather_date.innerHTML = set_Date(var_date)
          weather_day.innerHTML = set_Day()
          tempvalue.textContent = Math.round(feels_like - 273)
          if (id < 300 && id > 200) {
            tempicon.src = 'thunderstorm.svg'
          } else if (id < 400 && id > 300) {
            tempicon.src = 'sun.svg'
          } else if (id < 600 && id > 500) {
            tempicon.src = 'rain.svg'
          } else if (id < 700 && id > 600) {
            tempicon.src = 'snowflake.svg'
          } else if (id < 800 && id > 700) {
            tempicon.src = 'clouds.svg'
          } else if (id == 800) {
            tempicon.src = 'clouds-and-sun.svg'
          }

          console.log(data)
        })
    })
  }
})




function set_Date(display_date) {
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = monthNames[display_date.getMonth()] +' '+ display_date.getDate()+', '+display_date.getFullYear();
    return date;
}

function set_Day(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    let day = weekday[new Date().getDay()]
    return day;
}
