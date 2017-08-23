/**
 * Created by ace on 6/5/17.
 */

export default class Transaction {

    static layerControl;

    constructor({
        modeOfTransport,
        pathway = [],
        from,
        to,
        description
    }){

        if (!modeOfTransport || !from || !to) {
            console.error("route, from, and to attributes are required.");
        } else {
            Object.assign(this, {modeOfTransport, pathway, from, to, description});
        }
    }

    static addToLayers(description, layerGroup, map) {
        if (!Transaction.layerControl) {
            let layerGroups = {};
            layerGroups[description] = layerGroup;
            Transaction.layerControl = L.control.layers(null, layerGroups);
            Transaction.layerControl.layerGroups = layerGroups;

            console.log(Transaction.layerControl.layerGroups);
            Transaction.layerControl.addTo(map);
        } else {
            // Transaction.layerControl.layerGroups[description] = layerGroup;
        }
    }

    addTo(map){
        const {
            marker,
            polyline
        } = this.modeOfTransport;

        let l = L.layerGroup([marker]);
        if (polyline !== "none") l.addLayer(polyline);

        map.addLayer(l);

        //add Custom Control.
        Transaction.addToLayers(this.description, l, map);

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

    get marker() {
        return this.modeOfTransport.marker;
    }

    get polyline(){
        return this.modeOfTransport.polyline;
    }
}