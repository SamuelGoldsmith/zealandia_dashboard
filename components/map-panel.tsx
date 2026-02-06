"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Layer from "@arcgis/core/layers/Layer";
import Legend from "./legend";
import { SidePanel } from "./side-panel";

const ArcGISMap = dynamic(() => import("./map"), { ssr: false });

export default function MapPanel({ id }: { id: string }) {
  const [layers, setLayers] = useState<Layer[]>([]);

  const toggle = (layer: Layer) => {
    layer.visible = !layer.visible;
    setLayers([...layers]);
  };

  return (
    <div className="flex h-full">
      <SidePanel> 
        <div className="space-y-2">
          <h3 className="font-semibold">Layers</h3>
          {layers.map((layer) => (
            <label key={layer.id} className="flex gap-2">
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={() => toggle(layer)}
              />
              {layer.title}
            </label>
          ))}
        </div>
      </SidePanel>

      {/* Map takes full remaining space */}
      <div className="flex-1 h-full">
        <ArcGISMap id={id} onLayersLoaded={setLayers} />
      </div>
    </div>
  ); 
}
