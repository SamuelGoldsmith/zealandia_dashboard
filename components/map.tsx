"use client";
//https://docs.google.com/spreadsheets/d/e/2PACX-1vT0AFqyUMbOY1ZLyCHP4YE2Gl7rTxb3e5AWCYkRoKmVloPIc0DRd9vG2GbQXShJz3maid58PZzXh52A/pub?gid=0&single=true&output=csv
import { useEffect, useRef, useState } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Popup from "@arcgis/core/widgets/Popup";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import { House, Ellipsis, ChevronLeft, ChevronRight } from "lucide-react";
import Layer from "@arcgis/core/layers/Layer";

type Props = {
  id: string;
};
interface FilterLL {
  name: string;
  next: FilterLL[];
}

interface DataLayer {
  id: string;
  title: string;
  description: string;
  link: string;
  layer: Layer;
}

const filters: FilterLL = {
  name: "Home",
  next: [
    {
      name: "The People",
      next: [
        { name: "Infrastructure", next: [
          { name: "Water", next: [
            { name: "Stormwater", next: [] },
            { name: "Other", next: [] },
          ] },
          { name: "Buildings", next: [
            { name: "Residential", next: [] },
            { name: "Commercial", next: [] },
            { name: "Industrial", next: [] },
          ] },
          { name: "Utility", next: [
            { name: "Power", next: [
              { name: "Renewable", next: [] },
              { name: "Non-renewable", next: [] },
              { name: "Other", next: [] },
            ] },
            { name: "Waste", next: [] },
            { name: "Other", next: [] },
          ] },
        ] },
        { name: "Restoration", next: [
          { name: "Bush", next: [] },
          { name: "Animal", next: [
            { name: "Reintroduction", next: [] },
            { name: "Predator Control", next: [] },
          ] },
          { name: "Water Quality", next: [] },
          { name: "Other", next: [] },
        ] },
        { name: "Community", next: [] },
      ]
    },
    { name: "The Forest", next: [
      { name: "Plants", next: [
        { name: "Trees", next: [] },
        { name: "Shrubs", next: [] },
        { name: "Other", next: [] },
      ]},
      { name: "Animals", next: [
        { name: "Birds", next: [] },
        { name: "Insects", next: [] },
        { name: "Mammals", next: [] },
        { name: "Reptiles", next: [] },
        { name: "Molusks", next: [] },
        { name: "Other", next: [] },
      ]}
    ]},
    { name: "The Stream", next: []},
  ] 
}

export default function ArcGISMap({ id }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const basemapRef = useRef<HTMLDivElement | null>(null);

 const [layers, setLayers] = useState<Layer[]>([]);

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

    const toggle = new BasemapToggle({
      view,
      nextBasemap: "hybrid",
      container: basemapRef.current || undefined,
    });

    // Wait for map to load layers
    webmap.when(() => {
      setLayers(webmap.layers.toArray());
    });

    return () => {
      view.destroy();
    };
  }, [id]);


const toggleLayer = (layer: Layer) => {
  layer.visible = !layer.visible;
  setLayers([...layers]); // refresh React UI
};

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
      }}><House size={20} className=""/></button>
      {prevFilter.length > 2 && (
        <button className="ml-2 hover:underline">
          <Ellipsis size={20} className=""/>
        </button>
      )}
      {activeFilter.name !== "Home" && (
        <button className="ml-4 text-primary flex hover:underline" onClick={() => {
          const prev = prevFilter.pop();
          if (prev) {
            setActiveFilter(prev);
          }
        }}>
          {prevFilter.length > 1 ? prevFilter[prevFilter.length - 1].name : ""}
          <ChevronLeft className="ml-4"/>
        </button>
      )}
      <p className="ml-4 font-bold">{activeFilter.name !== "Home" ? activeFilter.name : ""}</p>
      {activeFilter.next.length > 0 && (
        // <ChevronRight className="ml-2" />
        <div className="h-[3vh] border-l border-primary ml-4"/>
      )}
      {activeFilter.next.map((f) => (
        <button className="ml-4 text-primary hover:underline hover:pointer hover:text-lg transition-all duration-3" key={f.name} onClick={() => {
          setPrevFilter(prevFilter.concat(activeFilter));
          setActiveFilter(f);
        }}>
          {f.name}
        </button>
      ))}
    </div>
    <div className="flex h-[73vh] w-screen">
      <div className="w-1/5 h-full bg-white p-2 rounded shadow z-10  overflow-auto">
        <div className="font-semibold mb-1">Layers</div>
          {layers.map((layer) => (
            <label key={layer.id} className="flex items-center gap-2 text-sm">
              <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => toggleLayer(layer)}
            />
            {layer.title}
           </label>
          ))}
      </div>
      <div ref={mapRef} className="flex-1 relative">
        <div ref={popupRef} className={`absolute right-0 bottom-0 w-96 bg-white overflow-scroll max-h-full z-10 rounded-sm border-x-3 border-deep-brown shadow-md`}/>
        <div ref={basemapRef} className="" />
      </div>
    </div>
    </div>
  );
}
