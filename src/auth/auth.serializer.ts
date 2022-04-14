import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

import type { Payload } from './dto/auth.interface'

// passport.authenticate('signin', { session: false })session: false 可以設定驗證後是否要存入 session 中
// 设置为true 会触发serializeUser和deserializeUser
@Injectable()
export class AuthSerializer extends PassportSerializer {
  // 将哪些数据序列化session中
  public serializeUser(user: Payload, done: (err: Error | null, data?: Payload) => void): void {
    done(null, user)
  }

  /**
   * 从session中取出data 序列化为 user
   * 如果serializeUser中done(null, user.id) deserializeUser就需要 done(null, service.findUser(data.id))
   * @param data 
   * @param done 
   */
  public deserializeUser(data: Payload, done: (err: Error | null, user?: Payload) => void): void {
    try {
      done(null, data)
    } catch (err) {
      done(<Error>err)
    }
  }
}
