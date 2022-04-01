/* global document */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useContext } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import { MapContext } from './map';
import { arePointsEqual } from '../utils/deep-equal';
const defaultProps = {
    draggable: false,
    popup: null,
    rotation: 0,
    rotationAlignment: 'auto',
    pitchAlignment: 'auto'
};
/* eslint-disable complexity,max-statements */
function Marker(props) {
    const { map, mapLib } = useContext(MapContext);
    const thisRef = useRef({ props });
    thisRef.current.props = props;
    const marker = useMemo(() => {
        let hasChildren = false;
        React.Children.forEach(props.children, el => {
            if (el) {
                hasChildren = true;
            }
        });
        const options = {
            ...props,
            element: hasChildren ? document.createElement('div') : null
        };
        const mk = new mapLib.Marker(options).setLngLat([props.longitude, props.latitude]);
        mk.getElement().addEventListener('click', (e) => {
            thisRef.current.props.onClick?.({
                type: 'click',
                target: mk,
                originalEvent: e
            });
        });
        mk.on('dragstart', e => {
            const evt = e;
            evt.lngLat = marker.getLngLat();
            thisRef.current.props.onDragStart?.(evt);
        });
        mk.on('drag', e => {
            const evt = e;
            evt.lngLat = marker.getLngLat();
            thisRef.current.props.onDrag?.(evt);
        });
        mk.on('dragend', e => {
            const evt = e;
            evt.lngLat = marker.getLngLat();
            thisRef.current.props.onDragEnd?.(evt);
        });
        return mk;
    }, []);
    useEffect(() => {
        marker.addTo(map.getMap());
        return () => {
            marker.remove();
        };
    }, []);
    useEffect(() => {
        applyReactStyle(marker.getElement(), props.style);
    }, [props.style]);
    if (marker.getLngLat().lng !== props.longitude || marker.getLngLat().lat !== props.latitude) {
        marker.setLngLat([props.longitude, props.latitude]);
    }
    if (props.offset && !arePointsEqual(marker.getOffset(), props.offset)) {
        marker.setOffset(props.offset);
    }
    if (marker.isDraggable() !== props.draggable) {
        marker.setDraggable(props.draggable);
    }
    if (marker.getRotation() !== props.rotation) {
        marker.setRotation(props.rotation);
    }
    if (marker.getRotationAlignment() !== props.rotationAlignment) {
        marker.setRotationAlignment(props.rotationAlignment);
    }
    if (marker.getPitchAlignment() !== props.pitchAlignment) {
        marker.setPitchAlignment(props.pitchAlignment);
    }
    if (marker.getPopup() !== props.popup) {
        marker.setPopup(props.popup);
    }
    return createPortal(props.children, marker.getElement());
}
Marker.defaultProps = defaultProps;
// @ts-ignore
export default React.memo(Marker);
//# sourceMappingURL=marker.js.map