import { IBase } from './interface/base.interface'
import { ObjectType } from '@nestjs/graphql'

@ObjectType({
    implements: () => [IBase],
})
export class ShoppingCart extends IBase<ShoppingCart> {
    
}