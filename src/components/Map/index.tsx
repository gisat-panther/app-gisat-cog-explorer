"use client"

import { DeckGlMap } from "@gisatcz/ptr-maps";

export default function Map() {
  return <DeckGlMap
    view={{
      center: { lat: 50.35, lon: 15.8 },
      boxRange: 10000
    }}
    backgroundLayer={{
      key: 'background-osm',
      type: 'wmts',
      options: {
        url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      }
    }}
  // layers={[
  //   key: 'points',
  //   type: 'vector',
  //   options: {
  //     features: largePointDataFeatures,
  //     style: pointStyleAsMarkers,
  //     fidColumnName: 'gid',
  //     pointAsMarker: true
  // 	hoverable: true
  //   },
  // ]}
  // Tooltip={CustomTooltip}
  />
}
