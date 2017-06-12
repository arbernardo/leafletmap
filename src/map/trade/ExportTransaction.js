/**
 * Created by ace on 6/5/17.
 */
import Transaction from './Transaction';
import TradePolyline from './transport/TradePolyline';

export default class ExportTransaction extends Transaction {
    constructor(params){
        super(params);
    }

    getType(p1, p2){
        return [p1, p2];
    }

    createPolyline(paths, polyline) {
        return new TradePolyline({paths, options: {color: "blue", ...polyline}});
    }

}