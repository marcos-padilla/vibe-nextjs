import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/libs/prismadb'

const InvalidCredentialsError = new Error('Invalid Credentials')

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: '',
			clientSecret: '',
		}),
		GoogleProvider({
			clientId: '',
			clientSecret: '',
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: { label: 'username', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password)
					throw InvalidCredentialsError

				const user = await prisma.user.findUnique({
					where: {
						username: credentials.username,
					},
				})

				if (!user || !user?.hashedPassword) {
					throw InvalidCredentialsError
				}

				const checkPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				)
				if (!checkPassword) {
					throw InvalidCredentialsError
				}

				return user
			},
		}),
	],
}
