/**
 * Created by ace on 6/19/17.
 */
import './index.css';
import L from 'leaflet';
import Bezier from 'bezier-js';
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

// for (let x = 0; x < 10; x++){
//     let origin =  Countries.get("CI");
//     let destination = Countries.get(IvoryCoast.countries[x]);
//     console.log("destination", destination, IvoryCoast.countries);
//     if (destination) {
//         TransactionUtil.generateShipRoutes({map:mymap, origin, destination});
//     } else {
//         console.log("Destination is empty");
//     }
// }
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

function applyOperation(operator, operand, arrayKey){
    const isArray = operand.length ? true : false;
    const operation = {
        "*": (x, o)=> x*o,
        "-": (x, o)=> x-o,
        "+": (x, o)=> x+o,
        "/": (x, o)=> x/o,
        "^": (x, o)=> Math.pow(x, o)
    }

    return this.map((d, i) => d[arrayKey] ? operation[operator](d[arrayKey], isArray ? operand[i] : operand) :
        operation[operator](d, isArray ? operand[i] : operand));
}
Array.prototype.applyOperation = applyOperation;

function getArc(p1, p2) {
    const sum = (x,y) => x+y;
    let pp1 = [...p1], pp2 = [...p2];
    pp1[1] = Math.asinh(Math.tan(p1[1]/180 * Math.PI))/Math.PI * 180;
    pp2[1] = Math.asinh(Math.tan(p2[1]/180 * Math.PI))/Math.PI * 180;

    console.log("pp1",pp1);
    console.log("pp2", pp2);
    let u = pp2.applyOperation("-", pp1);
    console.log("u1", u);
    u = u.applyOperation("/", Math.sqrt(u.applyOperation("*", u).reduce(sum, 0)));
    console.log("u2", u);
    let d = Math.sqrt(pp1.applyOperation("-", pp2).applyOperation("^", 2).reduce(sum, 0));
    console.log("d", d);
    //Calculate third point
    let m = d/2, h = Math.floor(d * .2);

    console.log("m", m, "h", h);
    //Create new points in rotated space
    let a = [0,0], b = [d, 0], c = [m, h];
    // let a = p1, b = p2, c = [m, h];



    return new Bezier(a[0], a[1], c[0], c[1], b[0], b[1]);

}

let US = [38,-97];
let RU = [60,100];
let p = [85, (US[1] + RU[1])/2];

let bez = getArc(US, RU);
console.log("bez", bez, bez.getLUT(49));
let path3 = [];//bez.getLUT(50).map(d => [d.x, d.y]);

var polylineOptions = {
    color: 'blue',
    weight: 6,
    opacity: 0.9
};


const bc = new Bezier(US[0], US[1]  , p[0], p[1] , RU[0], RU[1]);
const path2 = bc.getLUT(49).map(d => [d.x, d.y]);

const polyline = new L.Polyline(path3, polylineOptions);
mymap.addLayer(polyline);