/// <reference types="mapbox-gl" />
import * as React from 'react';
import type { PopupEvent, Anchor, PointLike } from '../types';
export declare type PopupProps = {
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    /**
     * A string indicating the part of the popup that should be positioned closest to the coordinate.
     * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`,
     * and `'bottom-right'`. If unset, the anchor will be dynamically set to ensure the popup falls within the map
     * container with a preference for `'bottom'`.
     */
    anchor?: Anchor;
    /**
     * If `true`, a close button will appear in the top right corner of the popup.
     * @default true
     */
    closeButton?: boolean;
    /**
     * If `true`, the popup will close when the map is clicked.
     * @default true
     */
    closeOnClick?: boolean;
    /**
     * If `true`, the popup will closed when the map moves.
     * @default false
     */
    closeOnMove?: boolean;
    /**
     * If `true`, the popup will try to focus the first focusable element inside the popup.
     * @default true
     */
    focusAfterOpen?: boolean;
    /**
     * A pixel offset applied to the popup's location specified as:
     * - a single number specifying a distance from the popup's location
     * - a PointLike specifying a constant offset
     * - an object of Points specifing an offset for each anchor position.
     */
    offset?: number | PointLike | Partial<{
        [anchor in Anchor]: PointLike;
    }>;
    /** Space-separated CSS class names to add to popup container. */
    className?: string;
    /**
     * A string that sets the CSS property of the popup's maximum width (for example, `'300px'`).
     * To ensure the popup resizes to fit its content, set this property to `'none'`
     * @default "240px"
     */
    maxWidth?: string;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onOpen?: (e: PopupEvent) => void;
    onClose?: (e: PopupEvent) => void;
    children?: React.ReactNode;
};
declare function Popup(props: PopupProps): any;
declare const _default: React.MemoExoticComponent<typeof Popup>;
export default _default;
