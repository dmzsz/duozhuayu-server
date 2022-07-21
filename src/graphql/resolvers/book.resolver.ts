import { Resolver, Mutation, Args, Query, ResolveField, Parent, Context } from '@nestjs/graphql'
import { getRepository, getTreeRepository, Repository } from 'typeorm'
import { ForbiddenError } from 'apollo-server-core'

import { BaseResolver } from './base-resolver'
import { Product as Book } from '@/entities/product.entity'
import { Book as BookObjectType } from '@/types/book.type'
import { CreateBookInput } from '../inputs/book.input'
import { Request } from 'express'
import { Category } from '@/entities'
import { CategoryType } from '@/shared/enums'
import { BookCategory as BookCategoryObjectType } from '@/types/book-category.type'

@Resolver(of => BookObjectType)
export class BookResolver extends BaseResolver(BookObjectType) {
	/**
	 * 有库存图书
	 * @returns 
	 */
	@Query(() => [BookObjectType])
	async stockBook(): Promise<Book[]> {
		return await getRepository(Book).find({ isSoldOut: true })
	}

	@Query(() => [BookCategoryObjectType])
	public async bookCategories(): Promise<Category[]> {
		console.log(await getTreeRepository(Category).findTrees({ depth: 2 }), 1111111111)
		return getTreeRepository(Category).findTrees({ depth: 2 })
	}

	/**
	 * 没有库存图书
	 * @returns 
	 */
	async outOfStockBook(): Promise<Book[]> {
		return await getRepository(Book).find({ isSoldOut: false })
	}


	@ResolveField()
	public async bookCategory(@Parent() parent, @Context() req: Request) {
		return getTreeRepository(Category).findTrees({ depth: 2 })
	}
}
