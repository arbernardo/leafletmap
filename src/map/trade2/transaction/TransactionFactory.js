/**
 * Created by ace on 9/6/17.
 */

import Country from '../data/countries/Country';
import Path from '../path/Path';
import PathByAir from '../path/PathByAir';
import PathBySea from '../path/PathBySea';
import ImportTransaction from './ImportTransaction';
import ExportTransaction from './ExportTransaction';

function modeOfTransport(transport) {
    switch (transport.toLowerCase()) {
        case "air": return () => new PathByAir(arguments);
        case "sea": return () => new PathBySea(arguments);
        default: console.error("Invalid input.");
    }
}

export default {
    createFactory: function(type) {
        let prototype = undefined;

        switch (type.toLowerCase()) {
            case "im":
            case "import":
                prototype = ImportTransaction.prototype;

            case "ex":
            case "export":
                prototype = ExportTransaction.prototype;
            default:
                prototype = null;
        }

        return function(list, modeOfTransport) {

            let isCollectionOfPaths = false;
            if (!list || !list.length) {
                console.error("List must not be empty");
                return;
            }

            if (list.every(c => c instanceof Country)) {
                //convert to Paths
                const countries = [];
                for (let i = 0; i < list.length-1; i++) {

                }

                isCollectionOfPaths = true;
            }

            if (isCollectionOfPaths || list.every(c => c instanceof Path)) {
                let transaction = Object.create(prototype);

                transaction.countryOfOrigin = list[0].from;
                transaction.countryOfDestination = list[list.length-1].to;
                transaction.paths = list;

                return transaction;
            }

            console.error("Passed list is not valid. All instances must be of Country or Path.")
        };
    }
}