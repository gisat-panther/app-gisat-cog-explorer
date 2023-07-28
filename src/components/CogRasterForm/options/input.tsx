import { useState, } from 'react'

export default function ({ classes, onChange, value, placeholder, type = 'text', step }: { classes: string, onChange: any, value?: string | number, placeholder: string, type?: string, step?: string | number }) {
	const [stateValue, setStateValue] = useState(value)
	return <input className={classes} onChange={(evt: any) => { setStateValue(evt.target.value); onChange(evt) }} value={stateValue} type={type} placeholder={placeholder} {...(step ? { step } : {})} />
}