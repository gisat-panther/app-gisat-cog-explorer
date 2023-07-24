import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../../utils/url'
import { ReactNode, useCallback } from 'react'

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

	return <label className="block">
		<span className="block text-l font-medium text-slate-700 text-white">{title}</span>
		<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={onChanged} value={urlVal} type='number' placeholder={defaultValue} step="any" />
		{children}
	</label>
}