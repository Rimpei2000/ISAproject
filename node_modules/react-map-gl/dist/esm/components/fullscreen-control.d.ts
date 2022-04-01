import * as React from 'react';
import type { ControlPosition } from '../types';
export declare type FullscreenControlProps = {
    /** Id of the DOM element which should be made full screen. By default, the map container
     * element will be made full screen. */
    containerId?: string;
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function FullscreenControl(props: FullscreenControlProps): null;
declare const _default: React.MemoExoticComponent<typeof FullscreenControl>;
export default _default;
