import { sign, verify } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { AuthenticationError, ForbiddenError } from 'apollo-server-core'

// import { Customer } from '@/entities'
// import { configuration } from '@/config'
import { TokenType } from '@/shared/enums'
import { Token } from '../models/token.model'
import { configuration } from '@/config/configuration'
import { Customer } from '@/entities/customer.entity'

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
 * @param customer - 1st input
 * @param type - 2nd input
 *
 * @returns The access token mean of `customer`
 *
 * @beta
 */
export const generateCustomerToken = async (
	customer: Customer,
	type: TokenType
): Promise<string> => {

	// payload is JwtPayload type
	return await sign(
		{
			sub: customer.id,
			username: customer.name,
			role: customer.role?.name
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
 * Returns customer by verify token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param token - 1st input
 * @param type - 2nd input
 *
 * @returns The customer mean of `token`
 *
 * @beta
 */
export const verifyCustomerToken = async (
	token: string,
	type: TokenType
): Promise<Customer> => {
	let currentCustomer

	await verify(token, common[type].privateKey, async (err, data) => {
		if (err) {
			throw new AuthenticationError(
				'Authentication token is invalid, please try again.'
			)
		}

		currentCustomer = await getRepository(Customer).findOne(
			{ id: data['customerId'] }
		)
	})

	if (type === TokenType.EMAIL_TOKEN) {
		return currentCustomer
	}

	if (currentCustomer && !currentCustomer.isVerified) {
		throw new ForbiddenError('Please verify your email.')
	}

	return currentCustomer
}

/**
 * Returns login response by trade token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param customer - 1st input
 *
 * @returns The login response mean of `customer`
 *
 * @beta
 */
export const tradeCustomerToken = async (customer: Customer): Promise<Token> => {
	// if (!customer.isVerified) {
	// 	throw new ForbiddenError('Please verify your email.')
	// }

	if (!customer.isActive) {
		throw new ForbiddenError("Customer already doesn't exist.")
	}

	if (customer.isLocked) {
		throw new ForbiddenError('Your email has been locked.')
	}

	const accessToken = await generateCustomerToken(customer, TokenType.ACCESS_TOKEN)
	const refreshToken = await generateCustomerToken(customer, TokenType.REFRESH_TOKEN)

	return { accessToken, refreshToken }
}
