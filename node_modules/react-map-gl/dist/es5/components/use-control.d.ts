/// <reference types="mapbox-gl" />
import type { IControl, ControlPosition } from '../types';
import type { MapContextValue } from './map';
declare type ControlOptions = {
    position?: ControlPosition;
};
export default function useControl<T extends IControl>(onCreate: (context: MapContextValue) => T, onRemove?: ((context: MapContextValue) => void) | ControlOptions, opts?: ControlOptions): T;
export {};
