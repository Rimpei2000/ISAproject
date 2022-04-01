import type { MapboxProps } from '../mapbox/mapbox';
import type { Transform, ViewState } from '../types';
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
export declare function transformToViewState(tr: Transform): ViewState;
/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
export declare function applyViewStateToTransform(tr: Transform, props: MapboxProps): boolean;
