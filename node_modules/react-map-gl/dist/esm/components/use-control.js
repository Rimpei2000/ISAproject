import { useContext, useMemo, useEffect } from 'react';
import { MapContext } from './map';
export default function useControl(onCreate, onRemove, opts) {
    const context = useContext(MapContext);
    const ctrl = useMemo(() => onCreate(context), []);
    useEffect(() => {
        const { map } = context;
        if (!map.hasControl(ctrl)) {
            map.addControl(ctrl, (opts || onRemove)?.position);
        }
        return () => {
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
//# sourceMappingURL=use-control.js.map