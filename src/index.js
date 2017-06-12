/**
 * Created by Ace on 6/11/2017.
 */
import './index.css';
import L from 'leaflet';
import ImportTransaction from './map/trade/ImportTransaction';
import ExportTransaction from './map/trade/ExportTransaction';
import ByAir from './map/trade/transport/ByAir';
// import 'leaflet-curve';
// import 'leaflet-arc';
// import {AntPath} from 'leaflet-ant-path';
// import '../leaflet/moving-marker';
// import Bezier from 'bezier-js';

// import TradeRouter from './trade/TradeRouter';
// import ModeOfTransport from './trade/ModeOfTransport';
// import Import from './trade/Import';
// import Export from './trade/Export';
//
// import airplaneRight from '../assets/icons/airplane-right.png';
// import airplaneLeft from '../assets/icons/airplane-left.png';

// let airplaneIconRight = L.icon({
//     iconUrl: airplaneRight,
//     iconSize: [50, 50]
// });
//
// let airplaneIconLeft = L.icon({
//     iconUrl: airplaneLeft,
//     iconSize: [50, 50]
// });

const IvoryCoast = [7.54, -5.5471];
const Philippines = [12.8797, 121.7740];
const somePlace = [50.680797145321655, 33.83789062500001];
const Australia = [-25.2744, 133.7751];
const Brazil = [-14.2350, -51.9253];
const US = [37.0902, -95.7129];
const Canada = [56.1304, -106.3468];
const Japan = [36.2048, 138.2529];

const NE = [179, 179];
const SW = [-179, -179];

let mymap = L.map("mymap").setView(IvoryCoast, 2);
let tileProvider = [
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
]
L.tileLayer(tileProvider[0], {
    continuousWorld: false,
    noWrap: true,
    minZoom: 2,
    maxZoom: 5,
    center: IvoryCoast
}).addTo(mymap);

mymap.setMaxBounds(L.latLngBounds(NE, SW));

let imp1 = new ImportTransaction({
    modeOfTransport: new ByAir({
        polyline: "none",
        marker: {durations: 15000}
    }),
    from: IvoryCoast,
    to: Philippines
});

imp1.addTo(mymap);
imp1.animate();

let imp2 = new ImportTransaction({
    modeOfTransport: new ByAir({
        marker: {
            durations: 3000,
            options: {
                icon: L.icon({
                    iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
                    className: "blinking",
                })
            }
        },
        polyline: "none"
    }),
    from: IvoryCoast,
    to: Brazil
});

imp2.addTo(mymap).animate();

let imp3 = new ImportTransaction({
    modeOfTransport: new ByAir({
        marker: {durations: 16000},
        polyline: "none"
    }),
    from: IvoryCoast,
    to: Japan
});

imp3.addTo(mymap).animate();

let exp = new ExportTransaction({
    modeOfTransport: new ByAir({
        marker: {durations: 11000},
        polyline: "none"
    }),
    from: IvoryCoast,
    to: somePlace
}).addTo(mymap).animate();

let exp2 = new ExportTransaction({
    modeOfTransport: new ByAir({
        marker: {
            durations: 7000,
            options: {
                icon: L.icon({
                    iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
                    className: "blinking",
                })
            }
        },
        polyline: "none"
    }),
    from: IvoryCoast,
    to: US
}).addTo(mymap).animate();

let exp3 = new ExportTransaction({
    modeOfTransport: new ByAir({
        marker: {durations: 10000},
        polyline: "none"
    }),
    from: IvoryCoast,
    to: Canada
}).addTo(mymap).animate();

// create a red polyline from an array of LatLng points
// let latlngs = [
//     IvoryCoast,
//     [37.77, -122.43],
//     [34.04, -118.2]
// ];
// let polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
// // zoom the map to the polyline
// mymap.fitBounds(polyline.getBounds());


// let arcs = L.Polyline.Arc(IvoryCoast, Philippines, {vertices: 500});
// let ivoryCoastToPhilippines = arcs._latlngs.map(data => [data.lat, data.lng]);
// let antPolyline = new AntPath(ivoryCoastToPhilippines, {color: 'red', weight: 5});
// antPolyline.addTo(mymap);
//
// let myMovingMarker1 = L.Marker.movingMarker(ivoryCoastToPhilippines, 20000, {loop: true, icon: airplaneIconRight}).addTo(mymap);
// myMovingMarker1.bindPopup("From Ivory Coast<br>Philippines.");
// myMovingMarker1.start();
//
// arcs = L.Polyline.Arc(Philippines, somePlace, {vertices: 500});
// antPolyline = new AntPath(arcs._latlngs, {color: 'red', weight: 5});
// let philippinesToSomewhere = arcs._latlngs.map(data => [data.lat, data.lng]);
// antPolyline.addTo(mymap);
//
// // let final = [...mapped, ...mapped2];
// //
// //
// let myMovingMarker2 = L.Marker.movingMarker(philippinesToSomewhere, 20000, {loop: true, icon: airplaneIconLeft}).addTo(mymap);
// myMovingMarker2.bindPopup("From Philippines<br> to somewhere...");
// myMovingMarker2.start();
// function createCurvePath(c1, c2){
//
//     let x1 = c1[0], y1 = c1[1];
//     let x2 = c2[0], y2 = c2[1];
//
//     let xm = (x2 - x1)/2, ym = (y2 - y1)/2;
//
//     let b = Bezier.cubicFromPoints(
//         {x: x1, y:y1},
//         {x:xm, y:ym},
//         {x:x2, y:y2}
//     );
//
//     let curvePath = b.points.reduce(function(acc, data, index) {
//         if (index != 0) {
//             acc.push([data.x, data.y]);
//         }
//         return acc;
//     }, []);
//
//     let path = L.curve(
//         [
//             'M',
//             [b.points[0].x,b.points[0].y],
//             'C',
//             ...curvePath
//         ],
//         {color:'red'}
//     );
//
//     return path;
// }
//
// createCurvePath(Brazil, Australia).addTo(mymap);

// let b = Bezier.cubicFromPoints({x: 7.54, y:-5.5471}, {x:40.1209, y:9.0129}, {x:50.680797145321655, y:33.83789062500001});
// console.log(b);
//
// let curvePath = b.points.reduce(function(acc, data, index) {
//     if (index != 0) {
//         acc.push([data.x, data.y]);
//     }
//     return acc;
// }, []);
//
// let path = L.curve(['M',[b.points[0].x,b.points[0].y],
//         'C',...curvePath],
//     {color:'red'}).addTo(mymap);
//
// console.log(path);


// let arcs = L.Polyline.Arc(Brazil, Australia, {vertices: 500, offset: 100});
// let brazilAustralia = arcs._latlngs.map(data => [data.lat, data.lng]);
// let antPolyline = new AntPath(brazilAustralia, {color: 'red', weight: 5});
// antPolyline.addTo(mymap);
//
// let myMovingMarker1 = L.Marker.movingMarker(brazilAustralia, 20000, {loop: true, icon: airplaneIconRight}).addTo(mymap);
// myMovingMarker1.bindPopup("...");
// myMovingMarker1.start();

