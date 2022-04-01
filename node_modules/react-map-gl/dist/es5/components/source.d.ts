/// <reference types="mapbox-gl" />
import type { AnySourceData } from '../types';
export declare type SourceProps = AnySourceData & {
    id?: string;
    children?: any;
};
declare function Source(props: SourceProps): any;
export default Source;
