/**
 * Created by ace on 6/5/17.
 */
import L from 'leaflet';
import 'leaflet-arc';
import ModeOfTransport from './ModeOfTransport';
import AirPlaneIcon from '../../../assets/icons/airplane.png';

//Usage
// new ByAir({marker: {...options}, polyline: {...options}})

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

        return {
            pathArr,
            paths
        }
    }

    createArc(origin, destination) {
        return L.Polyline.Arc(origin, destination, {vertices: this.vertices});
    }
}