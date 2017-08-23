/**
 * Created by ace on 6/5/17.
 */

import TradeMarker from './TradeMarker';
import TradePolyline from './TradePolyline';

export default class ModeOfTransport {
    constructor({
        marker,
        polyline,
        pathArr,
        paths
    }){

        Object.assign(this, {marker, polyline, pathArr, paths});
    }

    defaultMarker() {
        const {paths, marker} = this;
        return new TradeMarker({paths, ...marker});
    }

    defaultPolyline(){
        const {paths, polyline} = this;
        return new TradePolyline({paths, options: { ...polyline}});
    }

    init(points){
        const pathObj = this.generatePaths(points);
        Object.assign(this, pathObj);
        this.generateDefaults();
    }

    generateDefaults(){
        const {
            marker,
            polyline,
        } = this;

        if (!(marker instanceof L.Marker)) {
            this.marker = this.defaultMarker();
            this.marker.parent = this;
        }

        if (polyline !== "none"){
            if (!(polyline instanceof L.Polyline)){
                this.polyline = this.defaultPolyline();
            }
            this.polyline.parent = this;
        }
    }
}