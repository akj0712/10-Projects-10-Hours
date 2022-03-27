console.log("Weather-App");

const APIKEY = "cc0650e705dda122ec9eef733840f4cb";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const APIURL = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(APIURL(city), {
        origin: "cors",
    });
    const respData = await resp.json();
    // ** console.log(respData, KtoC(respData.main.temp));
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");
    weather.innerHTML = `
        <h5>${data.weather[0].main}</h5>
        <h2>${temp}° C</h2>
        <img src = "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    `;

    // ** CleanUp
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return (K - 273.15).toFixed(2);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
