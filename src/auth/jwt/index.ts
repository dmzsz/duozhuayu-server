import { sign, verify } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { AuthenticationError, ForbiddenError } from 'apollo-server-core'

// import { User } from '@/entities'
// import { configuration } from '@/config'
import { TokenType } from '@/shared/enums'
import { Token } from '../models/token.model'
import { configuration } from '@/config/configuration'
import { User } from '@/entities/user.entity'

let config = await (await configuration())
const ALGORITHM = config.algorithm
const ISSUER = config.issuer
const ACCESS_TOKEN_SECRET = config.access_token_secret
const REFRESH_TOKEN_SECRET = config.refresh_token_secret
const EMAIL_TOKEN_SECRET = config.email_token_secret
const RESETPASS_TOKEN_SECRET = config.resetpass_token_secret
const AUDIENCE = config.audience

const common = {
	[TokenType.ACCESS_TOKEN]: {
		privateKey: ACCESS_TOKEN_SECRET,
		signOptions: {
			expiresIn: '30d' // 15m
		}
	},
	[TokenType.REFRESH_TOKEN]: {
		privateKey: REFRESH_TOKEN_SECRET,
		signOptions: {
			expiresIn: '7d' // 7d
		}
	},
	[TokenType.EMAIL_TOKEN]: {
		privateKey: EMAIL_TOKEN_SECRET,
		signOptions: {
			expiresIn: '1d' // 1d
		}
	},
	[TokenType.RESETPASS_TOKEN]: {
		privateKey: RESETPASS_TOKEN_SECRET,
		signOptions: {
			expiresIn: '1d' // 1d
		}
	}
}

/**
 * Returns token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param user - 1st input
 * @param type - 2nd input
 *
 * @returns The access token mean of `user`
 *
 * @beta
 */
export const generateToken = async (
	user: User,
	type: TokenType
): Promise<string> => {

	// payload is JwtPayload type
	return await sign(
		{
			sub: user.id,
			username: user.name,
			roles: user.roleNames
		},
		common[type].privateKey,
		{
			issuer: ISSUER,
			audience: AUDIENCE,
			algorithm: 'HS256',
			expiresIn: common[type].signOptions.expiresIn // 15m
		}
	)
}

/**
 * Returns user by verify token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param token - 1st input
 * @param type - 2nd input
 *
 * @returns The user mean of `token`
 *
 * @beta
 */
export const verifyToken = async (
	token: string,
	type: TokenType
): Promise<User> => {
	let currentUser

	await verify(token, common[type].privateKey, async (err, data) => {
		if (err) {
			throw new AuthenticationError(
				'Authentication token is invalid, please try again.'
			)
		}

		currentUser = await getRepository(User).findOne(
			{ id: data['userId'] }
		)
	})

	if (type === TokenType.EMAIL_TOKEN) {
		return currentUser
	}

	if (currentUser && !currentUser.isVerified) {
		throw new ForbiddenError('Please verify your email.')
	}

	return currentUser
}

/**
 * Returns login response by trade token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param user - 1st input
 *
 * @returns The login response mean of `user`
 *
 * @beta
 */
export const tradeToken = async (user: User): Promise<Token> => {
	// if (!user.isVerified) {
	// 	throw new ForbiddenError('Please verify your email.')
	// }

	if (!user.isActive) {
		throw new ForbiddenError("User already doesn't exist.")
	}

	if (user.isLocked) {
		throw new ForbiddenError('Your email has been locked.')
	}

	const accessToken = await generateToken(user, TokenType.ACCESS_TOKEN)
	const refreshToken = await generateToken(user, TokenType.REFRESH_TOKEN)

	return { accessToken, refreshToken }
}
