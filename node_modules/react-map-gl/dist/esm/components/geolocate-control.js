import * as React from 'react';
import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
const GeolocateControl = forwardRef((props, ref) => {
    const thisRef = useRef({ props });
    const ctrl = useControl(({ mapLib }) => {
        const gc = new mapLib.GeolocateControl(props);
        gc.on('geolocate', e => {
            thisRef.current.props.onGeolocate?.(e);
        });
        gc.on('error', e => {
            thisRef.current.props.onError?.(e);
        });
        gc.on('outofmaxbounds', e => {
            thisRef.current.props.onOutOfMaxBounds?.(e);
        });
        gc.on('trackuserlocationstart', e => {
            thisRef.current.props.onTrackUserLocationStart?.(e);
        });
        gc.on('trackuserlocationend', e => {
            thisRef.current.props.onTrackUserLocationEnd?.(e);
        });
        return gc;
    }, { position: props.position });
    thisRef.current.props = props;
    useImperativeHandle(ref, () => ({
        trigger: () => ctrl.trigger()
    }), []);
    useEffect(() => {
        // @ts-ignore
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
});
GeolocateControl.displayName = 'GeolocateControl';
export default React.memo(GeolocateControl);
//# sourceMappingURL=geolocate-control.js.map