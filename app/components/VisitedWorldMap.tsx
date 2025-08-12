"use client";

import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";

type Visit = { code: string; dates: string[] };

// A2 -> ISO3N (numeric) codes used by world-atlas@2 countries-110m.json
const A2_TO_ISO3N: Record<string, string> = {
  US: "840",
  IT: "380",
  FR: "250",
  ES: "724",
  CA: "124",
  MX: "484",
  IN: "356",
  AT: "040",
  CH: "756",
  SK: "703",
  SG: "702",
  BH: "048",
  OM: "512",
  DE: "276",
};

const visits: Visit[] = [
  { code: "US", dates: ["2025-08-11"] },
  { code: "IT", dates: ["2024-08-26"] },
  { code: "FR", dates: ["2024-09-03"] },
  { code: "ES", dates: ["2024-08-29"] },
  { code: "CA", dates: ["2024-01-10"] },
  { code: "MX", dates: ["2024-03-25"] },
  { code: "IN", dates: ["2025-03-30"] },
  { code: "AT", dates: ["2025-07-29"] },
  { code: "CH", dates: ["2025-08-04"] },
  { code: "SK", dates: ["2025-07-30"] },
  { code: "SG", dates: ["2025-03-31"] },
  { code: "BH", dates: ["2024-08-26"] },
  { code: "OM", dates: ["2024-09-04"] },
  { code: "DE", dates: ["2025-08-26"] },
];

function latestIsoDate(dates: string[]): string {
  return dates.reduce((a, b) => (a > b ? a : b));
}

export default function VisitedWorldMap(): JSX.Element {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number}>(
    { coordinates: [0, 0], zoom: 1.2 }
  );

  // Build a Set of visited ISO3N ids (strings) and a lookup of latest dates by ISO3N
  const { visitedIds, latestByIso3n } = useMemo(() => {
    const latestByA2: Record<string, string> = {};
    for (const v of visits) {
      const latest = latestIsoDate(v.dates);
      latestByA2[v.code] = latestByA2[v.code]
        ? (latest > latestByA2[v.code] ? latest : latestByA2[v.code])
        : latest;
    }
    const byIso3n: Record<string, string> = {};
    for (const [a2, latest] of Object.entries(latestByA2)) {
      const iso3n = A2_TO_ISO3N[a2];
      if (iso3n) byIso3n[iso3n] = latest;
    }
    return { visitedIds: new Set(Object.keys(byIso3n)), latestByIso3n: byIso3n };
  }, []);

  const geoUrl = "https://unpkg.com/world-atlas@2/countries-50m.json";

  return (
    <div className="w-full border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <ComposableMap projectionConfig={{ scale: 170 }} style={{ width: "100%", height: "auto" }}>
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={(pos) => setPosition(pos)}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
              const id = String(geo.id); // numeric ISO3N as a string, e.g., "840"
              const props = geo.properties as any;
              const name = props?.NAME || props?.name || props?.ADMIN || "Unknown";
              const isVisited = visitedIds.has(id);
              const latest = latestByIso3n[id];
              const centroid = geoCentroid(geo as any) as [number, number];

                return (
                  <React.Fragment key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      onMouseEnter={() =>
                        setHoverText(isVisited && latest ? `${name}: last visited ${latest}` : name)
                      }
                      onMouseLeave={() => setHoverText(null)}
                      style={{
                        default: { fill: isVisited ? "#50C878" : "#f0f0f0", outline: "none" },
                        hover:   { fill: isVisited ? "#16a34a" : "#e5e5e5", outline: "none" },
                        pressed: { fill: isVisited ? "#15803d" : "#d9d9d9", outline: "none" },
                      }}
                    />
                    {isVisited && (
                      <Marker coordinates={centroid}>
                        <text
                          textAnchor="middle"
                          style={{ pointerEvents: "auto", cursor: "default" }}
                          fontSize={8}
                          onMouseEnter={() =>
                            setHoverText(
                              isVisited && latest ? `${name}: last visited ${latest}` : name
                            )
                          }
                          onMouseLeave={() => setHoverText(null)}
                        >
                          {"📍"}
                        </text>
                      </Marker>
                    )}
                  </React.Fragment>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {hoverText && (
        <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700">
          {hoverText}
        </div>
      )}

      <div
        className={`px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 ${
          hoverText ? "" : "border-t border-neutral-200 dark:border-neutral-700"
        }`}
      >
        Countries visited: {visitedIds.size}
      </div>
    </div>
  );
}
