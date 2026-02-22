"use client";

import Layer from "@arcgis/core/layers/Layer";
import {
  SimpleRenderer,
  UniqueValueRenderer,
  ClassBreaksRenderer,
} from "@arcgis/core/renderers";

import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import {DataLayer} from "@/lib/utils"
type Props = {
  layers: DataLayer[];
};

/**
 * Custom Legend component
 * Works with Simple / Unique Value / Class Break renderers
 */
export default function Legend({ layers }: Props) {
  if (!layers?.length) return null;

  return (
    <div className="space-y-4 text-sm">
      {layers.map((dLayer) => {
        if (!(dLayer.layer as any).renderer) return null;

        const items = getLegendItems(dLayer.layer);
        if (!items.length) return null;

        return (
          <div key={dLayer.id}>
            <h4 className="font-semibold mb-1">{dLayer.title}</h4>
            <ul className="space-y-1">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <SymbolSwatch symbol={item.symbol} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Helpers (inline) ---------- */

function getLegendItems(layer: Layer) {
  const renderer = (layer as any).renderer;
  if (!renderer) return [];

  if (renderer instanceof SimpleRenderer) {
    return [
      {
        label: layer.title,
        symbol: renderer.symbol,
      },
    ];
  }

  if (renderer instanceof UniqueValueRenderer) {
    return (renderer.uniqueValueInfos ?? []).map((info) => ({
      label: info.label ?? String(info.value),
      symbol: info.symbol,
    }));
  }

  if (renderer instanceof ClassBreaksRenderer) {
    return (renderer.classBreakInfos ?? []).map((info) => ({
      label: info.label,
      symbol: info.symbol,
    }));
  }

  return [];
}

function SymbolSwatch({ symbol }: { symbol?: __esri.Symbol | null }) {
  if (!symbol) return null;


  if (symbol instanceof PictureMarkerSymbol) {
    const url = symbol.url;
    if (!url) return null;
    return (
      <img
        src={url}
        alt=""
        className="w-5 h-5 object-contain"
      />
    );
  }

  // Point
  if (symbol instanceof SimpleMarkerSymbol) {
    return (
      <div
        className="w-4 h-4 rounded-full border"
        style={{
          backgroundColor: (symbol.color as any)?.toCss(),
          borderColor: (symbol.outline as any)?.color?.toCss(),
        }}
      />
    );
  }

  // Line
  if (symbol instanceof SimpleLineSymbol) {
    return (
      <div
        className="w-6 h-1"
        style={{
          backgroundColor: (symbol.color as any)?.toCss(),
        }}
      />
    );
  }

  // Polygon
  if (symbol instanceof SimpleFillSymbol) {
    return (
      <div
        className="w-4 h-4 border"
        style={{
          backgroundColor: (symbol.color as any)?.toCss(),
          borderColor: (symbol.outline as any)?.color?.toCss(),
        }}
      />
    );
  }

  return null;
}
