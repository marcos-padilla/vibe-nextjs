'use client'

import styles from '@/styles/pages/auth.module.scss'
import appLogo from '@/public/app-logo/logo.png'
import Image from 'next/image'
import ConsoleInput from '@/components/ConsoleInput'
import { ChangeEvent, useState } from 'react'
import TypingText from '@/components/text/TypingText'
import { useRouter } from 'next/navigation'
interface ConsoleInputInterface {
	value: string
	active: boolean
	parseInput: () => { message?: string; success: boolean }
}

interface ConsoleTextInterface {
	text: string
	error?: boolean
}

const texts = [
	'Welcome to Vibe, the social network for programmers',
	'Type google or github for use them for sign in or sign up',
	'Or type credentials for use your own data',
]

export default function AuthPage() {
	const [errorsText, setErrorsText] = useState<string[]>([])
	const router = useRouter()
	const appendError = (error: string) => {
		setErrorsText((prev) => {
			return [...prev, error]
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
			appendError(parsedInput.message!)
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
				<div className={styles.content}>
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
					{errorsText.map((error, index) => (
						<p key={index} className='text-red-700'>
							{error}
						</p>
					))}
					{inputs.map((input, index) => (
						<ConsoleInput
							value={input.value}
							setValue={(e) => handleChange(index, e)}
							isActive={input.active}
							dissable={() => handleDissable(index)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
