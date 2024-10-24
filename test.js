const url = "https://api.openweathermap.org/data/2.5/weather?lat=-33.8&lon=151.68&appid=39e5d13ceac778eaf7fc4c93d4f097f5";

fetch(url).then(response => response.json()).then(data => console.log(data));