"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../utils/url'
import CogBitmapParams from '@/data/CogBitmapParams'
import { useCallback } from 'react'

import BoolOption from './options/BoolOption'
import NumberOption from './options/NumberOption'


function CogRasterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cogUrl = searchParams.get('cogUrl')
  const channel = searchParams.get('channel')
  const useHeatMap = searchParams.get('useHeatMap') === 'true'

  const createQueryStringCallback = useCallback(createQueryString, [searchParams])

  // // Get a new searchParams string by merging the current
  // // searchParams with a provided key/value pair
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams)
  //     params.set(name, value)

  //     return params.toString()
  //   },
  //   [searchParams]
  // )

  const onUrlChange = (evt: any) => {
    const cogUrl = evt.target.value;
    router.push(pathname + '?' + createQueryStringCallback('cogUrl', cogUrl, Array.from(searchParams.entries())).toString())
  }

  const onChannelChange = (evt: any) => {
    const channel = evt.target.value;
    router.push(pathname + '?' + createQueryStringCallback('channel', channel, Array.from(searchParams.entries())).toString())
  }

  const onUseHeatMapChange = (evt: any) => {
    const useHeatMap = evt.target.checked;

    router.push(pathname + '?' + createQueryStringCallback('useHeatMap', useHeatMap, Array.from(searchParams.entries())).toString())
  }

  return <form>
    <label className="block">
      <span className="block text-sm font-medium text-slate-700">COG Url</span>
      <input className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-pink-500" onChange={onUrlChange} value={cogUrl?.toString()} />
      {/* <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        We need this to steal your identity.
      </p> */}
    </label>
    {
      CogBitmapParams.map(d => {
        switch (d.type) {
          case 'bool':
            return <BoolOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
              <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
                {d.description}
              </p>
            </BoolOption>
          case 'number':
            return <NumberOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
              <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
                {d.description}
              </p>
            </NumberOption>
          default:
            return null
        }

      })
    }

    {/* <BoolOption title={'useAutoRange'} name={'useAutoRange'} >
      <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        Set automatic range of color gradient (default false).
      </p>
    </BoolOption>

    <BoolOption title={'useDataForOpacity'} name={'useDataForOpacity'} >
      <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        Visualise data with opacity of each pixel according to its value (default false)
      </p>
    </BoolOption>

    <BoolOption title={'useHeatMap'} name={'useHeatMap'} >
      <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        Generate data as a color heatmap (default true) useChannel : number | null - specify a single channel to use (default null)
      </p>
    </BoolOption>

    <BoolOption title={'useColorsBasedOnValues'} name={'useColorsBasedOnValues'} >
      <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        Assign pixels colors based on defined data values (default false)
      </p>
    </BoolOption>

    <BoolOption title={'useSingleColor'} name={'useSingleColor'} >
      <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        Display data values only with single color (default false)
      </p>
    </BoolOption> */}

  </form>
}

export default CogRasterForm;