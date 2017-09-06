/**
 * Created by ace on 9/6/17.
 */

import Path from './Path';

export default class PathByAir extends Path {
    constructor() {
        super();
    }

    static all(countriesList) {
        const list = [];

        for (let i=0; i < countriesList.length-1; i++){
            let from = countriesList[i], to = countriesList[i+1];

            list.push(new PathByAir(from, to, i));
        }

        return list;
    }
}