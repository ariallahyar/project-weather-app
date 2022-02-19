const cityOptions= document.getElementById('city')
const stockholmUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const bangkokUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=13.73&lon=100.31&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const seattleUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.60&lon=-122.33&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const torontoUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=43.65&lon=-79.34&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const currentWeatherCondition = document.getElementById('currentWeatherCondition')
const currentWeatherSunrise = document.getElementById('currentWeatherSunrise')
const currentWeatherSunset = document.getElementById('currentWeatherSunset')
const iconCloud = document.getElementById('iconCloud')
const iconUmbrella = document.getElementById('iconUmbrella')
const iconGlasses = document.getElementById('iconSunglasses')
const headerMessage = document.getElementById('currentWeatherHeader')
const forecastWrapper = document.getElementById('forecastWrapper')
const welcome = document.getElementById('welcome')

cityOptions.addEventListener('change', () => { 
    headerMessage.style.animation = "none";
    headerMessage.offsetHeight; /*trigger reflow*/
    headerMessage.style.animation = null;
    if(cityOptions.value == "Bangkok") {
        bangkok()
    } else if (cityOptions.value == "Seattle") {
        seattle()
    } else if (cityOptions.value == "Toronto"){
        toronto()
    } else {
        stockholm()
    }
} ) 

const stockholm = () => {
    fetch(stockholmUrl)
        .then((result) => {
            return result.json(); // returns a promise that something will happen
        })
        .then((data) => {
    
        let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
        updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready
    
        let forecast = formatForecast(data); // calls function with the data the promise delivers
        updateForecastDisplay(forecast); // updates display when data is ready
    
        })
        .catch((error) => {
            console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
        });
    }

const bangkok = () => {
    fetch(bangkokUrl)
    .then((result) => {
        return result.json()
    })
    .then((data) => {

        let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
        updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

        let forecast = formatForecast(data); // calls function with the data the promise delivers
        updateForecastDisplay(forecast); // updates display when data is ready

    })
    .catch((error) => {
        console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
    });
}

const seattle= () => {
    fetch(seattleUrl)
    .then((result) => {
        return result.json()
    })
    .then((data) => {

        let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
        updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

        let forecast = formatForecast(data); // calls function with the data the promise delivers
        updateForecastDisplay(forecast); // updates display when data is ready

    })
    .catch((error) => {
        console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
    });
}

const toronto= () => {
    fetch(torontoUrl)
    .then((result) => {
        return result.json()
    })
    .then((data) => {

        let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
        updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

        let forecast = formatForecast(data); // calls function with the data the promise delivers
        updateForecastDisplay(forecast); // updates display when data is ready

    })
    .catch((error) => {
        console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
    });
}

const formatCurrentWeather = (data) => {

    let currentWeather = {
        condition: 'string',
        temp: '0°',
        sunrise: '00:00',
        sunset: '00:00',
    }

    currentWeather.condition = data.current.weather[0].main;
    currentWeather.temp = Math.round(data.current.temp) + "°"; // rounds to nearest integer

    let sunrise = new Date(data.current.sunrise * 1000); // converts unix timestamp to milliseconds
    let sunset = new Date(data.current.sunset * 1000); // converts unix timestamp to milliseconds
    currentWeather.sunrise = sunrise.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}) // displays HH:MM in the correct timezone
    currentWeather.sunset = sunset.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}) // displays HH:MM in the correct timezone

    return currentWeather;
};

const formatForecast = (data) => {

    let forecast = [];

    data.daily.forEach((day) => {
        let dailyForecast = {
            dayOfWeek: new Date(day.dt * 1000).toLocaleDateString("en-SE", {weekday: 'long'}), // converts number to english name
            lowTemp: Math.round(day.temp.min) + "°", // rounds to nearest integer
            highTemp: Math.round(day.temp.max) + "°", // rounds to nearest integer
        };
    forecast.push(dailyForecast) // adds object for each day to the forecast array
    });

    return forecast;
};

const updateCurrentWeatherDisplay = (currentWeather) => {

    currentWeatherCondition.innerHTML = `${currentWeather.condition} | ${currentWeather.temp}`
    currentWeatherSunrise.innerHTML = `sunrise ${currentWeather.sunrise}`
    currentWeatherSunset.innerHTML = `sunset ${currentWeather.sunset}`

    if (currentWeather.condition === 'Clouds') {
        welcome.style.display = 'none'
        iconGlasses.style.display = 'none'
        iconUmbrella.style.display = 'none'
        iconCloud.style.display = 'block'
        document.body.style.backgroundColor = "#F4F7F8"
        document.body.style.color = "#F47775"
        currentWeatherHeader.style.color =  "#F47775"
        headerMessage.innerText = `Get cosy. ${cityOptions.value} is looking grey today.`
    } else if (currentWeather.condition === 'Rain') {
        welcome.style.display = 'none'
        iconCloud.style.display = 'none'
        iconGlasses.style.display = 'none'
        iconUmbrella.style.display = 'block'
        document.body.style.backgroundColor = "#A3DEF7"
        document.body.style.color = "#164A68"
        currentWeatherHeader.style.color =  "#164A68"
        headerMessage.innerText = `Don't forget your umbrella. It's wet in ${cityOptions.value} today.`
    } else if (currentWeather.condition === 'Clear'){
        welcome.style.display = 'none'
        iconCloud.style.display = 'none'
        iconUmbrella.style.display = 'none'
        iconGlasses.style.display = 'block'
        document.body.style.backgroundColor = "#F7E9B9"
        document.body.style.color = "#2A5510"
        currentWeatherHeader.style.color =  "#2A5510"
        headerMessage.innerText = `Get your sunnies on. ${cityOptions.value} is looking rather great today.`
    } else {
        welcome.style.display = 'none'
        iconGlasses.style.display = 'none'
        iconUmbrella.style.display = 'none'
        iconCloud.style.display = 'none'
        document.body.style.backgroundColor = "#CFC2CF"
        document.body.style.color = "#000000"
        currentWeatherHeader.style.color =  "#000000"
        headerMessage.innerText = `${cityOptions.value} has unpredictable weather in the forecast today!`
    }
}

const updateForecastDisplay = (forecast) => {
    forecastWrapper.innerHTML = ''
    forecast.slice(1,8).forEach((day) => {
        forecastWrapper.innerHTML += `
        <div class="forecast-wrapper">
        <div class="row">
            <p>${day.dayOfWeek}</p>
            <p>${day.highTemp}</p>
            </div>
        </div>
    `});
}
