import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { getRepository } from 'typeorm'
import { ForbiddenError } from 'apollo-server-core'

// import { Email } from '@/entities'
// import { CreateEmailInput } from '@/graphql/inputs'
// import { EmailType } from '@/shared/enums'
import { BaseResolver } from './BaseResolver'
import { Email } from '@/entities/email.entity'
import { Email as EmailObjectType } from '@/types/email.type'
import { CreateEmailInput } from '../inputs/email.input'

@Resolver(of => EmailObjectType)
export class EmailResolver extends BaseResolver(EmailObjectType) {
	@Query(() => [EmailObjectType])
	async emails(): Promise<Email[]> {
		return await getRepository(Email).find()
	}

	@Mutation(() => EmailObjectType)
	async createEmail(@Args('input') input: CreateEmailInput): Promise<Email> {
		return await getRepository(Email).save(new Email(input))
	}

	@Mutation(() => Boolean)
	async openEmail(@Args('id') id: string): Promise<boolean> {
		const email = await getRepository(Email).findOne(id)

		if (!email) {
			throw new ForbiddenError('Email not found.')
		}

		email.isOpened = true

		return getRepository(Email).save(email) ? true : false
	}
}
