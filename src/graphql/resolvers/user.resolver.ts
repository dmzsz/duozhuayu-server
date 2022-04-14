import { Resolver, Query, Mutation, Args, Context, ResolveProperty, Parent, ResolveField } from '@nestjs/graphql'
import { UserService } from '@/graphql/services/user.service'
// import { Email, User } from '@/entities'
// import { PublicDecorator, UserDecorator } from '@/common/decorators'
import { PasswordService } from '@/common/providers/password.service'
// import { CreateUserInput, LoginUserInput, UpdateUserInput } from '@/graphql/inputs'
import { NotFoundException, UseGuards } from '@nestjs/common'
// import { AuthService, JwtAuthGuard } from '@/auth'
import { validate } from 'class-validator'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { Token } from '@/auth/models/token.model'
import { Request } from 'express'
import { getRepository } from 'typeorm';
import { User } from '@/entities/user.entity'
import { User as UserObjectType } from '@/types/user.type'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { UserDecorator } from '@/common/decorators/user.decorator'
import { CreateUserInput, UpdateUserInput } from '../inputs/user.input'
import { PublicDecorator } from '@/common/decorators/public.decorator'
import { Email } from '@/entities/email.entity'

@Resolver(() => UserObjectType)
export class UsersResolver {
  constructor(
    private readonly userService: UserService,
    private passwordService: PasswordService,
  ) { }

  // @PublicDecorator() //这个代表不需要登录
  @Query(() => UserObjectType)
  @UseGuards(JwtAuthGuard)
  async findUser(@UserDecorator() user: User): Promise<User> {
    return await this.userService.findOne({ where: { id: user.id! } })
  }

  @Query(() => [UserObjectType])
  async allUser(): Promise<User[]> {
    return getRepository(User).find()
  }

  @Mutation(() => UserObjectType)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Context('req') req: any,
    @Args('data') updateUser: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(req.user.id!, updateUser)
  }


  @PublicDecorator()
  @Mutation(() => UserObjectType)
  async createLocalUser(@Args('user') userInput: CreateUserInput): Promise<User> {
    userInput = new CreateUserInput(userInput)
    try {
      if (userInput.firstName) {
        validate(userInput, { groups: ['byFull'] })
      } else if (userInput.name) {
        validate(userInput, { groups: ['default'] })
      } else if (userInput.email) {
        validate(userInput, { groups: ['byEmail'] })
      }

      return await this.userService.createLocalUser(userInput)
    } catch (e) {
      throw new ApolloError(e)
    }
  }

  @ResolveField()
  public async sendEmails(@Parent() parent, @Context() req: Request) {
    return getRepository(Email).find({toUser: parent.id})
  }

  @ResolveField()
  public async receiveEmails(@Parent() parent, @Context() req: Request) {
    return getRepository(Email).find({fromUser: parent.id})
  }
}
