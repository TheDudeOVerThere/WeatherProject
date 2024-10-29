const button = document.getElementById("submitButton");

button.addEventListener("click", getWeather);


function getWeather() {
    const latitude = document.getElementById("lat").value;
    const longitude = document.getElementById("lon").value;
    console.log(typeof latitude);
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=39e5d13ceac778eaf7fc4c93d4f097f5";

    console.log(latitude);
    console.log(longitude);

    fetch(url).then(response => response.json()).then(data => document.getElementById("report").textContent = JSON.stringify(data, undefined, 2));
}