import {
  Resolver,
  Mutation,
  Args,
  Context,
} from '@nestjs/graphql'
import { AuthService } from '@/auth/auth.service'
import { Auth } from '@/auth/models/auth.model'
import { Token } from '@/auth/models/token.model'
import { RefreshTokenInput } from '@/auth/dto/refresh-token.input'
import { ConfigService } from '@nestjs/config';
import { TokenType, EmailType } from '@/shared/enums'
// import { EmailResolver } from '@/graphql/resolvers'
import { EmailService } from '@/common/providers/email.service';
import { ApolloError } from 'apollo-server-core'
// import { UserService } from '../services'
import { validate } from 'class-validator'
import { forwardRef, Inject, NotFoundException } from '@nestjs/common'
import { AuthenticationError } from 'apollo-server-express'
// import { PublicDecorator, UserDecorator } from '@/common/decorators'
import { PasswordService } from '@/common/providers/password.service'
import { PublicDecorator } from '@/common/decorators/public.decorator'
import { CreateUserInput, LoginUserInput } from '../inputs/user.input'
import { EmailResolver } from './email.resolver'
import { UserService } from '../services/user.service'

@Resolver(() => Auth)
export class AuthResolver {
  private USER_SUBSCRIPTION: string
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => EmailResolver))
    private readonly emailResolver: EmailResolver,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {
    this.USER_SUBSCRIPTION = configService.get('USER_SUBSCRIPTION')
  }

  @Mutation(() => Auth)
  async signup(@Args('data') data: CreateUserInput,
    @Context('pubsub') pubsub: any,
    @Context('req') req: any) {
    try {
      data.email = data.email.toLowerCase()
      const createdUser = await this.userService.createLocalUser(data)
      pubsub.publish(this.USER_SUBSCRIPTION, { userCreated: createdUser })

      const emailToken = await this.authService.generateToken(createdUser, TokenType.EMAIL_TOKEN)

      const existedEmail = await this.emailResolver.createEmail({
        userId: createdUser.id,
        type: EmailType.VERIFY_EMAIL
      })

      await this.emailService.sendMail(
        EmailType.VERIFY_EMAIL,
        createdUser,
        req,
        emailToken,
        existedEmail.id
      )
      return createdUser
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @PublicDecorator()
  @Mutation(() => Token)
  async loginLocal(userInput: LoginUserInput): Promise<Token> {
    let user
    try {
      if (userInput.firstName) {
        validate(userInput, { groups: ['byFull'] })
        user = await this.userService.findOne({ where: { firstName: userInput.firstName, lastName: userInput.lastName } });
        if (!user) throw new NotFoundException(`No user found for firstName: ${userInput.firstName} lastName: ${userInput.lastName}`);
      } else if (userInput.name) {
        validate(userInput, { groups: ['default'] })
        user = await this.userService.findOne({ where: { name: userInput.name } });
        if (!user) throw new NotFoundException(`No user found for name: ${userInput.name}`);
      } else if (userInput.email) {
        validate(userInput, { groups: ['byEmail'] })
        user = await this.userService.findOne({ where: { email: userInput.email } });
        if (!user) throw new NotFoundException(`No user found for email: ${userInput.email}`);
      }

      const passwordValid = await this.passwordService.validatePassword(
        userInput.password,
        user.password
      );

      if (!passwordValid) {
        throw new AuthenticationError('Invalid password');
      }

      return this.authService.generateTokens({
        id: user.id,
        username: user.name,
        roles: user.roleNames
      });
    } catch (e) {
      throw new ApolloError(e)
    }
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token)
  }
}
