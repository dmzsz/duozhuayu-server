import { Resolver, Query, Mutation, Args, Context, ResolveProperty, Parent, ResolveField } from '@nestjs/graphql'
import { CustomerService } from '@/graphql/services/customer.service'
// import { Email, Customer } from '@/entities'
// import { PublicDecorator, CustomerDecorator } from '@/common/decorators'
import { PasswordService } from '@/common/providers/password.service'
// import { CreateCustomerInput, LoginCustomerInput, UpdateCustomerInput } from '@/graphql/inputs'
import { NotFoundException, UseGuards } from '@nestjs/common'
// import { AuthService, JwtAuthGuard } from '@/auth'
import { validate } from 'class-validator'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { Token } from '@/auth/models/token.model'
import { Request } from 'express'
import { getRepository } from 'typeorm';
import { Customer } from '@/entities/customer.entity'
import { Customer as CustomerObjectType } from '@/types/customer.type'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CustomerDecorator } from '@/common/decorators/customer.decorator'
import { CreateCustomerInput, UpdateCustomerInput } from '../inputs/customer.input'
import { PublicDecorator } from '@/common/decorators/public.decorator'
import { Email } from '@/entities/email.entity'

@Resolver(() => CustomerObjectType)
export class CustomersResolver {
  constructor(
    private readonly customerService: CustomerService,
    private passwordService: PasswordService,
  ) { }

  // @PublicDecorator() //这个代表不需要登录
  @Query(() => CustomerObjectType)
  @UseGuards(JwtAuthGuard)
  async findCustomer(@CustomerDecorator() customer: Customer): Promise<Customer> {
    return await this.customerService.findOne({ where: { id: customer.id! } })
  }

  @Query(() => [CustomerObjectType])
  async allCustomer(): Promise<Customer[]> {
    return getRepository(Customer).find()
  }

  @Mutation(() => CustomerObjectType)
  @UseGuards(JwtAuthGuard)
  async updateCustomer(
    @Context('req') req: any,
    @Args('data') updateCustomer: UpdateCustomerInput,
  ): Promise<Customer> {
    return await this.customerService.updateCustomer(req.customer.id!, updateCustomer)
  }


  @PublicDecorator()
  @Mutation(() => CustomerObjectType)
  async createLocalCustomer(@Args('customer') customerInput: CreateCustomerInput): Promise<Customer> {
    customerInput = new CreateCustomerInput(customerInput)
    try {
      if (customerInput.firstName) {
        validate(customerInput, { groups: ['byFull'] })
      } else if (customerInput.name) {
        validate(customerInput, { groups: ['default'] })
      } else if (customerInput.email) {
        validate(customerInput, { groups: ['byEmail'] })
      }

      return await this.customerService.createLocalCustomer(customerInput)
    } catch (e) {
      throw new ApolloError(e)
    }
  }

  @ResolveField()
  public async sendEmails(@Parent() parent, @Context() req: Request) {
    return getRepository(Email).find({toCustomer: parent.id})
  }

  @ResolveField()
  public async receiveEmails(@Parent() parent, @Context() req: Request) {
    return getRepository(Email).find({fromCustomer: parent.id})
  }
}
