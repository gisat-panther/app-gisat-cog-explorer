"use client"

import { DeckGlMap } from "@gisatcz/ptr-maps";
import { useRef, useState, useCallback } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../utils/url'

import CogBitmapParams from '@/data/CogBitmapParams'
// import params from "@/data/CogBitmapParams";

// https://gisat-gis.eu-central-1.linodeobjects.com/esaGdaAdbNepal23/rasters/snow_cover_cog/WET_SNOW_3857_2017-2021_cog_deflate_in16_zoom16_levels8.tif
// https://gisat-gis.eu-central-1.linodeobjects.com/esaGdaAdbNepal23/rasters/sentinel_cog/2019-11-12-00_00_2019-11-12-23_59_Sentinel-2_L1C_SWIR_cog_nodata.tif

type LayerDefinition = {
  key: string;
  layerKey: string;
  name: string;
  options: {
    colorScale: string[];
    colorScaleValueRange: number[];
    useChannel?: number | undefined;
    url: undefined | string;
    type: string;
  };
  type: string;
}

function Map() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryStringCallback = useCallback(createQueryString, [searchParams])

  const versionRef = useRef(0)

  const cogUrlRef = useRef<string | undefined>()
  const cogUrl = searchParams.get('cogUrl')

  // params

  type params = {
    [key: string]: any
  }
  const dafaultParams: params = {};

  const paramsRef = useRef(dafaultParams)


  const channelRef = useRef<string | null>()
  const channel = searchParams.get('channel')

  // const useHeatMapRef = useRef(false)
  // const useHeatMap = searchParams.get('useHeatMap')


  const [cogBitmapLayer, setCogBitmapLayer] = useState<LayerDefinition | null>(null);

  const increaseLayerVersion = () => {
    versionRef.current = versionRef.current + 1
  }

  const getBoolValues = () => {

    const values: params = {
      // ...(useHeatMapRef.current ? { useHeatMap: useHeatMapRef.current } : {}),
    }

    for (const p of CogBitmapParams) {
      if (p.type === 'bool') {
        const isTrue = paramsRef.current[p.name] === 'true';
        if (p.defaultValue !== isTrue) {
          values[p.name] = isTrue;
        }
      }
    }

    return values;
  }

  const getParams = () => {
    const parsedChannel = Number.parseInt(channelRef.current || '');

    const values = {
      ...getBoolValues(),

      ...(Number.isFinite(parsedChannel) ? { useChannel: parsedChannel } : {}),
      colorScale: ['#fde725', '#5dc962', '#20908d', '#3a528b', '#440154'],
      colorScaleValueRange: [1, 100, 200, 300, 366],
    }
    return values;
  }

  const initLayer = () => {
    increaseLayerVersion()

    const params = getParams()

    console.log("xxx_params", params);


    const layerDefinition: LayerDefinition = {
      key: `CogBitmapLayer_${versionRef.current}`,
      layerKey: `CogBitmapLayer_${versionRef.current}`,
      name: 'CogBitmapLayer_',
      options: {
        url: cogUrlRef.current,
        type: 'image',
        ...params,
      },
      type: 'cog-bitmap',
    }


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
  // if (useHeatMapRef.current !== useHeatMap) {
  //   useHeatMapRef.current = useHeatMap;
  //   initLayer();
  // }

  const changeRef = useRef(false);

  for (const p of CogBitmapParams) {
    if (searchParams.has(p.name)) {
      if (paramsRef.current[p.name] !== searchParams.get(p.name)) {
        changeRef.current = true
        paramsRef.current[p.name] = searchParams.get(p.name);
      }
    } else {
      if (paramsRef.current[p.name] !== p.defaultValue) {
        changeRef.current = true
        paramsRef.current[p.name] = p.defaultValue
      }
    }
  }

  if (changeRef.current === true) {
    initLayer();
    console.log("xxx_paramsRef", paramsRef.current);

    changeRef.current = false
  }

  const lon = searchParams.get('lon') || ''
  const lat = searchParams.get('lat') || ''
  const boxRange = searchParams.get('boxRange')


  const initView: {
    center: {
      lon: number;
      lat: number;
    };
    boxRange: string | number;
  } = {
    center: { lon: Number.parseFloat(lon) || 50.35, lat: Number.parseFloat(lat) || 15.8 },
    boxRange: boxRange || 10000
  }

  console.log("xxx_initView", initView);


  const viewRef = useRef(initView)
  const [viewState, setViewState] = useState(initView)

  const onViewChange = (view: any) => {
    console.log("xxx", view);

    viewRef.current = {
      ...viewRef.current, ...view
    }

    setViewState(viewRef.current)

    const p1 = createQueryStringCallback('lon', viewRef.current.center.lon, Array.from(searchParams.entries()))
    const p2 = createQueryStringCallback('lat', viewRef.current.center.lat, Array.from(p1.entries()))
    const p3 = createQueryStringCallback('boxRange', viewRef.current.boxRange, Array.from(p2.entries()))

    router.push(pathname + '?' + p3.toString())
  }

  return <DeckGlMap
    view={{
      ...viewState
    }}
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