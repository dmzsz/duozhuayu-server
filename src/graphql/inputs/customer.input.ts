
import { Gender } from '@/shared/enums';
import { InputType, OmitType, PartialType, Field } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { isEmail, IsEmail, IsNotEmpty, IsOptional, Length, max, Max, MaxLength, Min, validate, IsEnum } from 'class-validator';
import JSON from 'graphql-type-json';

@InputType()
export class CustomerInput {
  @Field({ nullable: true, defaultValue: '' })
  @Length(3, 50, {
    groups: ['byFull'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  firstName?: string;

  @Field({ nullable: true, defaultValue: '' })
  @Length(3, 50, {
    groups: ['byFull'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  lastName?: string;

  @Field({ nullable: true, defaultValue: '' })
  @IsEmail()
  @Length(3, 50, {
    groups: ['byEmail'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  email?: string;

  @Field({ nullable: true, defaultValue: '' })
  @Length(3, 50, {
    groups: ['default'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  name?: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 20, {
    groups: ['default', 'byFull', 'byEmail'],
    message: 'Your password must be between 6 and 20 characters.'
  })
  password: string;

  @Field(() => Gender, { nullable: true })
  @IsEnum(Gender)
  gender?: Gender;
}

@InputType('CreateCustomerInput')
export class CreateCustomerInput {
  @Field({ nullable: true, defaultValue: '' })
  @Length(3, 50, {
    groups: ['byFull'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  firstName?: string;

  @Field({ nullable: true, defaultValue: '' })
  @Length(3, 50, {
    groups: ['byFull'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  lastName?: string;

  @Field({ nullable: true, defaultValue: '' })
  @IsEmail()
  @Length(3, 50, {
    groups: ['byEmail'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  email?: string;

  @Field({ nullable: true, defaultValue: '' })
  @Length(3, 50, {
    groups: ['default'],
    message: 'Your password must be between 3 and 50 characters.'
  })
  name?: string;

  @Field()
  @Length(6, 20, {
    groups: ['default', 'byFull', 'byEmail'],
    message: 'Your password must be between 6 and 20 characters.'
  })
  password: string;

  @Field(() => Gender, { nullable: true })
  @IsEnum(Gender)
  gender?: Gender;

  constructor(param){
    if(param){
      Object.assign(
				this,
				plainToInstance(CreateCustomerInput, param)
			)
    }
  }
}

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput, InputType) { }

@InputType()
export class LoginCustomerInput extends OmitType(CustomerInput, ['gender']) { }

@InputType()
export class FileInput {
  @Field()
  filename: string
}

@InputType()
export class RecordInput {
  @Field()
  Customer: CustomerInput

  @Field()
  File: FileInput
}

@InputType()
export class SearchInput {
  @Field(() => [String])
  select: string[]

  @Field(() => RecordInput)
  where: RecordInput

  @Field()
  start: number

  @Field()
  @Min(0)
  end: number

  @Field(() => JSON)
  order: Object

  @Field()
  @Min(0)
  skip: number = 0;

  @Field()
  @Min(1)
  @Max(50)
  take: number = 25;
}