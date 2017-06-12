/**
 * Created by ace on 6/5/17.
 */
import Transaction from './Transaction';
import TradePolyline from './transport/TradePolyline';

export default class ImportTransaction extends Transaction {
    constructor(params){
        super(params);
    }

    getType(p1, p2){
        return [p2, p1];
    }

    createPolyline(paths, polyline) {
        return new TradePolyline({paths, options: {color: "red", ...polyline}});
    }
}