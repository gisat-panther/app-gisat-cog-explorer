import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../../utils/url'
import { ReactNode, useCallback } from 'react'

export default function ({ title, name, defaultValue, children }: { name: string, title: string, defaultValue: any, children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQueryStringCallback = useCallback(createQueryString, [searchParams])
	const urlVal = searchParams.get(name) !== '' ? Number(searchParams.get(name)) : ''

	const onChanged = (evt: any) => {
		const val = evt.target.value;
		router.push(pathname + '?' + createQueryStringCallback(name, val, Array.from(searchParams.entries())).toString())

	}

	return <label className="block">
		<span className="block text-sm font-medium text-slate-700">{title}</span>
		<input className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-pink-500" onChange={onChanged} value={searchParams.has(name) ? urlVal : undefined} type='number' placeholder={defaultValue} step="any" />
		{children}
	</label>
}