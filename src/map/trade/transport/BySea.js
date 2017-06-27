/**
 * Created by ace on 6/5/17.
 */
import ModeOfTransport from './ModeOfTransport';
import ShipIcon from '../../../assets/icons/ship.png';

const IvoryCoast_Angola = [
    {lat: 4.390228926463396, lng: -4.218750000000001},
    {lat: 2.3723687086440504, lng: -3.1640625000000004},
    {lat: -0.7909904981540058, lng: -0.9667968750000001},
    {lat: -3.425691524418062, lng: 1.5820312500000002},
    {lat: -6.664607562172573, lng: 3.9550781250000004},
    {lat: -8.841651120809145, lng: 6.064453125000001},
    {lat: -10.574222078332806, lng: 8.437500000000002},
    {lat: -11.092165893502, lng: 10.195312500000002},
    {lat: -11.60919340793894, lng: 12.304687500000002}
];
export default class BySea extends ModeOfTransport{
    constructor(params = {}){
        super(params);

        const {
            marker = {}
        } = params;

        const proxy = new Proxy(marker, {
            get: (target, property) => {
                if (!(property in target)){
                    target[property] = {}
                }
                return target[property];
            }
        });

        if (!proxy.options.icon){
            proxy.options.icon = L.icon({
                iconUrl: ShipIcon,
                iconSize: [50, 25]
            });
        };

        Object.assign(this, {marker});
    }

    generatePaths(points){
        let pathArr = [];
        let paths = [];

        paths = IvoryCoast_Angola;

        return {
            pathArr,
            paths
        }
    }
}