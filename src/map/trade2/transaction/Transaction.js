/**
 * Created by ace on 9/6/17.
 */

export default class Transaction {

    static id = 0;

    constructor(countryOfOrigin, countryOfDestination, paths) {
        this._id = Transaction.id++;
        this.countryOfOrigin = countryOfOrigin;
        this.countryOfDestination = countryOfDestination;
        this.paths = paths;
    }
}