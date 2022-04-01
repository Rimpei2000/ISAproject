import * as React from 'react';
import type { ControlPosition } from '../types';
export declare type AttributionControlProps = {
    /**
     * If true , force a compact attribution that shows the full attribution on mouse hover.
     * If false , force the full attribution control. The default is a responsive attribution
     * that collapses when the map is less than 640 pixels wide.  */
    compact?: boolean;
    /** String or strings to show in addition to any other attributions. */
    customAttribution?: string | string[];
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function AttributionControl(props: AttributionControlProps): null;
declare const _default: React.MemoExoticComponent<typeof AttributionControl>;
export default _default;
