"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Layer from "@arcgis/core/layers/Layer";
import Legend from "./legend";
import { SidePanel } from "./side-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ArcGISMap = dynamic(() => import("./map"), { ssr: false });

export default function MapPanel({ id }: { id: string }) {
  const [layers, setLayers] = useState<Layer[]>([]);

  const toggle = (layer: Layer) => {
    layer.visible = !layer.visible;
    setLayers([...layers]);
  };

  return (
    <div className="flex h-full">
  
      <SidePanel className="overflow-y-auto max-h-full w-64 bg-primary"> 
        <Tabs defaultValue="Layers" className="w-full ">
          <TabsList className="fixed">
            <div className="flex-wrap bg-primary w-full p-1 ">
            <TabsTrigger value="Layers">Layers</TabsTrigger>
            <TabsTrigger value="Legend">Legend</TabsTrigger>
            <TabsTrigger value="BaseMap">Base Map</TabsTrigger>
            <TabsTrigger value="Raw Data">Data</TabsTrigger></div>
          </TabsList>
          <div className="p-7 w-full" />
          <div className="max-h-150 overflow-scroll w-full" >
          <TabsContent value="Layers" className="w-64 h-full">
          <div className="space-y-2 w-64">
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
          </TabsContent>
          <TabsContent value="Legend" className="w-64 h-full"><Legend layers={layers} /></TabsContent>
          <TabsContent value="BaseMap" className="w-64 h-full"><p>Base Map options coming soon!</p></TabsContent>
          <TabsContent value="Raw Data" className="w-64 h-full"><p>Raw Data coming soon!</p></TabsContent>
            </div>
        </Tabs>

      </SidePanel>

      {/* Map takes full remaining space */}
      <div className="flex-1 h-full w-auto overflow-hidden">
        <ArcGISMap id={id} onLayersLoaded={setLayers} />
      </div>
    </div>
  ); 
}
