/// <reference types="mapbox-gl" />
import type { AnyLayer } from '../types';
export declare type LayerProps = AnyLayer & {
    id?: string;
    /** If set, the layer will be inserted before the specified layer */
    beforeId?: string;
};
declare function Layer(props: LayerProps): any;
export default Layer;
