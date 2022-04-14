import { hash, compare } from 'bcrypt'

import { configuration } from '@/config/configuration'
// import { configuration } from '@/config'


/**
 * Returns hashed password by hash password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @returns The hashed password mean of `password`
 *
 * @beta
 */
export const hashPassword = async (password: string):  Promise<string> => {
	let config = await configuration()
	return await hash(password, config.bcrypt_salt)
}

/**
 * Returns boolean by compare password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @param hash - The second input number
 * @returns The boolean mean of `password` and `hash`
 *
 * @beta
 */
export const comparePassword = async (
	password: string,
	hash: string
): Promise<boolean> => {
	// compareSync
	return await compare(password, hash)
}
