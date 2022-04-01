/// <reference types="mapbox-gl" />
import type { Transform, ProjectionSpecification, ViewState, ViewStateChangeEvent, DragPanOptions, ZoomRotateOptions, TransformRequestFunction, Light, Fog, TerrainSpecification, MapboxStyle, ImmutableLike, LngLatBoundsLike, FitBoundsOptions, MapMouseEvent, MapLayerMouseEvent, MapLayerTouchEvent, MapWheelEvent, MapBoxZoomEvent, MapStyleDataEvent, MapSourceDataEvent, MapboxEvent, ErrorEvent, MapboxMap } from '../types';
export declare type MapboxProps = Partial<ViewState> & {
    mapboxAccessToken?: string;
    /** Camera options used when constructing the Map instance */
    initialViewState?: Partial<ViewState> & {
        /** The initial bounds of the map. If bounds is specified, it overrides longitude, latitude and zoom options. */
        bounds?: LngLatBoundsLike;
        /** A fitBounds options object to use only when setting the bounds option. */
        fitBoundsOptions?: FitBoundsOptions;
    };
    /** If provided, render into an external WebGL context */
    gl?: WebGLRenderingContext;
    /**
     * If true, the gl context will be created with MSA antialiasing, which can be useful for antialiasing custom layers.
     * This is false by default as a performance optimization.
     * @default false
     */
    antialias?: boolean;
    /**
     * If true, an attribution control will be added to the map.
     * @default true
     */
    attributionControl?: boolean;
    /**
     * Snap to north threshold in degrees.
     * @default 7
     */
    bearingSnap?: number;
    /**
     * The max number of pixels a user can shift the mouse pointer during a click for it to be
     * considered a valid click (as opposed to a mouse drag).
     * @default 3
     */
    clickTolerance?: number;
    /**
     * If `true`, Resource Timing API information will be collected for requests made by GeoJSON
     * and Vector Tile web workers (this information is normally inaccessible from the main
     * Javascript thread). Information will be returned in a `resourceTiming` property of
     * relevant `data` events.
     * @default false
     */
    collectResourceTiming?: boolean;
    /**
     * If `true` , scroll zoom will require pressing the ctrl or ⌘ key while scrolling to zoom map,
     * and touch pan will require using two fingers while panning to move the map.
     * Touch pitch will require three fingers to activate if enabled.
     */
    cooperativeGestures?: boolean;
    /**
     * If `true`, symbols from multiple sources can collide with each other during collision
     * detection. If `false`, collision detection is run separately for the symbols in each source.
     * @default true
     */
    crossSourceCollisions?: boolean;
    /** String or strings to show in an AttributionControl.
     * Only applicable if options.attributionControl is `true`. */
    customAttribution?: string | string[];
    /**
     * Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds.
     * This setting affects all symbol layers. This setting does not affect the duration of runtime
     * styling transitions or raster tile cross-fading.
     * @default 300
     */
    fadeDuration?: number;
    /** If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected.
     * @default false
     */
    failIfMajorPerformanceCaveat?: boolean;
    /** If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
     * For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.
     * An additional string may optionally be provided to indicate a parameter-styled hash,
     * e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo
     * is a custom parameter and bar is an arbitrary hash distinct from the map hash.
     */
    hash?: boolean | string;
    /** If false, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input
     * @default true
     */
    interactive?: boolean;
    /** A patch to apply to the default localization table for UI strings, e.g. control tooltips.
     * The `locale` object maps namespaced UI string IDs to translated strings in the target language;
     * see `src/ui/default_locale.js` for an example with all supported string IDs.
     * The object may specify all UI strings (thereby adding support for a new translation) or
     * only a subset of strings (thereby patching the default translation table).
     */
    locale?: {
        [key: string]: string;
    };
    /**
     * Overrides the generation of all glyphs and font settings except font-weight keywords
     * Also overrides localIdeographFontFamily
     * @default null
     */
    localFontFamily?: string;
    /**
     * If specified, defines a CSS font-family for locally overriding generation of glyphs in the
     * 'CJK Unified Ideographs' and 'Hangul Syllables' ranges. In these ranges, font settings from
     * the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
     * The purpose of this option is to avoid bandwidth-intensive glyph server requests.
     * @default "sans-serif"
     */
    localIdeographFontFamily?: string;
    /**
     * A string representing the position of the Mapbox wordmark on the map.
     * @default "bottom-left"
     */
    logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /**
     * The maximum number of tiles stored in the tile cache for a given source. If omitted, the
     * cache will be dynamically sized based on the current viewport.
     * @default null
     */
    maxTileCacheSize?: number;
    /**
     * If true, map will prioritize rendering for performance by reordering layers
     * If false, layers will always be drawn in the specified order
     * @default true
     */
    optimizeForTerrain?: boolean;
    /**
     * If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
     * @default true
     */
    pitchWithRotate?: boolean;
    /** If true, The maps canvas can be exported to a PNG using map.getCanvas().toDataURL();. This is false by default as a performance optimization.
     * @default false
     */
    preserveDrawingBuffer?: boolean;
    /**
     * If `false`, the map won't attempt to re-request tiles once they expire per their HTTP
     * `cacheControl`/`expires` headers.
     * @default true
     */
    refreshExpiredTiles?: boolean;
    /**
     * Allows for the usage of the map in automated tests without an accessToken with custom self-hosted test fixtures.
     * @default null
     */
    testMode?: boolean;
    /**
     * If  true, the map will automatically resize when the browser window resizes
     * @default true
     */
    trackResize?: boolean;
    /**
     * A callback run before the Map makes a request for an external URL. The callback can be
     * used to modify the url, set headers, or set the credentials property for cross-origin requests.
     * @default null
     */
    transformRequest?: TransformRequestFunction;
    /**
     * If true, enable the "box zoom" interaction (see BoxZoomHandler)
     * @default true
     */
    boxZoom?: boolean;
    /**
     * If true, enable the "double click to zoom" interaction (see DoubleClickZoomHandler).
     * @default true
     */
    doubleClickZoom?: boolean;
    /**
     * If `true`, the "drag to pan" interaction is enabled.
     * An `Object` value is passed as options to {@link DragPanHandler#enable}.
     * @default true
     */
    dragPan?: boolean | DragPanOptions;
    /**
     * If true, enable the "drag to rotate" interaction (see DragRotateHandler).
     * @default true
     */
    dragRotate?: boolean;
    /**
     * If true, enable keyboard shortcuts (see KeyboardHandler).
     * @default true
     */
    keyboard?: boolean;
    /**
     * If `true`, the "scroll to zoom" interaction is enabled.
     * An `Object` value is passed as options to {@link ScrollZoomHandler#enable}.
     * @default true
     */
    scrollZoom?: boolean | ZoomRotateOptions;
    /**
     * If `true`, the "drag to pitch" interaction is enabled.
     * An `Object` value is passed as options to {@link TouchPitchHandler#enable}.
     * @default true
     */
    touchPitch?: boolean;
    /**
     * If `true`, the "pinch to rotate and zoom" interaction is enabled.
     * An `Object` value is passed as options to {@link TouchZoomRotateHandler#enable}.
     * @default true
     */
    touchZoomRotate?: boolean | ZoomRotateOptions;
    /** If set, the map is constrained to the given bounds. */
    maxBounds?: LngLatBoundsLike;
    /** Maximum pitch of the map. */
    maxPitch?: number;
    /** Maximum zoom of the map. */
    maxZoom?: number;
    /** Minimum pitch of the map. */
    minPitch?: number;
    /** Minimum zoom of the map. */
    minZoom?: number;
    /** For external controller to override the camera state */
    viewState?: ViewState & {
        width: number;
        height: number;
    };
    /** Mapbox style */
    mapStyle?: string | MapboxStyle | ImmutableLike;
    /** Enable diffing when the map style changes
     * @default true
     */
    styleDiffing?: boolean;
    /** The fog property of the style. Must conform to the Fog Style Specification .
     * If `null` is provided, removes the fog from the map. */
    fog?: Fog | null;
    /** Light properties of the map. */
    light?: Light;
    /** Terrain property of the style. Must conform to the Terrain Style Specification .
     * If `null` is provided, removes terrain from the map. */
    terrain?: TerrainSpecification | null;
    /** Default layers to query on pointer events */
    interactiveLayerIds?: string[];
    /** The projection the map should be rendered in
     * @default "mercator"
     */
    projection?: ProjectionSpecification | string;
    /**
     * If `true`, multiple copies of the world will be rendered, when zoomed out.
     * @default true
     */
    renderWorldCopies?: boolean;
    /** CSS cursor */
    cursor?: string;
    onMouseDown?: (e: MapLayerMouseEvent) => void;
    onMouseUp?: (e: MapLayerMouseEvent) => void;
    onMouseOver?: (e: MapLayerMouseEvent) => void;
    onMouseMove?: (e: MapLayerMouseEvent) => void;
    onClick?: (e: MapLayerMouseEvent) => void;
    onDblClick?: (e: MapLayerMouseEvent) => void;
    onMouseEnter?: (e: MapLayerMouseEvent) => void;
    onMouseLeave?: (e: MapLayerMouseEvent) => void;
    onMouseOut?: (e: MapLayerMouseEvent) => void;
    onContextMenu?: (e: MapLayerMouseEvent) => void;
    onTouchStart?: (e: MapLayerTouchEvent) => void;
    onTouchEnd?: (e: MapLayerTouchEvent) => void;
    onTouchMove?: (e: MapLayerTouchEvent) => void;
    onTouchCancel?: (e: MapLayerTouchEvent) => void;
    onMoveStart?: (e: ViewStateChangeEvent) => void;
    onMove?: (e: ViewStateChangeEvent) => void;
    onMoveEnd?: (e: ViewStateChangeEvent) => void;
    onDragStart?: (e: ViewStateChangeEvent) => void;
    onDrag?: (e: ViewStateChangeEvent) => void;
    onDragEnd?: (e: ViewStateChangeEvent) => void;
    onZoomStart?: (e: ViewStateChangeEvent) => void;
    onZoom?: (e: ViewStateChangeEvent) => void;
    onZoomEnd?: (e: ViewStateChangeEvent) => void;
    onRotateStart?: (e: ViewStateChangeEvent) => void;
    onRotate?: (e: ViewStateChangeEvent) => void;
    onRotateEnd?: (e: ViewStateChangeEvent) => void;
    onPitchStart?: (e: ViewStateChangeEvent) => void;
    onPitch?: (e: ViewStateChangeEvent) => void;
    onPitchEnd?: (e: ViewStateChangeEvent) => void;
    onWheel?: (e: MapWheelEvent) => void;
    onBoxZoomStart?: (e: MapBoxZoomEvent) => void;
    onBoxZoomEnd?: (e: MapBoxZoomEvent) => void;
    onBoxZoomCancel?: (e: MapBoxZoomEvent) => void;
    onResize?: (e: MapboxEvent) => void;
    onLoad?: (e: MapboxEvent) => void;
    onRender?: (e: MapboxEvent) => void;
    onIdle?: (e: MapboxEvent) => void;
    onError?: (e: ErrorEvent) => void;
    onRemove?: (e: MapboxEvent) => void;
    onData?: (e: MapStyleDataEvent | MapSourceDataEvent) => void;
    onStyleData?: (e: MapStyleDataEvent) => void;
    onSourceData?: (e: MapSourceDataEvent) => void;
};
/**
 * A wrapper for mapbox-gl's Map class
 */
