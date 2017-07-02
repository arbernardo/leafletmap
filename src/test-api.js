/**
 * Created by ace on 6/19/17.
 */
import './index.css';
import L from 'leaflet';
import ImportTransaction from './map/trade/ImportTransaction';
import ExportTransaction from './map/trade/ExportTransaction';
import ByAir from './map/trade/transport/ByAir';
import BySea from './map/trade/transport/BySea';
import countries from './data/countries.csv';


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const countriesByCode = new Map();
const countriesByName = new Map();

countries.forEach((data) => {
    countriesByCode.set(data.country, [data.latitude, data.longitude]);
    countriesByName.set(data.name, [data.latitude, data.longitude]);
});

const IvoryCoast = countriesByCode.get("CI");

const NE = [179, 179];
const SW = [-179, -179];

//Creating the map
let mymap = L.map("mymap").setView([0,0], 1);
let tileProvider = [
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
]
L.tileLayer(tileProvider[1], {
    // continuousWorld: false,
    // noWrap: true,
    // maxBoundsViscosity: 1.0,
    minZoom: 1,
    maxZoom: 5,
    // center: [38, -97]
}).addTo(mymap);

// mymap.setMaxBounds(L.latLngBounds(NE, SW));

// countries.forEach((data) => {
//
//     if (data.country != "CI") {
//         let type = getRandom(1,2);
//         switch(type) {
//             case 1:
//                 new ImportTransaction({
//                     modeOfTransport: new ByAir({
//                         marker: {durations: getRandom(5000, 20000)}
//                     }),
//                     from: IvoryCoast,
//                     to: [data.latitude, data.longitude]
//                 }).addTo(mymap).animate();
//                 break;
//
//             case 2:
//                 new ExportTransaction({
//                     modeOfTransport: new ByAir({
//                         marker: {durations: getRandom(5000, 20000)}
//                     }),
//                     from: IvoryCoast,
//                     to: [data.latitude, data.longitude]
//                 }).addTo(mymap).animate();
//                 break;
//
//             default:
//                 console.log("Something went wrong...");
//         }
//     }
// });

new ExportTransaction({
    modeOfTransport: new ByAir({
        marker: {durations: getRandom(5000, 20000)}
    }),
    from: [38, -97],
    to: [60, 100]
}).addTo(mymap).animate();
