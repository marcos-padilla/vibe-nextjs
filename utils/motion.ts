import Variants from 'framer-motion'

export const staggerContainer = (staggerChildren: any, delayChildren: any) => ({
	hidden: {},
	show: {
		transition: {
			staggerChildren,
			delayChildren,
		},
	},
})

export const textContainer = {
	hidden: {
		opacity: 0,
	},
	show: (i = 1) => ({
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: i * 0.01 },
	}),
}

export const textVariant2 = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'tween',
			ease: 'linear',
		},
	},
}
