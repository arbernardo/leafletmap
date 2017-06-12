/**
 * Created by ace on 6/5/17.
 */
import {AntPath} from 'leaflet-ant-path';

export default  class TradePolyline {
    constructor(params) {

        const {
            paths,
            options = {}
        } = params;

        const {
            weight = 5
        } = options;

        return new AntPath(paths, {...options, weight});
    }
}