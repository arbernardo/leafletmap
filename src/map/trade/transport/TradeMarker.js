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
            options = {}
        } = params;

        const {
            loop = true
        } = options;

        let p = paths.map(data => {
            if(data.lng < 0) {
                // console.log("lol");
                data.lng += 1;
            }
            return new L.LatLng(data.lat, data.lng, true);
        });
        return L.Marker.movingMarker(p, durations, {...options, loop});
    }
}