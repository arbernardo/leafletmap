/**
 * Created by ace on 6/5/17.
 */
import ModeOfTransport from './ModeOfTransport';
import ShipIcon from '../../../assets/icons/ship.png';
import IvoryCoast from '../../../data/ship-routes/IvoryCoast';

const paths = IvoryCoast.paths;

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

    static ctr = 0;
}