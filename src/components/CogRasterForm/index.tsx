"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../utils/url'
import { isValidColor, isValidColorScale } from '../../utils/dataTypes'
import CogBitmapParams from '@/data/CogBitmapParams'
import { useCallback } from 'react'

import BoolOption from './options/BoolOption'
import NumberOption from './options/NumberOption'
import ColorOption from './options/ColorOption'
import TextOption from './options/TextOption'
import ArrayOption from './options/ArrayOption'

const getValidator = (validatorType: string) => {

  switch (validatorType) {
    case 'color':
      return isValidColor
    case 'colorScale':
      return isValidColorScale
    default:
      return null
  }
}

function CogRasterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cogUrl = searchParams.get('cogUrl')

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
    router.push('?' + createQueryStringCallback('cogUrl', cogUrl, Array.from(searchParams.entries())).toString(), { scroll: false })
  }

  return <div className='ptr-form flex flex-col space-y-4 bg-gray-200"'>
    <label className="block">
      <span className="block text-l font-medium text-slate-700 text-white">COG Url</span>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={onUrlChange} value={cogUrl?.toString()} />
      {/* <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
        We need this to steal your identity.
      </p> */}
    </label>
    {
      CogBitmapParams.map(d => {
        const type = typeof d.type === 'string' ? d.type : d.type.inputType
        const value = typeof d.type === 'object' ? d.type.value : null
        switch (type) {
          case 'bool':
            return <BoolOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
              <p className="mt-2 text-sm text-gray-800">
                {d.description}
              </p>
            </BoolOption>
          case 'number':
            return <NumberOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
              <p className="mt-2 text-sm text-gray-800">
                {d.description}
              </p>
            </NumberOption>
          case 'color':
            return <ColorOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
              <p className="mt-2 text-sm text-gray-800">
                {d.description}
              </p>
            </ColorOption>
          case 'text':
            return <TextOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue} validation={typeof d.type === 'object' ? getValidator(d.type.value) : undefined}>
              <p className="mt-2 text-sm text-gray-800">
                {d.description}
              </p>
            </TextOption>
          case 'array':
            return <ArrayOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue} validation={typeof d.type === 'object' ? getValidator(d.type.value) : undefined}>
              <p className="mt-2 text-sm text-gray-800">
                {d.description}
              </p>
            </ArrayOption>
          default:
            return null
        }

      })
    }
  </div >
}

export default CogRasterForm;