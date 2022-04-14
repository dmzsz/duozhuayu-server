import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { getRepository } from 'typeorm'
import { ForbiddenError } from 'apollo-server-core'

import { BaseResolver } from './BaseResolver'
import { Product as Book } from '@/entities/product.entity'
import { Book as BookObjectType } from '@/types/book.type'
import { CreateBookInput } from '../inputs/book.input'

@Resolver(of => BookObjectType)
export class EmailResolver extends BaseResolver(BookObjectType) {
	/**
	 * 有库存图书
	 * @returns 
	 */
	@Query(() => [BookObjectType])
	async stockBook(): Promise<Book[]> {
		return await getRepository(Book).find({stock: true})
	}


	/**
	 * 没有库存图书
	 * @returns 
	 */
	async outOfStockBook(): Promise<Book[]> {
		return await getRepository(Book).find({stock: false})
	}
}
