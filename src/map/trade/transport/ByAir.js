/**
 * Created by ace on 6/5/17.
 */
import L from 'leaflet';
import 'leaflet-arc';
import ModeOfTransport from './ModeOfTransport';

//Usage
// new ByAir({marker: {...options}, polyline: {...options}})

export default class ByAir extends ModeOfTransport{
    constructor(params = {}){
        super(params);

        const {vertices = [200]} = params;

        Object.assign(this, {vertices});
    }

    init(transaction){

        const {
            from,
            to
        } = transaction;

        const points = transaction.getType(from, to);

        let pathArr = [];
        let vertices = this.vertices;

        for (let i=0; i < points.length-1; i++){
            let origin = points[i], destination = points[i+1];
            let arc = this.createArc(origin, destination, {vertices: vertices[i] ? vertices[i]: vertices[vertices.length-1]});

            pathArr.push(arc._latlngs);
        }

        this.pathArr = pathArr;
        this.paths = [].concat.apply([], pathArr);

        transaction._draw();
    }

    createArc(origin, destination) {
        return L.Polyline.Arc(origin, destination, {vertices: this.vertices});
    }

}