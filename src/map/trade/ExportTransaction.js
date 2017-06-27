/**
 * Created by ace on 6/5/17.
 */
import Transaction from './Transaction';

export default class ExportTransaction extends Transaction {
    constructor(params){
        super(params);

        this.setDefaults();
        this.init();
    }

    getType(p1, p2){
        return [p1, p2];
    }

    setDefaults(){
        const {
            polyline = {}
        } = this.modeOfTransport;

        if (polyline !== "none" && !polyline.color){
            this.modeOfTransport.polyline = {color: "blue"};
        }
    }

}