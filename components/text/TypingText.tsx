'use client'
import styles from '@/styles/components/typing-text.module.scss'
import { delay } from 'framer-motion/dom'
import { useEffect, useRef, useState } from 'react'

interface TypingTextProps {
	text: string
	textStyles?: string
	delay?: number
}

export default function TypingText({
	text,
	textStyles,
	delay = 0,
}: TypingTextProps) {
	const [displayText, setDisplayText] = useState('')
	const [animate, setAnimate] = useState(false)
	useEffect(() => {
		let animationTimeout: NodeJS.Timeout

		const animateText = (currentIndex: number) => {
			if (currentIndex <= text.length) {
				setDisplayText(text.substring(0, currentIndex))
				animationTimeout = setTimeout(
					() => animateText(currentIndex + 1),
					40
				)
			} else {
				setAnimate(false)
			}
		}

		if (delay > 0) {
			const delayTimeout = setTimeout(() => {
				setAnimate(true)
				animateText(1)
			}, delay)
			return () => {
				clearTimeout(delayTimeout)
				clearTimeout(animationTimeout)
			}
		} else {
			animateText(1)
			return () => {
				clearTimeout(animationTimeout)
			}
		}
	}, [text, delay])
	return (
		<p className={`${textStyles} ${styles.text}`}>
			{displayText}
			{animate && '_'}
		</p>
	)
}
