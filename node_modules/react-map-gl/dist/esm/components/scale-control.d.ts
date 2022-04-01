import * as React from 'react';
import type { ControlPosition } from '../types';
export declare type ScaleControlProps = {
    /** Unit of the distance.
     * @default "metric"
     */
    unit?: 'imperial' | 'metric' | 'nautical';
    /** The maximum length of the scale control in pixels.
     * @default 100
     */
    maxWidth?: number;
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function ScaleControl(props: ScaleControlProps): null;
declare namespace ScaleControl {
    var defaultProps: ScaleControlProps;
}
declare const _default: React.MemoExoticComponent<typeof ScaleControl>;
export default _default;
