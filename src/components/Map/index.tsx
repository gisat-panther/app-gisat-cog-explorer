"use client"

import { DeckGlMap } from "@gisatcz/ptr-maps";
import { useRef, useState, useCallback } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../utils/url'

import CogBitmapParams from '@/data/CogBitmapParams'

// https://gisat-gis.eu-central-1.linodeobjects.com/esaGdaAdbNepal23/rasters/snow_cover_cog/WET_SNOW_3857_2017-2021_cog_deflate_in16_zoom16_levels8.tif
// https://gisat-gis.eu-central-1.linodeobjects.com/esaGdaAdbNepal23/rasters/sentinel_cog/2019-11-12-00_00_2019-11-12-23_59_Sentinel-2_L1C_SWIR_cog_nodata.tif


// examples 
// http://localhost:3000/?clippedColor=&cogUrl=https%3A%2F%2Fgisat-gis.eu-central-1.linodeobjects.com%2FesaGdaAdbNepal23%2Frasters%2Fsentinel_cog%2F2019-11-12-00_00_2019-11-12-23_59_Sentinel-2_L1C_SWIR_cog_nodata.tif&lon=85.70264435525064&lat=27.379418295887426&boxRange=168129.3641191289&useChannel=1&useHeatMap=true&color=&useSingleColor=false&colorScale=%23fde725%2C%235dc962%2C%2320908d%2C%233a528b%2C%23440154&colorScaleValueRange=1%2C100%2C200%2C300%2C366&useAutoRange=false

type LayerDefinition = {
  key: string;
  layerKey: string;
  name: string;
  options: {
    colorScale?: string[];
    colorScaleValueRange?: number[];
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

  const [cogBitmapLayer, setCogBitmapLayer] = useState<LayerDefinition | null>(null);

  const increaseLayerVersion = () => {
    versionRef.current = versionRef.current + 1
  }

  const getBoolValues = () => {

    const values: params = {}

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

  const getNumberValues = () => {

    const values: params = {}

    for (const p of CogBitmapParams) {
      if (p.type === 'number') {
        const parsed = Number.parseFloat(paramsRef.current[p.name]);

        if (searchParams.has(p.name) && Number.isFinite(parsed) && parsed !== p.defaultValue) {
          values[p.name] = parsed
        }
      }
    }

    return values;
  }

  const getAsColor = (string: string) => {
    try {
      const parsed = string.split(",");
      if (parsed && parsed.length === 4) {
        const numericColor = parsed.map(n => Number.parseInt(n) || n)
        if (numericColor.every(i => Number.isFinite(i))) {
          return numericColor
        } else {
          return null
        }
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  const getAsArray = (string: string) => {
    try {
      const parsed = string.split(",");
      if (parsed && parsed.length > 2) {
        const withNumbers = parsed.map(n => Number.parseInt(n) || n)
        return withNumbers
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  const getColorValues = () => {

    const values: params = {}

    for (const p of CogBitmapParams) {
      if (p.type === 'color') {
        const asColor = getAsColor(paramsRef.current[p.name])
        if (asColor) {
          values[p.name] = asColor
        }
      }
    }

    return values;
  }

  const getArrayValues = () => {

    const values: params = {}

    for (const p of CogBitmapParams) {
      if (p.type === 'array') {
        const asArray = getAsArray(paramsRef.current[p.name])
        if (asArray) {
          values[p.name] = asArray
        }
      }
    }

    return values;
  }

  const getParams = () => {
    const values = {
      ...getBoolValues(),
      ...getNumberValues(),
      ...getColorValues(),
      ...getArrayValues(),

      // colorScale: ['#fde725', '#5dc962', '#20908d', '#3a528b', '#440154'],
      // colorScaleValueRange: [1,100,200,300,366],
    }
    return values;
  }

  const initLayer = () => {
    increaseLayerVersion()

    const params = getParams()

    console.log("FINAL_COG_PATAMS", params);


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
    center: { lon: Number.parseFloat(lon) || 14.35, lat: Number.parseFloat(lat) || 49.92 },
    boxRange: boxRange || 94088
  }

  const viewRef = useRef(initView)
  const [viewState, setViewState] = useState(initView)

  const onViewChange = (view: any) => {
    viewRef.current = {
      ...viewRef.current, ...view
    }

    setViewState(viewRef.current)

    const p1 = createQueryStringCallback('lon', viewRef.current.center.lon, Array.from(searchParams.entries()))
    const p2 = createQueryStringCallback('lat', viewRef.current.center.lat, Array.from(p1.entries()))
    const p3 = createQueryStringCallback('boxRange', viewRef.current.boxRange, Array.from(p2.entries()))

    router.push(pathname + '?' + p3.toString(), { scroll: false })
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