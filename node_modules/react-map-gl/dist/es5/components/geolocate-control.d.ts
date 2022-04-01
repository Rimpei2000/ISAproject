/// <reference types="mapbox-gl" />
import * as React from 'react';
import type { ControlPosition, PositionOptions, FitBoundsOptions, GeolocateEvent, GeolocateResultEvent, GeolocateErrorEvent } from '../types';
export declare type GeolocateControlRef = {
    /** Triggers a geolocate event */
    trigger: () => boolean;
};
export declare type GeolocateControlProps = {
    /**
     * A Geolocation API PositionOptions object.
     * @default {enableHighAccuracy:false,timeout:6000}
     */
    positionOptions?: PositionOptions;
    /** A Map#fitBounds options object to use when the map is panned and zoomed to the user's location.
     * @default {maxZoom:15}
     */
    fitBoundsOptions?: FitBoundsOptions;
    /** If true the GeolocateControl becomes a toggle button and when active the map will receive
     * updates to the user's location as it changes. Default false.
     * @default false
     */
    trackUserLocation?: boolean;
    /** Draw a transparent circle will be drawn around the user location indicating the accuracy
     * (95% confidence level) of the user's location. Set to false to disable.
     * This only has effect if `showUserLocation` is true.
     * @default true
     */
    showAccuracyCircle?: boolean;
    /**
     * Show a dot on the map at the user's location. Set to false to disable.
     * @default true
     */
    showUserLocation?: boolean;
    /** If true an arrow will be drawn next to the user location dot indicating the device's heading.
     * This only has affect when `trackUserLocation` is true. Default false.
     * @default false
     */
    showUserHeading?: boolean;
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    /** Called on each Geolocation API position update that returned as success. */
    onGeolocate?: (e: GeolocateResultEvent) => void;
    /** Called on each Geolocation API position update that returned as an error. */
    onError?: (e: GeolocateErrorEvent) => void;
    /** Called on each Geolocation API position update that returned as success but user position
     * is out of map `maxBounds`. */
    onOutOfMaxBounds?: (e: GeolocateResultEvent) => void;
    /** Called when the GeolocateControl changes to the active lock state. */
    onTrackUserLocationStart?: (e: GeolocateEvent) => void;
    /** Called when the GeolocateControl changes to the background state. */
    onTrackUserLocationEnd?: (e: GeolocateEvent) => void;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<GeolocateControlProps & React.RefAttributes<GeolocateControlRef>>>;
export default _default;
