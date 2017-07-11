/**
 * Created by ace on 6/5/17.
 */
import L from 'leaflet';
import 'leaflet-arc';
import ModeOfTransport from './ModeOfTransport';
import AirPlaneIcon from '../../../assets/icons/airplane.png';
import countries from '../../../data/countries.csv';
import Bezier from 'bezier-js';

//Usage
// new ByAir({marker: {...options}, polyline: {...options}})
const countriesByCode = new Map();
const countriesByName = new Map();

countries.forEach((data) => {
    countriesByCode.set(data.country, [data.latitude, data.longitude]);
    countriesByName.set(data.name, [data.latitude, data.longitude]);
});

const cMap = new Map();

export default class ByAir extends ModeOfTransport{
    constructor(params = {}){
        super(params);

        const {
            vertices = [200],
            marker = {}
        } = params;

        const proxy = new Proxy(marker, {
            get: (target, property) => {
                if (!(property in target)){
                    target[property] = {}
                }
                return target[property];
            }
        });

        if (!proxy.options.icon){
            proxy.options.icon = L.icon({
                iconUrl: AirPlaneIcon,
                iconSize: [15, 15],
                // className: "blinking"
            });
        };

        Object.assign(this, {vertices, marker});
    }


    generatePaths(points){

        let pathArr = [];
        let vertices = this.vertices;

        for (let i=0; i < points.length-1; i++){
            let origin = points[i], destination = points[i+1];

            let arc = this.createArc(origin, destination, {vertices: vertices[i] ? vertices[i]: vertices[vertices.length-1]});

            pathArr.push(arc._latlngs);
        }

        let paths = [].concat.apply([], pathArr);
        // this.createArc2();
        return {
            pathArr,
            paths
        }
    }

    createArc(origin, destination) {
        return L.Polyline.Arc(origin, destination, {vertices: this.vertices});
    }

    createArc2(origin, destination) {
        var curve = new Bezier(150,40 , 80,30 , 105,150);
        console.log(curve);
    }
}