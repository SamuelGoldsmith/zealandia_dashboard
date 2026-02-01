"use client";

import { useEffect, useRef } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Layer from "@arcgis/core/layers/Layer";

export default function ArcGISMap({ id, onLayersLoaded }: { id: string; onLayersLoaded: (layers: Layer[]) => void }) {
  const mapRef = useRef<HTMLDivElement>(null);

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

    view.when(() => {
      onLayersLoaded(view.map!.layers.toArray());
    });

    return () => view.destroy();
  }, [id, onLayersLoaded]);

  return <div ref={mapRef} className="w-full h-150" />;
}
