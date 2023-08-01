'use client'

import styles from '@/styles/pages/auth.module.scss'
import appLogo from '@/public/app-logo/logo.png'
import Image from 'next/image'
import ConsoleInput from '@/components/ConsoleInput'
import { ChangeEvent, useRef, useState } from 'react'
import TypingText from '@/components/text/TypingText'
import { useRouter } from 'next/navigation'

interface ConsoleInputInterface {
	value: string
	active: boolean
	parseInput: () => { message?: string; success: boolean }
}

interface ConsoleTextInterface {
	text: string
	type: 'error' | 'input'
}

const texts = [
	'Welcome to Vibe, the social network for programmers',
	'Type google or github for use them for sign in or sign up',
	'Or type credentials for use your own data',
]

export default function AuthPage() {
	const [consoleTexts, setConsoleTexts] = useState<ConsoleTextInterface[]>(
		[]
	)

	const router = useRouter()
	const consoleInputRef = useRef<HTMLInputElement>(null)

	const appendError = (error: string) => {
		setConsoleTexts((prev) => {
			return [...prev, { text: error, type: 'error' }]
		})
	}

	const appendUserInput = (input: string) => {
		setConsoleTexts((prev) => {
			return [...prev, { text: input, type: 'input' }]
		})
	}

	let prevDelay = 0
	const [inputs, setInputs] = useState<ConsoleInputInterface[]>([
		{
			value: '',
			active: true,
			parseInput: function () {
				if (
					this.value !== 'google' &&
					this.value !== 'github' &&
					this.value !== 'credentials'
				) {
					return {
						message: 'Undefined command, type google, github or credentials',
						success: false,
					}
				} else {
					setInputs((prev) => {
						return [...prev]
					})
					if (this.value === 'credentials') {
						router.push('/auth/credentials')
					}
					return {
						success: true,
					}
				}
			},
		},
	])
	const handleChange = (
		index: number,
		event: ChangeEvent<HTMLInputElement>
	) => {
		const updatedInputs = [...inputs]
		if (updatedInputs[index].active) {
			updatedInputs[index] = {
				...updatedInputs[index],
				value: event.target.value,
			}
		}
		setInputs(updatedInputs)
	}

	const handleDissable = (index: number) => {
		const updatedInputs = [...inputs]
		const parsedInput = updatedInputs[index].parseInput()
		if (parsedInput.success) {
			if (updatedInputs[index].active) {
				updatedInputs[index] = {
					...updatedInputs[index],
					active: false,
				}
			}
			setInputs(updatedInputs)
		} else {
			appendUserInput(inputs[index].value)
			if (inputs[index].value) {
				appendError(parsedInput.message!)
			}
			updatedInputs[index].value = ''
			setInputs(updatedInputs)
		}
	}

	return (
		<section className={styles.auth_container}>
			<div className={styles.console}>
				<div className={styles.bar}>
					<div className={styles.actions}>
						<span />
						<span />
						<span />
					</div>
					<div className={styles.title}>
						<Image
							src={appLogo}
							alt='Vibe Logo'
							width={15}
							height={10}
						/>
						<span>Vibe -- Sign In/Sign Up</span>
					</div>
				</div>
				<div
					className={styles.content}
					onClick={() => {
						consoleInputRef.current?.focus()
					}}
				>
					{texts.map((text, index) => {
						const currentDelay = text.length * 50
						prevDelay += currentDelay
						return (
							<TypingText
								text={text}
								delay={prevDelay - currentDelay}
							/>
						)
					})}
					{consoleTexts.map((text, index) => {
						if (text.type === 'error') {
							return (
								<TypingText
									text={text.text}
									textStyles='text-red-700'
									speed={10}
								/>
							)
						} else {
							return <p>{`> ${text.text}`}</p>
						}
					})}
					{inputs.map((input, index) => (
						<ConsoleInput
							value={input.value}
							setValue={(e) => handleChange(index, e)}
							isActive={input.active}
							dissable={() => handleDissable(index)}
							inputRef={consoleInputRef}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
