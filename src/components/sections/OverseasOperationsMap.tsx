"use client";

import React, { memo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";

const geoUrl = "/maps/world.json";

const markers = [
  { markerOffset: 20, name: "Sultanate Of Oman", coordinates: [57.0, 23.5] as [number, number] },
  { markerOffset: -15, name: "U.A.E (Dubai)", coordinates: [55.27, 25.20] as [number, number] },
  { markerOffset: -15, name: "Kingdom of Saudi Arabia", coordinates: [46.71, 24.71] as [number, number] }
];

export const OverseasOperationsMap = memo(() => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-white dark:bg-[#0a1128] border border-black dark:border-blue-900/30 flex items-center justify-center shadow-xl transition-colors duration-300">
      <div className="absolute top-0 left-0 p-8 z-10 pointer-events-none">
        <h3 className="font-editorial text-2xl text-black dark:text-white">Overseas Operations</h3>
        <p className="text-black/80 dark:text-blue-100/60 font-switzer text-sm mt-2 max-w-xs">
          Expanding our global footprint with turnkey projects and specialized services across the GCC region.
        </p>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1400,
          center: [50, 24] // Center on Middle East / GCC
        }}
        className="w-full h-full outline-none"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const name = geo.properties?.name || geo.properties?.NAME;
              return (
                <g key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    stroke="currentColor"
                    strokeWidth={0.5}
                    className="fill-white hover:fill-black/5 stroke-black dark:fill-[#162033] dark:hover:fill-[#1e2d4a] dark:stroke-[#3b82f6] transition-colors duration-300 outline-none"
                  >
                    <title>{name || "Country"}</title>
                  </Geography>
                  {name && (
                    <Marker coordinates={centroid}>
                      <text
                        textAnchor="middle"
                        y={3}
                        style={{ pointerEvents: "none" }}
                        className="fill-black dark:fill-[#3b82f6] text-[10px] font-semibold opacity-100 dark:opacity-70 font-switzer transition-colors duration-300"
                      >
                        {name}
                      </text>
                    </Marker>
                  )}
                </g>
              );
            })
          }
        </Geographies>

        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <g className="group cursor-pointer">
              {/* Outer pulsing ring */}
              <circle r={12} className="fill-black dark:fill-[#3b82f6] animate-ping opacity-20" />
              {/* Inner dot */}
              <circle r={4} className="fill-black dark:fill-[#3b82f6] stroke-white dark:stroke-[#fff]" strokeWidth={1} />
              
              <foreignObject x={-100} y={markerOffset > 0 ? 10 : -50} width={200} height={40} className="overflow-visible pointer-events-none">
                <div className="flex justify-center items-center w-full h-full">
                  <div className="bg-black text-white dark:bg-[var(--color-obsidian)] dark:text-[var(--color-paper)] border border-black dark:border-[#3b82f6]/50 px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold shadow-2xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out transform-gpu origin-center font-switzer text-center whitespace-nowrap">
                    {name}
                  </div>
                </div>
              </foreignObject>
            </g>
          </Marker>
        ))}
      </ComposableMap>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#0a1128] to-transparent pointer-events-none transition-colors duration-300" />
    </div>
  );
});

OverseasOperationsMap.displayName = "OverseasOperationsMap";
