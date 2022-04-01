/* global document */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useContext } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import { MapContext } from './map';
import { deepEqual } from '../utils/deep-equal';
// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}
/* eslint-disable complexity,max-statements */
function Popup(props) {
    const { map, mapLib } = useContext(MapContext);
    const container = useMemo(() => {
        return document.createElement('div');
    }, []);
    const thisRef = useRef({ props });
    thisRef.current.props = props;
    const popup = useMemo(() => {
        const options = { ...props };
        const pp = new mapLib.Popup(options).setLngLat([props.longitude, props.latitude]);
        pp.on('open', e => {
            thisRef.current.props.onOpen?.(e);
        });
        pp.on('close', e => {
            thisRef.current.props.onClose?.(e);
        });
        return pp;
    }, []);
    useEffect(() => {
        popup.setDOMContent(container).addTo(map.getMap());
        return () => {
            if (popup.isOpen()) {
                popup.remove();
            }
        };
    }, []);
    useEffect(() => {
        applyReactStyle(popup.getElement(), props.style);
    }, [props.style]);
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
            popup.setLngLat([props.longitude, props.latitude]);
        }
        // @ts-ignore
        if (props.offset && !deepEqual(popup.options.offset, props.offset)) {
            popup.setOffset(props.offset);
        }
        // @ts-ignore
        if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
            // @ts-ignore
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        // @ts-ignore
        if (popup.options.className !== props.className) {
            // @ts-ignore
            const prevClassList = getClassList(popup.options.className);
            const nextClassList = getClassList(props.className);
            for (const c of prevClassList) {
                if (!nextClassList.has(c)) {
                    popup.removeClassName(c);
                }
            }
            for (const c of nextClassList) {
                if (!prevClassList.has(c)) {
                    popup.addClassName(c);
                }
            }
            // @ts-ignore
            popup.options.className = props.className;
        }
    }
    return createPortal(props.children, container);
}
// @ts-ignore
export default React.memo(Popup);
//# sourceMappingURL=popup.js.map