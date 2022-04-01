import * as React from 'react';
import type { ControlPosition } from '../types';
export declare type NavigationControlProps = {
    /** If true the compass button is included.
     * @default true
     */
    showCompass?: boolean;
    /** If true the zoom-in and zoom-out buttons are included.
     * @default true
     */
    showZoom?: boolean;
    /** If true the pitch is visualized by rotating X-axis of compass.
     * @default false
     */
    visualizePitch?: boolean;
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function NavigationControl(props: NavigationControlProps): null;
declare const _default: React.MemoExoticComponent<typeof NavigationControl>;
export default _default;
