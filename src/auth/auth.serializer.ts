import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

import type { Payload } from './dto/auth.interface'

// passport.authenticate('signin', { session: false })session: false 可以設定驗證後是否要存入 session 中
// 设置为true 会触发serializeCustomer和deserializeCustomer
@Injectable()
export class AuthSerializer extends PassportSerializer {
  // 将哪些数据序列化session中
  public serializeUser(customer: Payload, done: (err: Error | null, data?: Payload) => void): void {
    done(null, customer)
  }

  /**
   * 从session中取出data 序列化为 customer
   * 如果serializeCustomer中done(null, customer.id) deserializeCustomer就需要 done(null, service.findCustomer(data.id))
   * @param data 
   * @param done 
   */
  public deserializeUser(data: Payload, done: (err: Error | null, customer?: Payload) => void): void {
    try {
      done(null, data)
    } catch (err) {
      done(<Error>err)
    }
  }
}
