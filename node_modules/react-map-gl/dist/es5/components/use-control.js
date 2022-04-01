"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var map_1 = require("./map");
function useControl(onCreate, onRemove, opts) {
    var context = (0, react_1.useContext)(map_1.MapContext);
    var ctrl = (0, react_1.useMemo)(function () { return onCreate(context); }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        var map = context.map;
        if (!map.hasControl(ctrl)) {
            map.addControl(ctrl, (_a = (opts || onRemove)) === null || _a === void 0 ? void 0 : _a.position);
        }
        return function () {
            if (typeof onRemove === 'function') {
                onRemove(context);
            }
            // Map might have been removed (parent effects are destroyed before child ones)
            if (map.hasControl(ctrl)) {
                map.removeControl(ctrl);
            }
        };
    }, []);
    return ctrl;
}
exports.default = useControl;
//# sourceMappingURL=use-control.js.map