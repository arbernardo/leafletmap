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

class Country {
    constructor(params){
        const {
            code,
            name,
            latlng
        } = params;

        Object.assign(this, {code, name, latlng});
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const countriesByCode = new Map();
const countriesByName = new Map();

countries.forEach((data) => {
    countriesByCode.set(data.country, new Country({ code: data.country, name: data.name, latlng:[data.latitude, data.longitude]}));
    countriesByName.set(data.name, new Country({ code: data.country, name: data.name, latlng:[data.latitude, data.longitude]}));
});

function generate(origin, destination){
    if (destination.code != origin.code) {
        generateTransaction(origin, destination);
    }
}

function generateTransaction(origin, destination, pathway = []) {

    let marker;
    let mouseOver = function(){
        this.pause();
        this.openPopup();
    };

    let mouseOut = function(){
        this.resume();
        this.closePopup();
    };

    let type = getRandom(1,2);
    switch(type) {
        case 1:
            let i = new ImportTransaction({
                modeOfTransport: new ByAir({
                    marker: {durations: getRandom(15000, 20000)}
                }),
                from: origin.latlng,
                pathway: pathway,
                to: destination.latlng
            }).addTo(mymap).animate();

            marker = i.modeOfTransport.marker.bindPopup("<b>Import!</b><br>This can be customized.");

            break;

        case 2:
            let e = new ExportTransaction({
                modeOfTransport: new ByAir({
                    marker: {durations: getRandom(15000, 20000)}
                }),
                from: origin.latlng,
                pathway: pathway,
                to: destination.latlng
            }).addTo(mymap).animate();

            marker = i.modeOfTransport.marker.bindPopup("<b>Export!</b><br>This can be customized.");

            break;

        default:
            console.log("Something went wrong...");
    }

    marker.on("mouseover", mouseOver);
    marker.on("mouseout", mouseOut);
}

function getRandomCountry(countries = []) {
    let randomC = getRandom(0, countriesByCode.size - 1), ctr = 0;
    for (let [k, v] of countriesByCode) {
        if (randomC == ctr++){
            let possibleC = countriesByCode.get(k);
            if (countries.includes(possibleC)){
                getRandomCountry(countries);
            } else {
                return possibleC;
            }
        }
    }
}

const NE = [179, 179];
const SW = [-179, -179];

//Creating the map
let mymap = L.map("mymap").setView([0,0], 1);
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
    maxZoom: 5,
    // center: [38, -97]
}).addTo(mymap);

mymap.setMaxBounds(L.latLngBounds(NE, SW));

//Airplane
for (let x = 0; x < 10; x++) {
    let origin = getRandomCountry();
    let pathway = [getRandomCountry([origin])];
    let destination = getRandomCountry([origin, pathway]);

    generateTransaction(origin, destination, pathway);
}

// for (let ctr = 0; ctr < 150; ctr++) {
//     let data = countries[ctr];
//     generate(countriesByCode.get("CI"), countriesByCode.get(data.country));
// }
// countries.forEach((data) => {
//     generate(countriesByCode.get("CI"), countriesByCode.get(data.country));
// });



// let e = new ExportTransaction({
//     modeOfTransport: new ByAir({
//         marker: {durations: getRandom(15000, 20000)}
//     }),
//     from:countriesByCode.get("BR").latlng,
//     pathway: [countriesByCode.get("RO").latlng, countriesByCode.get("CI").latlng],
//     to: countriesByCode.get("PH").latlng
// }).addTo(mymap).animate();
//
// let marker = e.modeOfTransport.marker;
//
// marker.bindPopup("<b>Export!</b><br>This can be customized.");
// marker.on('mouseover', function (e) {
//     this.pause();
//     this.openPopup();
// });
// marker.on('mouseout', function (e) {
//     this.resume();
//     this.closePopup();
// });
//
// let i = new ImportTransaction({
//     modeOfTransport: new ByAir({
//         marker: {durations: getRandom(15000, 20000)}
//     }),
//     from:countriesByCode.get("CI").latlng,
//     pathway: [countriesByCode.get("IR").latlng, countriesByCode.get("CH").latlng],
//     to: countriesByCode.get("PH").latlng
// }).addTo(mymap).animate();
//
// let marker2 = i.modeOfTransport.marker;
//
// marker2.bindPopup("<b>Import!</b><br>Addtional info here...");
// marker2.on('mouseover', function (e) {
//     this.pause();
//     this.openPopup();
// });
// marker2.on('mouseout', function (e) {
//     this.resume();
//     this.closePopup();
// });

// mymap.removeLayer(e.modeOfTransport.polyline);