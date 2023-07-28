import { useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../../utils/url'
import { ReactNode, useCallback, useState } from 'react'
import Input from './input'

export default function ({ title, name, defaultValue, children, validation }: { name: string, title: string, defaultValue: any, children: ReactNode, validation?: Function | null }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const createQueryStringCallback = useCallback(createQueryString, [searchParams])
	const urlVal = searchParams.get(name) !== null ? searchParams.get(name)?.toString() : ''
	const baseClasses = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
	const [classes, setClasses] = useState(baseClasses);

	const onChanged = (evt: any) => {
		const val = evt.target.value;

		const valid = val === null || val === "" ? true : typeof validation === 'function' ? validation(val) : true

		setClasses(valid ? baseClasses : `${baseClasses} border-rose-500`)

		router.push('?' + createQueryStringCallback(name, val, Array.from(searchParams.entries())).toString(), { scroll: false })
	}

	return <label className="block">
		<span className="block text-l font-medium text-slate-700 text-white">{title}</span>
		<Input classes={classes} onChange={onChanged} value={urlVal} placeholder={defaultValue} />
	</label >
}