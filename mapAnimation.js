
// Access Token Code
mapboxgl.accessToken = "pk.eyJ1IjoieWFlbGJlY2VycmlsIiwiYSI6ImNsbzBscHFsdjBoMGMya28zenlyMWZzcDcifQ.hZqTLl87zomE1cEXzbAneQ";

// Function to run the process of request every certain time
async function run(){
    // get bus data    
	const locations = await requestBusInfo();
    const latitude = locations.data[0].attributes.latitude;
    const longitude = locations.data[0].attributes.longitude;
    marker.setLngLat([longitude, latitude]);
    console.log(new Date() + [longitude, latitude]);

    // timer
	setTimeout(run, 5000);

}

// Function to request info from buses in real time.

async function requestBusInfo() {
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

// Map request procedure

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });

// Adds markers

var marker = new mapboxgl.Marker()
    .setLngLat([-71.104081, 42.365554])
    .addTo(map);

// Initiates process
run();