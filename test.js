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

    document.getElementById("reportLocation").textContent = data.name;

    document.getElementById("api").textContent = JSON.stringify(data, undefined, 2);
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: -25.363, lng: 131.044},
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
}