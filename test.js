const button = document.getElementById("submitButton");
button.addEventListener("click", getWeather);

function getWeather() {
    const latitude = document.getElementById("lat").value;
    const longitude = document.getElementById("lon").value;
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=39e5d13ceac778eaf7fc4c93d4f097f5";

    fetch(url).then(response => response.json()).then(data => presentData(data));
}

function presentData(data) {
    for (const element of document.getElementsByClassName("report")) {
        element.style.display = "inline";
    }

    const windArrow = document.getElementById("windArrow");
    windArrow.style.transform = "rotate(" + data.wind.deg + "deg)";
    const scaling = data.wind.speed * 15;
    windArrow.style.height = "" + scaling + "px";
    windArrow.style.width = "" + scaling + "px";

    document.getElementById("currWFor").textContent = "Current weather for " + data.name;
    document.getElementById("reportLocation").textContent = data.name + ", " + data.sys.country;
    
    document.getElementById("maxTemp").textContent = "Maximum temperature: " + Number( (data.main.temp_max - 273).toPrecision(3) ) + " degrees";
    document.getElementById("currTemp").textContent = "Current temperature: " + Number( (data.main.temp - 273).toPrecision(3) ) + " degrees";
    document.getElementById("minTemp").textContent = "Minumum temperature: " + Number( (data.main.temp_min - 273).toPrecision(3) ) + " degrees";

    document.getElementById("windSpeed").textContent = "Wind Speed: " + Number( (data.wind.speed).toPrecision(3) ) + " m/s";

    document.getElementById("api").textContent = JSON.stringify(data, undefined, 2);
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: -33.8679, lng: 151.2073},
        mapId: "positionMap",
    });

    const marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
    });

    map.addListener("click", mapsMouseEvent => {
        const position = mapsMouseEvent.latLng
        map.panTo(position);
        marker.position = position;

        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.lat() + "&lon=" + position.lng() + "&appid=39e5d13ceac778eaf7fc4c93d4f097f5";

        fetch(url).then(response => response.json()).then(data => presentData(data));
    });

    // Set starting point to Sydney
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=-33.8679&lon=151.2073&appid=39e5d13ceac778eaf7fc4c93d4f097f5";
    fetch(url).then(response => response.json()).then(data => presentData(data));
}