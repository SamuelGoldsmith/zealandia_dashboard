"use client";

import { useEffect, useRef } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Layer from "@arcgis/core/layers/Layer";

export default function ArcGISMap({ id, onLayersLoaded, onMapClick }: { id: string; onLayersLoaded: (layers: Layer[]) => void; onMapClick?: (data: any) => void }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const webmap = new WebMap({
      portalItem: {
        id: id,
      },
    });

    const view = new MapView({
      container: mapRef.current,
      map: webmap,
    });

    viewRef.current = view;

    view.when(() => {
      onLayersLoaded(view.map!.layers.toArray());
      view.on("click", async (event) => {
        try {
          const hit = await view.hitTest(event);
          let payload: any = null;
          if (hit.results && hit.results.length) {
            const r = hit.results[0];
            const graphic = 'graphic' in r ? r.graphic : null;
            payload = {
              layerId: graphic?.layer?.id,
              attributes: graphic?.attributes ?? null,
              mapPoint: event.mapPoint ? { x: event.mapPoint.x, y: event.mapPoint.y, spatialReference: event.mapPoint.spatialReference?.wkid } : null,
            };
          } else {
            payload = { mapPoint: event.mapPoint ? { x: event.mapPoint.x, y: event.mapPoint.y } : null };
          }
          onMapClick?.(payload);
        } catch (err) {
          // forward a minimal payload on error
          onMapClick?.({ error: String(err) });
        }
      });
    });

    return () => view.destroy();
  }, [id, onLayersLoaded]);

  useEffect(() => {
    if (viewRef.current) {
      (window as any).__changeBasemap = (basemapName: string) => {
        if (viewRef.current && viewRef.current.map) {
          (viewRef.current.map as any).basemap = basemapName;
        }
      };
    }
  }, []);

  return <div ref={mapRef} className="w-full max-w-full h-[80vh]" />;
}
