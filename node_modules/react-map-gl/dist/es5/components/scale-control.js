"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var apply_react_style_1 = require("../utils/apply-react-style");
var use_control_1 = require("./use-control");
var defaultProps = {
    unit: 'metric',
    maxWidth: 100
};
function ScaleControl(props) {
    var ctrl = (0, use_control_1.default)(function (_a) {
        var mapLib = _a.mapLib;
        return new mapLib.ScaleControl(props);
    }, {
        position: props.position
    });
    // @ts-ignore
    if (ctrl.options.unit !== props.unit || ctrl.options.maxWidth !== props.maxWidth) {
        // @ts-ignore
        ctrl.options.maxWidth = props.maxWidth;
        // This method will trigger an update
        ctrl.setUnit(props.unit);
    }
    (0, react_1.useEffect)(function () {
        // @ts-ignore
        (0, apply_react_style_1.applyReactStyle)(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
ScaleControl.defaultProps = defaultProps;
exports.default = React.memo(ScaleControl);
//# sourceMappingURL=scale-control.js.map