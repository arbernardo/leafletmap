/**
 * Created by ace on 6/19/17.
 */

import L from 'leaflet';
import TransactionUtil from './utils/TransactionUtil';

const NE = [179, 179];
const SW = [-179, -179];

//Creating the map
let mymap = L.map("mymap").setView([0,0], 3);
let tileProvider = [
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
    "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
];
L.tileLayer(tileProvider[3], {
    continuousWorld: false,
    noWrap: true,
    maxBoundsViscosity: 1.0,
    minZoom: 3,
    maxZoom: 10,
    // center: [38, -97]
}).addTo(mymap);

mymap.setMaxBounds(L.latLngBounds(NE, SW));
// End of Map creation

TransactionUtil.generateRandomTransaction(mymap);
// TransactionUtil.generateShipRoutes()