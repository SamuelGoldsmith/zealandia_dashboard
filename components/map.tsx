"use client";

import { useEffect, useRef, useState } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Locate from "@arcgis/core/widgets/Locate";
import Popup from "@arcgis/core/widgets/Popup";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import { House, Ellipsis, ChevronLeft, ChevronRight } from "lucide-react";
import Layer from "@arcgis/core/layers/Layer";
import { PassThrough } from "stream";
import { Collapsible } from "radix-ui";
import { LayerCollapse } from "./collapsible";
import { Checkbox } from "./ui/checkbox";
import { isKLayer } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

type Props = {
  id: string;
  layerData: DataLayer[];
  filters: FilterLL;
};
interface FilterLL {
  name: string;
  next: FilterLL[];
}

interface DataLayer {
  id: string;
  title: string;
  description: string;
  links: string[];
  linkTitles: string[];
  tags: string[];
  layer: Layer;
}

export default function ArcGISMap({ id, layerData, filters }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const locateRef = useRef<HTMLDivElement | null>(null);
  const basemapRef = useRef<HTMLDivElement | null>(null);
  const trimClass = (name: string): string => {
    const numIndex = name.search('/');
    if (numIndex === -1) return name;
    return name.substring(0, numIndex);
  }
  const [layers, setLayers] = useState<DataLayer[]>([]);
  const [kOnly, setKOnly] = useState<boolean>(true)
  const isSubFilter = (filter: FilterLL, tags: string[]): boolean => {
    if (filter.name === "Home") return true;
    if (tags.some(t => t.toLowerCase() === filter.name.toLowerCase())) return true;
    return filter.next.some(f => isSubFilter(f, tags));
  }
  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;

    const webmap = new WebMap({
      portalItem: { id },
    });

    const popup = new Popup({
      container: popupRef.current,
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false,
        position: "bottom-right",
      },
    });

    const view = new MapView({
      container: mapRef.current,
      map: webmap,
      popup,
      ui: { components: [] },
    });

    // map widget add-ons
    const locate = new Locate({
      view: view,
      container: locateRef.current,
    });

    const toggle = new BasemapToggle({
      view,
      nextBasemap: "hybrid",
      container: basemapRef.current || undefined,
    });

    // Wait for map to load layers
    webmap.when(() => {
      const mapLayers = webmap.layers.toArray();
      const unknownLayers: DataLayer[] = [];
      layerData.forEach((data) => {
        const layer = mapLayers.find((l) => l.title === data.id);
        if (layer) {
          data.layer = layer;
        }
      });
      mapLayers.filter((l) => !layerData.some((d) => d.id === l.title)).forEach((l) => {
        unknownLayers.push({
          id: l.id,
          title: l.title ? l.title : l.id,
          description: "",
          links: [],
          linkTitles: [],
          tags: [],
          layer: l
        });
      });
      setLayers([...layerData, ...unknownLayers]);

    });

    return () => {
      view.destroy();
    };
  }, [id]);


  const toggleLayer = (dLayer: DataLayer) => {
    if (!dLayer.layer) return;
    dLayer.layer.visible = !dLayer.layer.visible;
    setLayers([...layers]);
  };

  const toggleKLayers = () => {
    for (const dL of layers) {
      dL.layer.visible = dL.layer.visible && (isKLayer(dL.id) || !kOnly)
    }
    setKOnly(!kOnly)
    setLayers([...layers])
  }
  const [activeFilter, setActiveFilter] = useState<FilterLL>(filters);
  const [prevFilter, setPrevFilter] = useState<FilterLL[]>([]);
  return (
    <div>
      <div className="h-[10vh] w-full flex bg-deep-brown text-primary items-center px-4">
        <button
          className="rounded-md px-4"
          onClick={() => {
            setActiveFilter(filters);
            setPrevFilter([]);
          }}><House size={20} className="" /></button>
        {prevFilter.length > 2 && (
          <button className="ml-2 hover:underline">
            <Ellipsis size={20} className="" />
          </button>
        )}
        {activeFilter.name !== "Home" && (
          <button className="ml-4 text-primary flex hover:underline" onClick={() => {
            const prev = prevFilter.pop();
            if (prev) {
              setActiveFilter(prev);
            }
          }}>
            {prevFilter.length > 1 ? trimClass(prevFilter[prevFilter.length - 1].name) : ""}
            <ChevronLeft className="ml-4" />
          </button>
        )}
        <p className="ml-4 font-bold">{activeFilter.name !== "Home" ? trimClass(activeFilter.name) : ""}</p>
        {activeFilter.next.length > 0 && (
          // <ChevronRight className="ml-2" />
          <div className="h-[3vh] border-l border-primary ml-4" />
        )}
        {activeFilter.next.map((f) => (
          <button className="ml-4 text-primary hover:underline hover:pointer hover:text-lg transition-all duration-3" key={f.name} onClick={() => {
            setPrevFilter(prevFilter.concat(activeFilter));
            setActiveFilter(f);
          }}>
            {trimClass(f.name)}
          </button>
        ))}
        <Switch className=" ml-auto mr-3 data-[state=checked]:bg-takahe-60 bg-gray-600" onCheckedChange={toggleKLayers} defaultChecked = {kOnly}/> <Label>Catchment Only</Label>
      </div>
      <div className="flex h-[73vh] w-screen">
        <div className="w-1/5 h-full bg-white p-2 rounded shadow z-10  overflow-auto">
          <div className="mb-1 flex w-full items-center justify-between"><h2 className="mr-auto">Layers</h2></div>
          {layers.filter((l) => isSubFilter(activeFilter, l.tags) && (isKLayer(l.id) || isKLayer(l.title) || !kOnly)).map((dLayer) => (
            <label key={dLayer.id} className="flex items-center gap-2 text-sm border p-2 h-auto bg-takahe-10">
              <Checkbox checked={dLayer.layer?.visible ?? false} onCheckedChange={() => toggleLayer(dLayer)} className="mb-auto mt-2 border-2 border-takahe bg-white data-[state=checked]:bg-takahe data-[state=checked]:border-takahe text-white" disabled={!dLayer.layer} />
              <LayerCollapse title={dLayer.title} description={dLayer.description} links={dLayer.links} linkTitles={dLayer.linkTitles} />
            </label>
          ))}

        </div>
        <div ref={mapRef} className="flex-1 relative z-0">
          <div ref={locateRef} className={'absolute left-2 top-2 bg-nav-blue hover:scale-125'} />
          <div ref={popupRef} className={`absolute right-0 bottom-0 w-96 bg-white overflow-scroll max-h-full z-10 rounded-sm border-x-3 border-deep-brown shadow-md`} />
          <div ref={basemapRef} className="" />
        </div>
      </div>
    </div>
  );
}
