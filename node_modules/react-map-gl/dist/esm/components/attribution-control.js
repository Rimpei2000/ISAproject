import * as React from 'react';
import { useEffect } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
function AttributionControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.AttributionControl(props), {
        position: props.position
    });
    useEffect(() => {
        // @ts-ignore
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export default React.memo(AttributionControl);
//# sourceMappingURL=attribution-control.js.map