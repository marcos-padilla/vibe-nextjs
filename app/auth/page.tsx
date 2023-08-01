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
}

type ConsoleTextType = 'error' | 'input' | 'response'

interface ConsoleTextInterface {
	text: string
	type: ConsoleTextType
}

type Command = 'credentials' | 'google' | 'github' | 'clear' | 'cls' | 'help'

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

	const appendConsole = (text: string, type: ConsoleTextType) => {
		setConsoleTexts((prev) => {
			return [...prev, { text, type }]
		})
	}

	const appendError = (error: string) => appendConsole(error, 'error')
	const appendUserInput = () => appendConsole(input.value, 'input')
	const appendResponse = (response: string) =>
		appendConsole(response, 'response')

	const clearInput = () => setInput({ active: true, value: '' })

	const parseInput = (value: string) => {
		switch (value) {
			case 'cls':
			case 'clear':
				setConsoleTexts([])
				clearInput()
				break
			case 'help':
				appendUserInput()
				appendResponse(
					`
					Avaliable commands:
					credentials ----------- Use your own credentials for sign in or sign up
					github ---------------- Use your github account for sign in or sign up
					google ---------------- Use your google account for sign in or sign up
					help ------------------ Show this message
					cls, clear -------------- Clear the console
					`
				)
				clearInput()
				break
			case 'google':
				break
			case 'github':
				break
			case 'credentials':
				router.push('/auth/credentials')
				break
			default:
				appendUserInput()
				appendError(
					'Undefined command, type help for see the full list of commands'
				)
				clearInput()
		}
	}

	const [input, setInput] = useState<ConsoleInputInterface>({
		value: '',
		active: true,
	})

	let prevDelay = 0
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (input.active) {
			setInput({ active: true, value: event.target.value })
		}
	}

	const dissableInput = () =>
		setInput((prev) => {
			return { ...prev, active: false }
		})

	const handleSubmit = () => {
		if (input.active) {
			parseInput(input.value)
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
						const currentDelay = text.length * 25
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
						}
						if (text.type === 'response') {
							const lines = text.text
								.replaceAll('\t', '')
								.split('\n')
							return lines
								.filter((line) => line.length > 0)
								.map((line) => {
									return (
										<TypingText
											text={line}
											speed={10}
										/>
									)
								})
						} else {
							return <p>{`> ${text.text}`}</p>
						}
					})}
					<ConsoleInput
						value={input.value}
						setValue={(e) => handleChange(e)}
						isActive={input.active}
						submit={handleSubmit}
						inputRef={consoleInputRef}
					/>
				</div>
			</div>
		</section>
	)
}
