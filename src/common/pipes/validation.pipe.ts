import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { validate, ValidationOptions } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { UserInputError } from 'apollo-server-core'
import { CreateCustomerInput, LoginCustomerInput, UpdateCustomerInput } from '@/graphql/inputs/customer.input'
// import { CreateCustomerInput, LoginCustomerInput, UpdateCustomerInput } from '@/graphql/inputs';

@Injectable()
export class ValidationPipe<T> implements PipeTransform<T> {
  private validationOptions: ValidationOptions

  constructor(validationOptions: ValidationOptions = {}) {
    this.validationOptions = validationOptions
  }

  public async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToInstance(metatype, value)
    const errors = await validate(object, this.validationOptions)
    if (errors.length > 0) {
      const message = errors
        .map((validationError) => Object.values(validationError.constraints!))
        .flat()
        .join(' ')
      throw new UserInputError(`Form Arguments invalid: ${message}`)
    }
    return value
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [
      String, Boolean, Number, Array, Object,
      CreateCustomerInput, UpdateCustomerInput, LoginCustomerInput]
    return !types.includes(metatype)
  }
}
