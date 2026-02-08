"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useCallback } from "react";
import Layer from "@arcgis/core/layers/Layer";
import Legend from "./legend";
import { SidePanel } from "./side-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ArcGISMap = dynamic(() => import("./map"), { ssr: false });

export default function MapPanel({ id }: { id: string }) {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Layers");
  const [clickedData, setClickedData] = useState<any>(null);
  const attributes = useMemo(() => {
    return clickedData?.attributes ? Object.entries(clickedData.attributes).filter(([, v]) => v !== null && v !== undefined) : [];
  }, [clickedData]);

  const isImageUrl = (v: any) => typeof v === "string" && /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(v);
  const isUrl = (v: any) => typeof v === "string" && /^https?:\/\//i.test(v);

  const formatValue = useCallback((v: any) => {
    if (v === null || v === undefined) return "";
    if (isImageUrl(v)) return (<img src={v} alt="img" className="max-w-full max-h-24 rounded" />);
    if (isUrl(v)) return (<a className="text-blue-500 underline" href={v} target="_blank" rel="noreferrer">{v}</a>);
    // ISO date detection
    if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v)) {
      try { return new Date(v).toLocaleString(); } catch { /* fallthrough */ }
    }
    return String(v);
  }, []);

  const copyJson = useCallback(() => {
    if (!clickedData) return;
    navigator.clipboard?.writeText(JSON.stringify(clickedData, null, 2));
  }, [clickedData]);

  const downloadCsv = useCallback(() => {
    if (!attributes || !attributes.length) return;
    const rows = attributes.map(([k, v]) => `"${String(k).replace(/"/g, '""')}","${String(v ?? "").replace(/"/g, '""')}"`);
    const csv = ["key,value", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feature-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [attributes]);
  const toggle = (layer: Layer) => {
    layer.visible = !layer.visible;
    setLayers([...layers]);
  };

  return (
    <div className="flex h-full">
  
      <SidePanel className="overflow-y-auto max-h-full w-64 bg-primary"> 
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full ">
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
          <TabsContent value="BaseMap" className="w-64 h-full">
            <div className="space-y-2">
              <button onClick={() => (window as any).__changeBasemap?.('streets-vector')} className="w-full px-3 py-2 text-sm bg-secondary rounded hover:bg-secondary/80">Streets</button>
              <button onClick={() => (window as any).__changeBasemap?.('satellite')} className="w-full px-3 py-2 text-sm bg-secondary rounded hover:bg-secondary/80">Satellite</button>
              <button onClick={() => (window as any).__changeBasemap?.('topo-vector')} className="w-full px-3 py-2 text-sm bg-secondary rounded hover:bg-secondary/80">Topographic</button>
              <button onClick={() => (window as any).__changeBasemap?.('hybrid')} className="w-full px-3 py-2 text-sm bg-secondary rounded hover:bg-secondary/80">Hybrid</button>
              <button onClick={() => (window as any).__changeBasemap?.('dark-gray-vector')} className="w-full px-3 py-2 text-sm bg-secondary rounded hover:bg-secondary/80">Dark Gray</button>
              <button onClick={() => (window as any).__changeBasemap?.('gray-vector')} className="w-full px-3 py-2 text-sm bg-secondary rounded hover:bg-secondary/80">Light Gray</button>
            </div>
          </TabsContent>
          <TabsContent value="Raw Data" className="w-64 h-full">
            <div className="p-2">
              {!clickedData && <p className="text-sm">Click on the map to view feature data here.</p>}

              {clickedData && (
                <div className="space-y-2">
                  {/* <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Layer:</div>
                      <div className="font-medium text-sm">{clickedData.layerId ?? 'Map point'}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={copyJson} className="px-2 py-1 text-xs bg-secondary rounded">Copy JSON</button>
                      <button onClick={downloadCsv} className="px-2 py-1 text-xs bg-secondary rounded">Download CSV</button>
                    </div>
                  </div> */}

                  <div className="max-h-64 overflow-auto border rounded p-2 bg-card">
                    {attributes.length ? (
                      <table className="w-full text-sm">
                        <tbody>
                          {attributes.map(([k, v]) => (
                            <tr key={String(k)} className="align-top border-b last:border-b-0">
                              <td className="pr-2 text-xs text-muted-foreground font-medium w-1/3 align-top">{k}</td>
                              <td className="py-1">{formatValue(v)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-xs">No attributes returned for this click.</div>
                    )}
                  </div>

                  {clickedData.mapPoint && (
                    <div className="text-xs text-muted-foreground">Coordinates: {Number(clickedData.mapPoint.x).toFixed(4)}, {Number(clickedData.mapPoint.y).toFixed(4)}</div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
            </div>
        </Tabs>

      </SidePanel>

      {/* Map takes full remaining space */}
      <div className="flex-1 h-full w-auto overflow-hidden">
        <ArcGISMap id={id} onLayersLoaded={setLayers} onMapClick={(data) => { setClickedData(data); setActiveTab("Raw Data"); }} />
      </div>
    </div>
  ); 
}
