"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../utils/url'
import { useCallback } from 'react'
import { log } from 'console'

function CogRasterForm() {
  // const searchParams = useSearchParams();
  // const params = useParams();
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

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

  const onUrlChange = (evt) => {
    const cogUrl = evt.target.value;
    router.push(pathname + '?' + createQueryStringCallback('cogUrl', cogUrl, searchParams).toString())
  }

  const onChannelChange = (evt) => {
    const channel = evt.target.value;
    router.push(pathname + '?' + createQueryStringCallback('channel', channel, searchParams).toString())
  }

  const onUseHeatMapChange = (evt) => {
    const useHeatMap = evt.target.checked;

    router.push(pathname + '?' + createQueryStringCallback('useHeatMap', useHeatMap, searchParams).toString())
  }

  return <form>
    <label className="block">
      <span className="block text-sm font-medium text-slate-700">COG Url</span>
      <input className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-pink-500" onChange={onUrlChange} value={cogUrl?.toString()} />
      {/* <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        We need this to steal your identity.
      </p> */}
    </label>
    <label className="block">
      <span className="block text-sm font-medium text-slate-700">useChannel</span>
      <input className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-pink-500" onChange={onChannelChange} value={channel?.toString()} type='number' />
      <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        Which channel will be visible. Could be empty.
      </p>
    </label>
    <label className="block">
      <span className="block text-sm font-medium text-slate-700">useHeatMap</span>
      <input className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-pink-500" onChange={onUseHeatMapChange} checked={useHeatMap === true} type='checkbox' />
      <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        Which channel will be visible. Could be empty.
      </p>
    </label>
  </form>
}

export default CogRasterForm;