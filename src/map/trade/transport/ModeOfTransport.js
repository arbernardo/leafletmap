/**
 * Created by ace on 6/5/17.
 */
export default class ModeOfTransport {
    constructor({
        marker,
        polyline,
        pathArr,
        paths
    }){

        Object.assign(this, {marker, polyline, pathArr, paths});
    }
}