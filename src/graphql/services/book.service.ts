import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'

import { Connection, FindOneOptions, getRepository, Repository } from 'typeorm'
import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server-core'
import { Product as Book } from '@/entities'
import { InjectConnection } from '@nestjs/typeorm'

@Injectable()
export class BookService {
  constructor(
    @InjectConnection('default')
    private connection: Connection,
  ) { }

  async findOne(option: FindOneOptions): Promise<Book> {
    try {
      const book = await getRepository(Book).findOne(option)
      if (book) {
        return book
      }
    } catch (error) {
      throw new ApolloError('error')
    }
  }

  createQueryBuilder(){
    this.connection.getRepository(Book).createQueryBuilder()
  }

}
