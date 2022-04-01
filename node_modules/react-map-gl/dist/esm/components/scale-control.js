import * as React from 'react';
import { useEffect } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
const defaultProps = {
    unit: 'metric',
    maxWidth: 100
};
function ScaleControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.ScaleControl(props), {
        position: props.position
    });
    // @ts-ignore
    if (ctrl.options.unit !== props.unit || ctrl.options.maxWidth !== props.maxWidth) {
        // @ts-ignore
        ctrl.options.maxWidth = props.maxWidth;
        // This method will trigger an update
        ctrl.setUnit(props.unit);
    }
    useEffect(() => {
        // @ts-ignore
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
ScaleControl.defaultProps = defaultProps;
export default React.memo(ScaleControl);
//# sourceMappingURL=scale-control.js.map