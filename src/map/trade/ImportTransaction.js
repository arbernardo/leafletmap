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

    getType(p1, p2){
        return [p2, p1];
    }

    setDefaults(){
        const {
           polyline = {}
        } = this.modeOfTransport;

        if (polyline !== "none" && !polyline.color){
            this.modeOfTransport.polyline = {color: "red"};
        }
    }
}