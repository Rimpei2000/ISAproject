"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapContext = void 0;
var React = require("react");
var react_1 = require("react");
var use_map_1 = require("./use-map");
var mapbox_1 = require("../mapbox/mapbox");
var create_ref_1 = require("../mapbox/create-ref");
var use_isomorphic_layout_effect_1 = require("../utils/use-isomorphic-layout-effect");
var set_globals_1 = require("../utils/set-globals");
exports.MapContext = React.createContext(null);
var defaultProps = {
    // Constraints
    minZoom: 0,
    maxZoom: 22,
    minPitch: 0,
    maxPitch: 60,
    // Interaction handlers
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
    // Style
    mapStyle: { version: 8, sources: {}, layers: [] },
    styleDiffing: true,
    projection: 'mercator',
    renderWorldCopies: true,
    // Callbacks
    onError: function (e) { return console.error(e.error); },
    // Globals
    RTLTextPlugin: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
};
var Map = (0, react_1.forwardRef)(function (props, ref) {
    var mountedMapsContext = (0, react_1.useContext)(use_map_1.MountedMapsContext);
    var _a = __read((0, react_1.useState)(null), 2), mapInstance = _a[0], setMapInstance = _a[1];
    var containerRef = (0, react_1.useRef)();
    var contextValue = (0, react_1.useRef)({ mapLib: null, map: null }).current;
    (0, react_1.useEffect)(function () {
        var mapLib = props.mapLib;
        var isMounted = true;
        var mapbox;
        Promise.resolve(mapLib || Promise.resolve().then(function () { return require('mapbox-gl'); }))
            .then(function (mapboxgl) {
            if (!isMounted) {
                return;
            }
            if (!mapboxgl.Map) {
                // commonjs style
                mapboxgl = mapboxgl.default;
            }
            if (!mapboxgl || !mapboxgl.Map) {
                throw new Error('Invalid mapLib');
            }
            if (mapboxgl.supported(props)) {
                (0, set_globals_1.default)(mapboxgl, props);
                if (props.reuseMaps) {
                    mapbox = mapbox_1.default.reuse(props, containerRef.current);
                }
                if (!mapbox) {
                    mapbox = new mapbox_1.default(mapboxgl.Map, props, containerRef.current);
                }
                contextValue.map = (0, create_ref_1.default)(mapbox, mapboxgl);
                contextValue.mapLib = mapboxgl;
                setMapInstance(mapbox);
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapMount(contextValue.map, props.id);
            }
            else {
                throw new Error('Map is not supported by this browser');
            }
        })
            .catch(function (error) {
            props.onError({
                type: 'error',
                target: null,
                originalEvent: null,
                error: error
            });
        });
        return function () {
            isMounted = false;
            if (mapbox) {
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapUnmount(props.id);
                if (props.reuseMaps) {
                    mapbox.recycle();
                }
                else {
                    mapbox.destroy();
                }
            }
        };
    }, []);
    (0, use_isomorphic_layout_effect_1.default)(function () {
        if (mapInstance) {
            mapInstance.setProps(props);
        }
    });
    (0, react_1.useImperativeHandle)(ref, function () { return contextValue.map; }, [mapInstance]);
    var style = (0, react_1.useMemo)(function () { return (__assign({ position: 'relative', width: '100%', height: '100%' }, props.style)); }, [props.style]);
    return (React.createElement("div", { id: props.id, ref: containerRef, style: style }, mapInstance && (React.createElement(exports.MapContext.Provider, { value: contextValue }, props.children))));
});
Map.displayName = 'Map';
Map.defaultProps = defaultProps;
exports.default = Map;
//# sourceMappingURL=map.js.map