import '@/styles/globals.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Vibe: Connect and Empower - A Social Network for Programmers',
	description:
		'Join Vibe, the premier social platform designed exclusively for programmers and developers. Connect with like-minded coding enthusiasts, share your projects, exchange ideas, and empower each other to reach new heights in the world of programming. Join us today to enhance your coding journey and be part of a vibrant community driving innovation and collaboration in the tech space.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
