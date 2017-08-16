/**
 * Created by ace on 7/10/17.
 */
import Bezier from 'bezier-js';

function applyOperation(operator, operand, arrayKey){
    const isArray = operand.length ? true : false;
    const operation = {
        "*": (x, o)=> x*o,
        "-": (x, o)=> x-o,
        "+": (x, o)=> x+o,
        "/": (x, o)=> x/o,
        "^": (x, o)=> Math.pow(x, o)
    };

    return this.map((d, i) => d[arrayKey] ? operation[operator](d[arrayKey], isArray ? operand[i] : operand) :
        operation[operator](d, isArray ? operand[i] : operand));
}
Array.prototype.applyOperation = applyOperation;

//For generation of Arcs between two points
function getArcPoints(p1, p2) {
    let pp1 = [p1[1], p1[0]], pp2 = [p2[1], p2[0]];
    pp1[1] = Math.asinh(Math.tan(p1[0]/180 * Math.PI))/Math.PI * 180;
    pp2[1] = Math.asinh(Math.tan(p2[0]/180 * Math.PI))/Math.PI * 180;

    let arc = uv_arc(pp1, pp2);
    return arc.map(arr => [Math.atan(Math.sinh(arr[1]/180 * Math.PI))/Math.PI * 180, arr[0]]);
}

const sum = (x,y) => x+y;
function uv_arc(p1, p2) {

    //Get unit vector from P1 to P2
    let u = p2.applyOperation("-", p1);
    u = u.applyOperation("/", Math.sqrt(u.applyOperation("*", u).reduce(sum, 0)));
    let d = Math.sqrt(p1.applyOperation("-", p2).applyOperation("^", 2).reduce(sum, 0));

    //Calculate third point
    let m = d/2;
    let h = Math.floor(d * .2);

    //Create new points in rotated space
    let np1 = [0,0], np2 = [d, 0], np3 = [m, h];

    let bc = new Bezier(np1[0], np1[1], np3[0], np3[1], np2[0], np2[1]).getLUT(50-1),
        pSize = bc.length;

    let theta = Math.acos(u.applyOperation("*", [1,0]).reduce(sum, 0)) * Math.sign(u[1]),
        ct = Math.cos(theta),
        st = Math.sin(theta);

    let t = []; while(pSize--) t[pSize] = [...p1];
    let arr = bc.map(o => [(o.x * ct + o.y * (-1 * st)), (o.x * st + o.y * ct)]);

    let points = [];
    for (let i = 0; i < t.length; i++) {
        points.push(t[0].applyOperation("+", arr[i]));
    }

    return points;
}
// End of Arc functions

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function printClickPath(map) {
    let data = [];
    map.on("click", (e) => {
        let lat = e.latlng.lat;
        let lng = e.latlng.lng;
        data.push([lat,lng]);
        console.log(data.forEach(d => {
            console.log(`[${d[0]}, ${d[1]}]`);
        }));
    });
}

module.exports = {
    getRandomNumber,
    shuffleArray,
    printClickPath,
    getArcPoints
}