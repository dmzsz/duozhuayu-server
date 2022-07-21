import { IBase } from './interface/base.interface';
import { EmailType } from '@/shared/enums';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass, plainToInstance, Type } from 'class-transformer';
import { Customer } from './customer.type';

@ObjectType({
    implements: () => [IBase],
})
export class Email extends IBase<Email> {
    
    /**
     * 发送者
    */
    @Expose()
    @Type(() => Customer)
    @Field(() => Customer)
    fromCustomer: Customer

    /**
     * 接受者
     */
    @Expose()
    @Type(() => Customer)
    @Field(() => Customer)
    toCustomer: Customer


    @Expose()
    @Field(() => EmailType)
    type: EmailType

    @Expose()
    @Field()
    isOpened: boolean

    constructor(email?: Partial<Email>) {
        super(email)

        if (email) {
            Object.assign(
                this,
                plainToInstance(Email, email, {
                    excludeExtraneousValues: true
                })
            )
            this.isOpened = this.isOpened || false
        }
    }
}