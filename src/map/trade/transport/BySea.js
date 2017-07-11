/**
 * Created by ace on 6/5/17.
 */
import ModeOfTransport from './ModeOfTransport';
import ShipIcon from '../../../assets/icons/ship.png';
import IvoryCoast from '../../../data/ship-routes/IvoryCoast';

const ipaths = IvoryCoast.paths;

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
                iconSize: [15, 15]
            });
        };

        Object.assign(this, {marker});
        BySea.ctr++;
    }

    generatePaths(points){
        let pathArr = [];
        let paths = ipaths[BySea.ctr - 1];

        return {
            pathArr,
            paths
        }
    }

    static ctr = 0;
}