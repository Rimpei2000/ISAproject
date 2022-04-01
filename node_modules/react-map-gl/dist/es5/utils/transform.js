"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyViewStateToTransform = exports.transformToViewState = void 0;
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
function transformToViewState(tr) {
    return {
        longitude: tr.center.lng,
        latitude: tr.center.lat,
        zoom: tr.zoom,
        pitch: tr.pitch,
        bearing: tr.bearing,
        padding: tr.padding
    };
}
exports.transformToViewState = transformToViewState;
/* eslint-disable complexity */
/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
function applyViewStateToTransform(tr, props) {
    var v = props.viewState || props;
    var changed = false;
    if ('longitude' in v && 'latitude' in v) {
        var center = tr.center;
        // @ts-ignore
        tr.center = new center.constructor(v.longitude, v.latitude);
        changed = changed || center !== tr.center;
    }
    if ('zoom' in v) {
        var zoom = tr.zoom;
        tr.zoom = v.zoom;
        changed = changed || zoom !== tr.zoom;
    }
    if ('bearing' in v) {
        var bearing = tr.bearing;
        tr.bearing = v.bearing;
        changed = changed || bearing !== tr.bearing;
    }
    if ('pitch' in v) {
        var pitch = tr.pitch;
        tr.pitch = v.pitch;
        changed = changed || pitch !== tr.pitch;
    }
    if (v.padding && !tr.isPaddingEqual(v.padding)) {
        changed = true;
        tr.padding = v.padding;
    }
    return changed;
}
exports.applyViewStateToTransform = applyViewStateToTransform;
//# sourceMappingURL=transform.js.map