/**
 * Created by ace on 7/10/17.
 */

import {getRandomNumber} from './Util';
import Countries from '../data/Countries';
import ImportTransaction from '../map/trade/ImportTransaction';
import ExportTransaction from '../map/trade/ExportTransaction';
import ByAir from '../map/trade/transport/ByAir';
import BySea from '../map/trade/transport/BySea';
import IvoryCoast from '../data/ship-routes/IvoryCoast';

function generateTransaction({map, origin, destination, pathway = []}) {

    const popup = `<br>From: ${origin.name}
                   <br>Pathway: ${pathway.map((d) => d.name).toString()}
                   <br>To: ${destination.name}`;

    let marker, transaction;
    let mouseOver = function(){
        this.pause();
        this.openPopup();
    };

    let mouseOut = function(){
        this.resume();
        this.closePopup();
    };

    let type = getRandomNumber(1,2);
    switch(type) {
        case 1:
            transaction = new ImportTransaction({
                modeOfTransport: new ByAir({
                    marker: {durations: getRandomNumber(30000, 60000)}
                }),
                from: origin.latlng,
                pathway: [pathway[0].latlng],
                to: destination.latlng
            }).addTo(map).animate();

            marker = transaction.marker.bindPopup(`<b>Import!</b> ${popup}`);

            break;

        case 2:
            transaction = new ExportTransaction({
                modeOfTransport: new ByAir({
                    marker: {durations: getRandomNumber(30000, 60000)}
                }),
                from: origin.latlng,
                pathway: pathway.map((d) => d.latlng),
                to: destination.latlng
            }).addTo(map).animate();

            marker = transaction.marker.bindPopup(`<b>Export!</b> ${popup}`);

            break;

        default:
            console.log("Something went wrong...");
    }

    marker.on("mouseover", mouseOver);
    marker.on("mouseout", mouseOut);
}

function getRandomModeOfTransport(params) {
    let randomN = getRandom(1, 2);
    let modeOfTransport;

    // switch(randomN) {
    //     case 1:
    //         new ByAir()
    // }

    return modeOfTransport;
}

function generateRandomTransaction(map, offset = 10, n = 10) {
    let randomNumber = getRandomNumber(offset, n);
    for (let x = 0; x < randomNumber; x++) {
        let origin = Countries.get("CI");
        let pathway = [Countries.getRandomCountry([origin])];
        let destination = Countries.getRandomCountry([origin, pathway]);
        generateTransaction({map, origin, destination, pathway});
    }
}

function generateShipRoutes({map, origin, destination, pathway = []}) {

    const popup = `<br>From: ${origin.name}
                   <br>To: ${destination.name}`;

    let marker, transaction;
    let mouseOver = function(){
        this.pause();
        this.openPopup();
    };

    let mouseOut = function(){
        this.resume();
        this.closePopup();
    };

    let type = getRandomNumber(1,2);
    switch(type) {
        case 1:
            transaction = new ImportTransaction({
                modeOfTransport: new BySea({
                    marker: {durations: getRandomNumber(100000, 120000)}
                }),
                from: origin.latlng,
                to: destination.latlng
            }).addTo(map).animate();

            marker = transaction.marker.bindPopup(`<b>Import!</b> ${popup}`);

            break;

        case 2:
            transaction = new ExportTransaction({
                modeOfTransport: new BySea({
                    marker: {durations: getRandomNumber(100000, 120000)}
                }),
                from: origin.latlng,
                to: destination.latlng
            }).addTo(map).animate();

            marker = transaction.marker.bindPopup(`<b>Export!</b> ${popup}`);

            break;

        default:
            console.log("Something went wrong...");
    }

    marker.on("mouseover", mouseOver);
    marker.on("mouseout", mouseOut);
}

module.exports = {
    generateRandomTransaction,
    generateShipRoutes
}