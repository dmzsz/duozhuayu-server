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
// import { CustomerService } from '../services'
import { validate } from 'class-validator'
import { forwardRef, Inject, NotFoundException } from '@nestjs/common'
import { AuthenticationError } from 'apollo-server-express'
// import { PublicDecorator, CustomerDecorator } from '@/common/decorators'
import { PasswordService } from '@/common/providers/password.service'
import { PublicDecorator } from '@/common/decorators/public.decorator'
import { CreateCustomerInput, LoginCustomerInput } from '../inputs/customer.input'
import { EmailResolver } from './email.resolver'
import { CustomerService } from '../services/customer.service'

@Resolver(() => Auth)
export class AuthResolver {
  private USER_SUBSCRIPTION: string
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => EmailResolver))
    private readonly emailResolver: EmailResolver,
    private readonly emailService: EmailService,
    private readonly customerService: CustomerService,
    private readonly passwordService: PasswordService,
  ) {
    this.USER_SUBSCRIPTION = configService.get('USER_SUBSCRIPTION')
  }

  @Mutation(() => Auth)
  async signup(@Args('data') data: CreateCustomerInput,
    @Context('pubsub') pubsub: any,
    @Context('req') req: any) {
    try {
      data.email = data.email.toLowerCase()
      const createdCustomer = await this.customerService.createLocalCustomer(data)
      pubsub.publish(this.USER_SUBSCRIPTION, { customerCreated: createdCustomer })

      const emailToken = await this.authService.generateToken(createdCustomer, TokenType.EMAIL_TOKEN)

      const existedEmail = await this.emailResolver.createEmail({
        customerId: createdCustomer.id,
        type: EmailType.VERIFY_EMAIL
      })

      await this.emailService.sendMail(
        EmailType.VERIFY_EMAIL,
        createdCustomer,
        req,
        emailToken,
        existedEmail.id
      )
      return createdCustomer
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @PublicDecorator()
  @Mutation(() => Token)
  async loginLocal(customerInput: LoginCustomerInput): Promise<Token> {
    let customer
    try {
      if (customerInput.firstName) {
        validate(customerInput, { groups: ['byFull'] })
        customer = await this.customerService.findOne({ where: { firstName: customerInput.firstName, lastName: customerInput.lastName } });
        if (!customer) throw new NotFoundException(`No customer found for firstName: ${customerInput.firstName} lastName: ${customerInput.lastName}`);
      } else if (customerInput.name) {
        validate(customerInput, { groups: ['default'] })
        customer = await this.customerService.findOne({ where: { name: customerInput.name } });
        if (!customer) throw new NotFoundException(`No customer found for name: ${customerInput.name}`);
      } else if (customerInput.email) {
        validate(customerInput, { groups: ['byEmail'] })
        customer = await this.customerService.findOne({ where: { email: customerInput.email } });
        if (!customer) throw new NotFoundException(`No customer found for email: ${customerInput.email}`);
      }

      const passwordValid = await this.passwordService.validatePassword(
        customerInput.password,
        customer.password
      );

      if (!passwordValid) {
        throw new AuthenticationError('Invalid password');
      }

      return this.authService.generateTokens({
        id: customer.id,
        username: customer.name,
        role: customer.role?.name
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
