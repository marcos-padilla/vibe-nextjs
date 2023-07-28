'use client'
import styles from '@/styles/components/console.module.scss'
import TypingText from './text/TypingText'

interface ConsoleProps {
	texts: string[]
}

export default function Console({ texts }: ConsoleProps) {
	let prevDelay = 0
	return (
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
	)
}
