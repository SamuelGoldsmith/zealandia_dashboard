import {useEffect, useRef} from "react";
import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Layer from "@arcgis/core/layers/Layer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

type PointFeature = {
    id: string;
    x: number;
    y: number;
    title?: string;
    description?: string;
};

export default function HistoricMap({
                                        id,
                                        selectedId,
                                        setSelectedId,
                                        onLayersLoaded,
                                        onMapClick,
                                        points = [],
                                        basemap = "topo-vector",
                                    }: {
    id?: string;
    selectedId?: string;
    setSelectedId: (id: string) => void;
    onLayersLoaded: (layers: Layer[]) => void;
    onMapClick?: (data: any) => void;
    points?: PointFeature[];
    basemap?: string;
}) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<MapView | null>(null);
    const graphicsLayerRef = useRef<GraphicsLayer | null>(null);

    // used for zooming to a selected timeline point
    function zoomToPointById(pointId: string, zoomLevel = 15): void {
        const gLayer = graphicsLayerRef.current;

        const graphic = gLayer?.graphics.toArray().find((g: Graphic) => {
            const attrs = g.attributes as Record<string, unknown> | undefined;
            return String(attrs?.id) === pointId;
        });

        viewRef.current?.goTo({target: graphic, zoom: zoomLevel}).catch(() => {
        });

    }

    useEffect(() => {
        if (selectedId) {
            zoomToPointById(selectedId);
        }
    }, [selectedId]);

    useEffect(() => {
        if (!mapRef.current) return;

        // choose WebMap when `id` is provided, otherwise create a simple Map with a basemap
        const mapInstance = id
            ? new WebMap({portalItem: {id}})
            : new Map({basemap});

        // create view
        const view = new MapView({
            container: mapRef.current,
            map: mapInstance,
        });

        viewRef.current = view;

        // create graphics layer and add to the map
        const gLayer = new GraphicsLayer({title: "Historical points"});
        graphicsLayerRef.current = gLayer;
        view.map!.add(gLayer);

        /*
        async function addLayerByID(layerId: string) {
            const kLayer = await Layer.fromPortalItem({portalItem: {id: layerId}});
            view.map!.add(kLayer);
        }

        addLayerByID("66be186453d84308b26257021d6fb664")
        */
        view.when(() => {
            onLayersLoaded(view.map!.layers.toArray());

            // remove zoom buttons, compass and attribution text from the view UI
            try {
                view.ui.remove('zoom');
                view.ui.remove('compass');
                view.ui.remove('attribution');
            } catch (e) {
                // ignore if specific component ids aren't present
            }
            // also ensure components list doesn't include those entries
            view.ui.components = view.ui.components.filter(
                (c: string) => c !== 'zoom' && c !== 'compass' && c !== 'attribution'
            );

            // click handling with hitTest
            view.on("click", async (event) => {
                try {
                    const hit = await view.hitTest(event);
                    if (hit.results && hit.results.length) {
                        const r = hit.results[0];
                        const graphic = 'graphic' in r ? r.graphic : null;

                        setSelectedId(String(graphic?.attributes?.id));
                    }
                } catch (err) {
                    // forward a minimal payload on error
                    onMapClick?.({error: String(err)});
                }
            });
        });

        return () => {
            view.destroy();
            // cleanup global helper
            try {
                (window as any).__enableOnlyLayer = undefined;
            } catch {
            }
            graphicsLayerRef.current = null;
        }
    }, [id, basemap, onLayersLoaded, onMapClick, setSelectedId]);

    // update graphics when `points` changes
    useEffect(() => {
        const gLayer = graphicsLayerRef.current;
        const view = viewRef.current;
        if (!gLayer || !view) return;

        // clear existing graphics
        gLayer.removeAll();

        // simple marker symbol for all points (customize as needed)
        const symbol = new SimpleMarkerSymbol({
            style: "circle",
            color: [230, 84, 0],
            size: 10,
            outline: {color: [255, 255, 255], width: 1},
        });

        const graphics = points.map((p) => {
            const pt = new Point({x: p.x, y: p.y, spatialReference: {wkid: 4326}});
            console.log(p.x, p.y);
            const graphic = new Graphic({
                geometry: pt,
                symbol,
                attributes: {id: p.id, title: p.title, description: p.description},
            });
            return graphic;
        });

        if (graphics.length) gLayer.addMany(graphics);

    }, [points]);

    // expose a global helper to change basemap if needed
    useEffect(() => {
        if (viewRef.current) {
            (window as any).__changeBasemap = (bm: string) => {
                const v = viewRef.current!;
                if (v && v.map) {
                    (v.map as any).basemap = bm;
                }
            };
        }
    }, []);

    return <div ref={mapRef} className="w-full max-w-full h-full"/>;
}