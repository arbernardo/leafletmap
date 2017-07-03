/**
 * Created by ace on 6/5/17.
 */

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
            Object.assign(this, {modeOfTransport, pathway, from, to});
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

    init(){
        const {
            from,
            to,
            pathway,
            modeOfTransport
        } = this;

        if (pathway.length) {
            //if there is pathway(s) then create a path for each to and from, ie. [from, ...pathway, to]
            //Allow for arrays of mode of transport.
            modeOfTransport.length ? modeOfTransport[0].init(this.getType({from, pathway, to})) : modeOfTransport.init(this.getType({from, pathway, to}));

        } else {
            //initialize mode of transport
            modeOfTransport.length ? modeOfTransport[0].init(this.getType({from, to})) : modeOfTransport.init(this.getType({from, to}));
        }
    }
}