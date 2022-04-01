import * as React from 'react';
import { MapRef } from '../mapbox/create-ref';
declare type MountedMapsContextValue = {
    maps: {
        [id: string]: MapRef;
    };
    onMapMount: (map: MapRef, id: string) => void;
    onMapUnmount: (id: string) => void;
};
export declare const MountedMapsContext: React.Context<MountedMapsContextValue>;
export declare const MapProvider: React.FC<{}>;
export declare function useMap(): {
    current?: MapRef;
    [id: string]: MapRef | undefined;
};
export {};
