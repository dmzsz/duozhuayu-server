import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserInput, UpdateUserInput } from '../inputs/user.input'
import { FindOneOptions, getRepository, Repository } from 'typeorm'
import { PasswordService } from '@/common/providers/password.service'
import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server-core'
import { User } from '@/entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    private readonly passwordService: PasswordService
  ) { }

  async findOne(option: FindOneOptions): Promise<User> {
    try {
      const user = await getRepository(User).findOne(option)
      if (user) {
        return user
      }
    } catch (error) {
      throw new ApolloError('error')
    }
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    // const user = await getRepository(User).update(id, <User>UpdateUserInput)
    try {
      const user = await getRepository(User).findOne(id)

      if (!user) {
        throw new ForbiddenError('User not found.')
      }

      return getRepository(User).save(new User({
        ...user,
        ...UpdateUserInput,
        password: await this.passwordService.hashPassword(data.password)
      }))
    } catch (error) {
      throw new ApolloError('error')
    }
  }

  async createLocalUser(input: CreateUserInput): Promise<User> {
    try {
      const { email, password } = input

      let existedUser

      existedUser = await getRepository(User).findOne({
        where: { email }
      })

      if (existedUser) {
        throw new ForbiddenError('User already exists.')
      }

      const createdUser = await getRepository(User).save(
        new User({
          ...input,
          password: await this.passwordService.hashPassword(password)
        })
      )

      return createdUser
    } catch (error) {
      throw new ApolloError('error')
    }
  }
}
