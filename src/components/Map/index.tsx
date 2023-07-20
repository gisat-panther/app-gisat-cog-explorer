"use client"

import { DeckGlMap } from "@gisatcz/ptr-maps";
import { useRef, useState } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../utils/url'
import { useCallback } from 'react'

// https://gisat-gis.eu-central-1.linodeobjects.com/esaGdaAdbNepal23/rasters/snow_cover_cog/WET_SNOW_3857_2017-2021_cog_deflate_in16_zoom16_levels8.tif
// https://gisat-gis.eu-central-1.linodeobjects.com/esaGdaAdbNepal23/rasters/sentinel_cog/2019-11-12-00_00_2019-11-12-23_59_Sentinel-2_L1C_SWIR_cog_nodata.tif

function Map() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryStringCallback = useCallback(createQueryString, [searchParams])

  const versionRef = useRef(0)

  const cogUrlRef = useRef()
  const cogUrl = searchParams.get('cogUrl')

  // params
  const channelRef = useRef()
  const channel = searchParams.get('channel')

  const useHeatMapRef = useRef(false)
  const useHeatMap = searchParams.get('useHeatMap')


  const [cogBitmapLayer, setCogBitmapLayer] = useState(null);

  const increaseLayerVersion = () => {
    versionRef.current = versionRef.current + 1
  }

  const initLayer = () => {
    increaseLayerVersion()
    const parsedChannel = Number.parseInt(channelRef.current);


    console.log("xxx", parsedChannel, Number.isFinite(parsedChannel));
    const layerDefinition = {
      key: `CogBitmapLayer_${versionRef.current}`,
      layerKey: `CogBitmapLayer_${versionRef.current}`,
      name: 'CogBitmapLayer_',
      options: {
        url: cogUrlRef.current,
        type: 'image',
        ...(Number.isFinite(parsedChannel) ? { useChannel: parsedChannel } : {}),
        ...(useHeatMapRef.current ? { useHeatMap: useHeatMapRef.current } : {}),
        colorScale: ['#fde725', '#5dc962', '#20908d', '#3a528b', '#440154'],
        colorScaleValueRange: [1, 100, 200, 300, 366],
      },
      type: 'cog-bitmap',
    }

    console.log("xxx", layerDefinition);


    setCogBitmapLayer(layerDefinition)
  }

  if (cogUrl && cogUrlRef.current !== cogUrl) {
    cogUrlRef.current = cogUrl;
    initLayer();
  }

  if (channelRef.current !== channel) {
    channelRef.current = channel;
    initLayer();
  }
  if (useHeatMapRef.current !== useHeatMap) {
    useHeatMapRef.current = useHeatMap;
    initLayer();
  }

  const lon = searchParams.get('lon')
  const lat = searchParams.get('lat')
  const boxRange = searchParams.get('boxRange')


  const initView = {
    center: { lon: Number.parseFloat(lon) || 50.35, lat: Number.parseFloat(lat) || 15.8 },
    boxRange: boxRange || 10000
  }

  console.log("xxx_initView", initView);


  const viewRef = useRef(initView)
  const [viewState, setViewState] = useState(initView)

  const onViewChange = (view) => {
    console.log("xxx", view);

    viewRef.current = {
      ...viewRef.current, ...view
    }

    setViewState(viewRef.current)

    const p1 = createQueryStringCallback('lon', viewRef.current.center.lon, searchParams)
    const p2 = createQueryStringCallback('lat', viewRef.current.center.lat, p1)
    const p3 = createQueryStringCallback('boxRange', viewRef.current.boxRange, p2)

    router.push(pathname + '?' + p3.toString())
  }

  return <DeckGlMap
    view={
      ...viewState
    }
    backgroundLayer={{
      key: 'background-osm',
      type: 'wmts',
      options: {
        url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      }
    }}
    layers={[
      ...(cogBitmapLayer && cogUrl ? [cogBitmapLayer] : [])
    ]}
    onViewChange={onViewChange}
  // Tooltip={CustomTooltip}
  />
}

export default Map;