const form = document.getElementById("test");

form?.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather();
});


function getWeather() {
    let latitude = document.getElementById("#lat");
    let longitude = document.getElementById("#lon");
    console.log("fdsa");
    alert("boo");
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=39e5d13ceac778eaf7fc4c93d4f097f5";

    fetch(url).then(response => response.json()).then(data => document.getElementById("report").textContent = JSON.stringify(data, undefined, 2));
}