/**
 * Created by ace on 6/5/17.
 */
import L from 'leaflet';
import '../../leaflet/moving-marker';

export default class TradeMarker {
    constructor(params){
        const {
            paths,
            durations = 4000,
            // icon,
            // loop,
            options = {}
        } = params;

        const {
            loop = true
        } = options;
        console.log("options",options)
        return L.Marker.movingMarker(paths, durations, {...options, loop});
    }


}