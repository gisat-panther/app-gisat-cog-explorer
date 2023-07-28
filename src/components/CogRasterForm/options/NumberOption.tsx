import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../../utils/url'
import { ReactNode, useCallback } from 'react'
import Input from './input'

export default function ({ title, name, defaultValue, children }: { name: string, title: string, defaultValue: any, children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQueryStringCallback = useCallback(createQueryString, [searchParams])
	const urlVal = searchParams.get(name) !== null && searchParams.get(name) !== '' ? Number(searchParams.get(name)) : ''

	const onChanged = (evt: any) => {
		const val = evt.target.value;
		router.push('?' + createQueryStringCallback(name, val, Array.from(searchParams.entries())).toString(), { scroll: false })

	}
	const classes = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

	return <label className="block">
		<span className="block text-l font-medium text-slate-700 text-white">{title}</span>
		<Input classes={classes} onChange={onChanged} value={urlVal} placeholder={defaultValue} type='number' step="any" />
		{children}
	</label>
}