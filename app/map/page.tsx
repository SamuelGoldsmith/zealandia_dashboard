import ArcGISMap from "@/components/map";
import MapPanel from "@/components/map-panel";
import { TextBox } from "@/components/text-box";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

function toggleLayer(layer: __esri.Layer) {
  layer.visible = !layer.visible;
}


export default function Map() {
  return (
    <div className="">
        <TextBox text="The data displayed is sourced from various open source databases. Use the side panel to manage data displays and access source data." type="dark" className="m-5"/>
     {/* 478e035e0bdc4c90af9110408c92d997 */}
    <MapPanel id="bda891e30a384c4f9108fd9fdb6b07e9" />
    </div>
  );
}
