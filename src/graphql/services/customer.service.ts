import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCustomerInput, UpdateCustomerInput } from '../inputs/customer.input'
import { FindOneOptions, getRepository, Repository } from 'typeorm'
import { PasswordService } from '@/common/providers/password.service'
import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server-core'
import { Customer } from '@/entities'

@Injectable()
export class CustomerService {
  constructor(
    private readonly passwordService: PasswordService
  ) { }

  async findOne(option: FindOneOptions): Promise<Customer> {
    try {
      const customer = await getRepository(Customer).findOne(option)
      if (customer) {
        return customer
      }
    } catch (error) {
      throw new ApolloError('error')
    }
  }

  async updateCustomer(id: string, data: UpdateCustomerInput): Promise<Customer> {
    // const customer = await getRepository(Customer).update(id, <Customer>UpdateCustomerInput)
    try {
      const customer = await getRepository(Customer).findOne(id)

      if (!customer) {
        throw new ForbiddenError('Customer not found.')
      }

      return getRepository(Customer).save(new Customer({
        ...customer,
        ...UpdateCustomerInput,
        password: await this.passwordService.hashPassword(data.password)
      }))
    } catch (error) {
      throw new ApolloError('error')
    }
  }

  async createLocalCustomer(input: CreateCustomerInput): Promise<Customer> {
    try {
      const { email, password } = input

      let existedCustomer

      existedCustomer = await getRepository(Customer).findOne({
        where: { email }
      })

      if (existedCustomer) {
        throw new ForbiddenError('Customer already exists.')
      }

      const createdCustomer = await getRepository(Customer).save(
        new Customer({
          ...input,
          password: await this.passwordService.hashPassword(password)
        })
      )

      return createdCustomer
    } catch (error) {
      throw new ApolloError('error')
    }
  }
}
