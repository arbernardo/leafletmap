/**
 * Created by ace on 6/19/17.
 */
import './index.css';
import L from 'leaflet';
import Countries from './data/Countries';
import TransactionUtil from './utils/TransactionUtil';
import IvoryCoast from './data/ship-routes/IvoryCoast';

const NE = [179, 179];
const SW = [-179, -179];

//Creating the map
let mymap = L.map("mymap").setView([0,0], 2);
let tileProvider = [
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
    "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
]
L.tileLayer(tileProvider[3], {
    continuousWorld: false,
    noWrap: true,
    maxBoundsViscosity: 1.0,
    minZoom: 1,
    maxZoom: 10,
    // center: [38, -97]
}).addTo(mymap);

mymap.setMaxBounds(L.latLngBounds(NE, SW));

// TransactionUtil.generateRandomTransaction(mymap);

for (let x = 0; x < 10; x++){
    let origin =  Countries.get("CI");
    let destination = Countries.get(IvoryCoast.countries[x]);
    console.log("destination", destination, IvoryCoast.countries);
    if (destination) {
        TransactionUtil.generateShipRoutes({map:mymap, origin, destination});
    } else {
        console.log("Destination is empty");
    }
}
let data = [];
mymap.on("click", (e) => {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;
    // console.log(lat, lng);
    data.push([lat,lng]);
    console.log(data.forEach(d => {
        console.log(`[${d[0]}, ${d[1]}]`);
    }));
});

// mymap.removeLayer(e.modeOfTransport.polyline);