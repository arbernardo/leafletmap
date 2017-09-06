/**
 * Created by ace on 9/6/17.
 */
import CountryService from './CountryService';

export default class Country {
    constructor(){
        this.name = "";
        this.lat = "";
        this.lng = "";
    }

    static getCountry(name) {
        //write factory for getting Country object
        const countryObj = CountryService.getData(name);



        return new Country();
    }
}