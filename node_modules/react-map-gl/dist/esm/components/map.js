import * as React from 'react';
import { useState, useRef, useEffect, useContext, useMemo, forwardRef, useImperativeHandle } from 'react';
import { MountedMapsContext } from './use-map';
import Mapbox from '../mapbox/mapbox';
import createRef from '../mapbox/create-ref';
import useIsomorphicLayoutEffect from '../utils/use-isomorphic-layout-effect';
import setGlobals from '../utils/set-globals';
export const MapContext = React.createContext(null);
const defaultProps = {
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
    onError: e => console.error(e.error),
    // Globals
    RTLTextPlugin: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
};
const Map = forwardRef((props, ref) => {
    const mountedMapsContext = useContext(MountedMapsContext);
    const [mapInstance, setMapInstance] = useState(null);
    const containerRef = useRef();
    const { current: contextValue } = useRef({ mapLib: null, map: null });
    useEffect(() => {
        const mapLib = props.mapLib;
        let isMounted = true;
        let mapbox;
        Promise.resolve(mapLib || import('mapbox-gl'))
            .then(mapboxgl => {
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
                setGlobals(mapboxgl, props);
                if (props.reuseMaps) {
                    mapbox = Mapbox.reuse(props, containerRef.current);
                }
                if (!mapbox) {
                    mapbox = new Mapbox(mapboxgl.Map, props, containerRef.current);
                }
                contextValue.map = createRef(mapbox, mapboxgl);
                contextValue.mapLib = mapboxgl;
                setMapInstance(mapbox);
                mountedMapsContext?.onMapMount(contextValue.map, props.id);
            }
            else {
                throw new Error('Map is not supported by this browser');
            }
        })
            .catch(error => {
            props.onError({
                type: 'error',
                target: null,
                originalEvent: null,
                error
            });
        });
        return () => {
            isMounted = false;
            if (mapbox) {
                mountedMapsContext?.onMapUnmount(props.id);
                if (props.reuseMaps) {
                    mapbox.recycle();
                }
                else {
                    mapbox.destroy();
                }
            }
        };
    }, []);
    useIsomorphicLayoutEffect(() => {
        if (mapInstance) {
            mapInstance.setProps(props);
        }
    });
    useImperativeHandle(ref, () => contextValue.map, [mapInstance]);
    const style = useMemo(() => ({
        position: 'relative',
        width: '100%',
        height: '100%',
        ...props.style
    }), [props.style]);
    return (React.createElement("div", { id: props.id, ref: containerRef, style: style }, mapInstance && (React.createElement(MapContext.Provider, { value: contextValue }, props.children))));
});
Map.displayName = 'Map';
Map.defaultProps = defaultProps;
export default Map;
//# sourceMappingURL=map.js.map