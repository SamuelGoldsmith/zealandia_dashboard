import ArcGISMap from "@/components/map";
import MapPanel from "@/components/map-panel";
import { TextBox } from "@/components/text-box";

function toggleLayer(layer: __esri.Layer) {
  layer.visible = !layer.visible;
}


export default function Map() {
  return (
    <div className="w-full h-5/10">

      <ArcGISMap id="bda891e30a384c4f9108fd9fdb6b07e9" />
    </div>
  );
}
