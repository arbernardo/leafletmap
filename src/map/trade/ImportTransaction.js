/**
 * Created by ace on 6/5/17.
 */
import Transaction from './Transaction';

export default class ImportTransaction extends Transaction {
    constructor(params){
        super(params);

        //set defaults and initialize
        this.setDefaults();
        this.init();
    }

    getType({from, pathway = [], to}){
        return [to, ...pathway.reverse(), from];
    }

    setDefaults(){
        const {
           polyline = {}
        } = this.modeOfTransport;

        if (polyline !== "none" && !polyline.color){
            this.modeOfTransport.polyline = {color: "red", pulseColor: "red"};
        }
    }
}