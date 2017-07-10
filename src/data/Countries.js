/**
 * Created by ace on 6/19/17.
 */
import {getRandomNumber, shuffleArray} from '../utils/Util';
import countries from './countries.csv';

class Country {
    constructor(params){
        const {
            code,
            name,
            latlng
        } = params;

        Object.assign(this, {code, name, latlng});
    }
}

const countriesByCode = new Map();
const countriesByName = new Map();

countries.forEach((data) => {
    countriesByCode.set(data.country, new Country({ code: data.country, name: data.name, latlng:[data.latitude, data.longitude]}));
    countriesByName.set(data.name, new Country({ code: data.country, name: data.name, latlng:[data.latitude, data.longitude]}));
});

let Countries = {
    get: (query) => {
        return countriesByName.get(query) || countriesByCode.get(query);
    },

    get size() {
        return countriesByName.size || countriesByCode.size;
    },

    getRandomCountry: (country = []) => {

        const c = shuffleArray(Array.from(countriesByCode));
        const type = country.constructor.name;

        switch (type) {
            case "Array":
                for (let i = 0; i < c.length; i++) {
                    const code = c[i][0];
                    if (!country.map(d => d.code).includes(code)) {
                        return c[i][1];
                    }
                }
                break;
            case "String":
                for (let i = 0; i < c.length; i++) {
                    const code = c[i][1].code;
                    const name = c[i][1].name;
                    if (![code, name].includes(country)) {
                        return c[i][1];
                    }
                }
                break;
            case "Country":
                for (let i = 0; i < c.length; i++){
                    const code = c[i][0];
                    if (code !== country.code) {
                        return c[i][1];
                    }
                };
                break;

            default:
                console.log("There's something wrong.");
        }
    }
};

export default Countries;