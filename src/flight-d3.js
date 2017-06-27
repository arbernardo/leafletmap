/**
 * Created by ace on 6/19/17.
 */
import './index.css';
import L from 'leaflet';
import * as d3 from 'd3';
import country from './data/countries';
import circles from './circles.json';

// let svg = d3.select("#mymap")
//             .append("svg")
//             .attr("view-port", "0 0 " + window.innerWidth + " " + window.innerHeight)
//             .attr("width", window.innerWidth)
//             .attr("height", window.innerHeight);

// const plane = svg.append("path")
//     .attr("class", "plane")
//     .attr("d", "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z");


//Initialize leaflet map
const NE = [179, 179];
const SW = [-179, -179];

let map = L.map("mymap").setView([0, 0], 0);

L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    // continuousWorld: false,
    // noWrap: true,
    // maxBoundsViscosity: 1.0,
    // minZoom: 2,
    // maxZoom: 5
}).addTo(map);

map.setMaxBounds(L.latLngBounds(NE, SW));

L.svg().addTo(map);

let svg = d3.select("#mymap").select("svg"),
    g = svg.append("g");

function projectPoint(x, y){
    let point = map.latLngToLayerPoint(new L.LatLng(x,y))
    this.stream.point(point.x, point.y);
    console.log(x, y);
    console.log("this", this);
}



// let transform = d3.geoTransform({point: projectPoint})
// let path = d3.geoPath().pointRadius(2).projection(transform);

let width = 600, height = 500;

var projection = d3.geoMercator()
    .scale((width - 3) / (2 * Math.PI))
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var coordinates = [
    projection([-74, 40]), // new york
    projection([37, 55]) // moscow
];

console.log(coordinates);

svg.append("path")
    .datum(coordinates)
    .attr("class", "route")
    .attr("d", path)
    .attr("stroke", "red")
    .attr("fill", "red");

// d3.json(circles, function(collection) {
//     collection.objects.forEach((d) => {
//         console.log(d);
//         d.LatLng = new L.LatLng(d.circle.coordinates[0], d.circle.coordinates[1]);
//     });
//
//     let feature = g.selectAll("circle")
//         .data(collection.objects)
//         .enter().append("circle")
//         .style("stroke", "black")
//         .style("opacity", .6)
//         .style("fill", "red")
//         .attr("r", 20);
//
//     map.on("moveend", update);
//     update();
//
//     function update(){
//         feature.attr("transform", (d) => {
//             return "translate(" + map.latLngToLayerPoint(d.LatLng).x + "," + map.latLngToLayerPoint(d.LatLng).y +")";
//         });
//     }
//
// });

// circles.objects.forEach((d) => {
//     d.LatLng = new L.LatLng(d.circle.coordinates[0], d.circle.coordinates[1]);
// });
//

//
// map.on("viewreset", update);
// update();
//
// let svg = d3.select(map.getPanes().overlayPane).append("svg"),
//     g = svg.append("g").attr("class", "leaflet-zoom-hide");
//
//
// function projectPoint(x, y) {
//     let point = map.latLngToLayerPoint(new L.LatLng(y, x))
//     this.stream.point(point.x, point.y);
// }
//
// let transform = d3.geo.transform({point: projectPoint}),
//     path = d3.geo.path().projection(transform);