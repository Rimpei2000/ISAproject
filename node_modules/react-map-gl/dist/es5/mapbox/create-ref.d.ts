/// <reference types="mapbox-gl" />
import type { MapboxMap } from '../types';
import type Mapbox from './mapbox';
/** These methods may break the react binding if called directly */
declare const skipMethods: readonly ["setMaxBounds", "setMinZoom", "setMaxZoom", "setMinPitch", "setMaxPitch", "setRenderWorldCopies", "setProjection", "setStyle", "addSource", "removeSource", "addLayer", "removeLayer", "setLayerZoomRange", "setFilter", "setPaintProperty", "setLayoutProperty", "setLight", "setTerrain", "setFog", "remove"];
export declare type MapRef = {
    getMap(): MapboxMap;
} & Omit<MapboxMap, typeof skipMethods[number]>;
export default function createRef(mapInstance: Mapbox, mapLib: any): MapRef;
export {};
