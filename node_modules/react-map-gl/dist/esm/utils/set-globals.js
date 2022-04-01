const globalSettings = [
    'baseApiUrl',
    'maxParallelImageRequests',
    'workerClass',
    'workerCount',
    'workerUrl'
];
export default function setGlobals(mapLib, props) {
    for (const key of globalSettings) {
        if (key in props) {
            mapLib[key] = props[key];
        }
    }
    if (props.RTLTextPlugin &&
        mapLib.getRTLTextPluginStatus &&
        mapLib.getRTLTextPluginStatus() === 'unavailable') {
        mapLib.setRTLTextPlugin(props.RTLTextPlugin, (error) => {
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, false);
    }
}
//# sourceMappingURL=set-globals.js.map