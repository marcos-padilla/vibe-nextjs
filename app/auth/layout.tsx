import Image from 'next/image'
import appLogoText from '@/public/app-logo/logo-text-white.png'
import styles from '@/styles/layouts/auth-layout.module.scss'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className={styles.auth_layout}>
			<div className='flex justify-between items-center py-5 px-10'>
				<Image
					src={appLogoText}
					alt='Vibe Logo'
					width={100}
					height={80}
				/>
				<button>
					<BsThreeDotsVertical
						className='text-white cursor-pointer'
						size={20}
					/>
				</button>
			</div>
			{children}
		</main>
	)
}
