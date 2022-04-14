import { Entity, ObjectIdColumn, Column, TableInheritance } from 'typeorm'
// import { uuidv4 } from '@/shared/utils'
import { Expose, plainToInstance } from 'class-transformer'
import { IBase } from './base.interface'
import { Field, InterfaceType } from '@nestjs/graphql'

@InterfaceType({
	// workaround for bug: https://github.com/MichalLytek/type-graphql/issues/373
	resolveType: value => value.constructor.name,
	implements:() => [IBase],
  })
export abstract class File extends IBase<File> {

	@Expose()
	@Field()
	filename: string

	@Expose()
	@Field()
	path: string

	constructor(file: Partial<File>) {
		super(file)
	}
}
