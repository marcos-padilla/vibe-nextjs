'use client'

import styles from '@/styles/components/console-input.module.scss'
import { useState, useEffect, ChangeEvent, RefObject } from 'react'

interface ConsoleInputProps {
	value: string
	setValue: (value: any) => void
	isActive: boolean
	dissable: () => void
	inputRef: RefObject<HTMLInputElement>
}

export default function ConsoleInput({
	value,
	setValue,
	isActive,
	dissable,
	inputRef,
}: ConsoleInputProps) {
	return (
		<div className={styles.console_input_container}>
			{'>'}
			{isActive ? (
				<input
					type='text'
					autoFocus
					onKeyUp={(e) => {
						if (e.code == 'Enter') {
							dissable()
						}
					}}
					value={value}
					onChange={setValue}
					ref={inputRef}
				/>
			) : (
				<span>{value}</span>
			)}
		</div>
	)
}