export default class Mapbox {
    private _MapClass;
    private _map;
    props: MapboxProps;
    private _renderTransform;
    private _internalUpdate;
    private _inRender;
    private _hoveredFeatures;
    private _deferredEvents;
    static savedMaps: Mapbox[];
    constructor(MapClass: typeof MapboxMap, props: MapboxProps, container: HTMLDivElement);
    get map(): MapboxMap;
    get transform(): Transform;
    setProps(props: MapboxProps): void;
    static reuse(props: MapboxProps, container: HTMLDivElement): Mapbox;
    _initialize(container: HTMLDivElement): void;
    recycle(): void;
    destroy(): void;
    redraw(): void;
    _updateSize(nextProps: MapboxProps): boolean;
    _updateViewState(nextProps: MapboxProps, triggerEvents: boolean): boolean;
    _updateSettings(nextProps: MapboxProps, currProps: MapboxProps): boolean;
    _updateStyle(nextProps: MapboxProps, currProps: MapboxProps): boolean;
    _updateStyleComponents(nextProps: MapboxProps, currProps: MapboxProps): boolean;
    _updateHandlers(nextProps: MapboxProps, currProps: MapboxProps): boolean;
    _onEvent: (e: MapboxEvent) => void;
    _updateHover(e: MapMouseEvent): void;
    _onPointerEvent: (e: MapLayerMouseEvent | MapLayerTouchEvent) => void;
    _onCameraEvent: (e: ViewStateChangeEvent) => void;
    _fireEvent(baseFire: Function, event: string | MapboxEvent, properties?: object): any;
    _onBeforeRepaint(): void;
    _onAfterRepaint: () => void;
}
