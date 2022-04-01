"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* global document */
var React = require("react");
var react_1 = require("react");
var apply_react_style_1 = require("../utils/apply-react-style");
var use_control_1 = require("./use-control");
function FullscreenControl(props) {
    var ctrl = (0, use_control_1.default)(function (_a) {
        var mapLib = _a.mapLib;
        return new mapLib.FullscreenControl({
            container: props.containerId && document.getElementById(props.containerId)
        });
    }, { position: props.position });
    (0, react_1.useEffect)(function () {
        // @ts-ignore
        (0, apply_react_style_1.applyReactStyle)(ctrl._controlContainer, props.style);
    }, [props.style]);
    return null;
}
exports.default = React.memo(FullscreenControl);
//# sourceMappingURL=fullscreen-control.js.map