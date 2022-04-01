/* global document */
import * as React from 'react';
import { useEffect } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
function FullscreenControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.FullscreenControl({
        container: props.containerId && document.getElementById(props.containerId)
    }), { position: props.position });
    useEffect(() => {
        // @ts-ignore
        applyReactStyle(ctrl._controlContainer, props.style);
    }, [props.style]);
    return null;
}
export default React.memo(FullscreenControl);
//# sourceMappingURL=fullscreen-control.js.map