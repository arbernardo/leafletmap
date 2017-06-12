/**
 * Created by ace on 6/5/17.
 */

import TradeMarker from './transport/TradeMarker';

export default class Transaction {
    constructor({
        modeOfTransport,
        pathway = [],
        from,
        to
    }){

        if (!modeOfTransport || !from || !to) {
            console.error("route, from, and to attributes are required.");
        } else {
            if (pathway.length) {
                //if there is pathway(s) then create a path for each to and from, ie. [from, ...pathway, to]
                //Allow for arrays of mode of transport.
            } else {
                Object.assign(this, {modeOfTransport, pathway, from, to});

                //initialize mode of transport
                modeOfTransport.length ? modeOfTransport[0].init(this) : modeOfTransport.init(this);
            }
        }
    }

    addTo(map){
        const {
            marker,
            polyline
        } = this.modeOfTransport;

        marker.addTo(map);
        if (polyline !== "none") polyline.addTo(map);

        return this;
    }

    animate() {
        const {
            marker
        } = this.modeOfTransport;
        marker.start();
        return this;
    }

    _draw(){
        const {
            paths,
            marker,
            polyline,
        } = this.modeOfTransport;

        if (!(marker instanceof L.Marker)) {
            this.modeOfTransport.marker = this._createMarker(paths, marker);
        }

        if (polyline !== "none"){
            if (!(polyline instanceof L.Polyline)){
                this.modeOfTransport.polyline = this.createPolyline(paths, polyline);
            }
        }
    }

    _createMarker(paths, marker) {
        return new TradeMarker({paths, ...marker});
    }
}