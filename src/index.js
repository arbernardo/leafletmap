/**
 * Created by Ace on 6/11/2017.
 */
import './index.css';
import L from 'leaflet';
import ImportTransaction from './map/trade/ImportTransaction';
import ExportTransaction from './map/trade/ExportTransaction';
import ByAir from './map/trade/transport/ByAir';
import BySea from './map/trade/transport/BySea';

const IvoryCoast = [7.54, -5.5471];
const Philippines = [12.8797, 121.7740];
const somePlace = [50.680797145321655, 33.83789062500001];
const Australia = [-25.2744, 133.7751];
const Brazil = [-14.2350, -51.9253];
const US = [37.0902, -95.7129];
const Canada = [56.1304, -106.3468];
const Japan = [36.2048, 138.2529];
const Angola = [-11.2027, 17.8739];

const NE = [179, 179];
const SW = [-179, -179];

//Creating the map
let mymap = L.map("mymap").setView(IvoryCoast, 2);
let tileProvider = [
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
]
L.tileLayer(tileProvider[0], {
    continuousWorld: false,
    noWrap: true,
    maxBoundsViscosity: 1.0,
    minZoom: 2,
    maxZoom: 5,
    center: IvoryCoast
}).addTo(mymap);

mymap.setMaxBounds(L.latLngBounds(NE, SW));


//Using import/export
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
            durations: 3000
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
                    iconUrl: "https://image.flaticon.com/icons/svg/60/60517.svg",
                    iconSize: [40,40]
                    // className: "blinking",
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
        // marker: {durations: 10000},
        polyline: "none"
    }),
    from: IvoryCoast,
    to: Canada
}).addTo(mymap).animate();

let expShip = new ExportTransaction({
    modeOfTransport: new BySea({
        polyline: "none",
        marker: {durations: 15000}
    }),
    from: IvoryCoast,
    to: Angola
}).addTo(mymap).animate();

// mymap.on("click", function(e){
//     console.log(e.latlng);
// });
