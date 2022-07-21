import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import type { JwtPayload, Payload } from '../dto/auth.interface'
import { AuthService } from '../auth.service'

/**
 * PassportStrategy(Strategy) 中使用 mixin 将JwtStrategy -> MixinStrategy -> Strategy 组建继承链
 * passport-jwt中的Strategy name 默认是'jwt'
 * passport中定义了很多认证策略通过name区分， require('passport') 每次返回都是同一个实例
 * function PassportStrategy(Strategy, name) {
 *  class MixinStrategy extends Strategy {
 *     constructor(...args) {
 *      ...
 * 
 *      const callback = (...params) => __awaiter(this, void 0, void 0, function* () {
 *        ...
 *          const validateResult = yield this.validate(...params) // ！！！把用户自定义的validate()传递给jwt策略
 *        ...
 *      }
 *      super(...args, callback) // callback传递给JwtStrategy.prototype.authenticate中调用 ！！！
 * 
 *      // passportInstance.use 方法将Strategy注册到passport中的_strategies变量中  this._strategies[name] = strategy
 *      if(name) {
 *        passportInstance.use(name, this) // 这里的name 可以根据情况自定义叫 email-jwt repassword-jwt什么的
 *      } else {
 *        passportInstance.use(this) // JwtStrategy中存在 this.name='jwt'
 *      }
 *      ...
 *     }
 *     passportInstance(){
 *        return passport // const passport = require('passport')
 *     } 
 *  }
 * }
 * 
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      algorithms: [configService.get('algorithm')],
      audience: configService.get('audience'),
      ignoreExpiration: false,
      issuer: configService.get('issuer'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('access_token_secret'),   // public key
    })
  }


  /** Authenticator 是passport的默认导出 
   *    var Passport = require('./authenticator') 
   *    exports = module.exports = new Passport()  
   *    看似每次require的时候都new了一次 其实只有一个实例，被缓存了
   * Authenticator.prototype.authenticate = function(strategy, options, callback) {
   *    // _framework在passport.init中引入 this.framework(require('./framework/connect')()) // 里面包含import  middleware\authenticate.js
   *    return this._framework.authenticate(this, strategy, options, callback)
   * }
   * 
   * middleware\authenticate.js中有以下定义
   * // passport 是 new Authenticator() 的this
   * // name 是之前定义的 默认name 'jwt' !!! 这里要关联上了
   *  passport.authenticate('jwt', { session: false })(req, res)
   * ！！！通过继承@nestjs/passport.AuthGuard('jwt'// ！！！之前的name和这里对应) 定义新的守卫，在canActivate中会调用passport.authticate
   * module.exports = function authenticate(passport, name, options, callback) {
   *  ...
   *  // 看到这个入参可以断定是中间件了
   *  return function authenticate(req, res, next) {
   *    (function attempt(i) { 
   *      var layer = name[i]
   *      var strategy, prototype
   *      if (typeof layer.authenticate == 'function') { // name传递的如果是function的话
   *        strategy = layer
   *      } else { // name传递的如果是字符串的话
   *        prototype = passport._strategy(layer) // 调用之前use传递引来的jwt策略 ！！！ 找到jwt策略了
   *        strategy = Object.create(prototype)
   *      }
   *      // 把jwt策略里面绑定处理方法, 并不影响其他jwt策略，因为里面有不同的options和callback passport.authenticate('jwt', options,callback)
   *      // AuthGuard('jwt')的canActivate中会执行request[options.property || defaultOptions.property] = customer option.ts 中有配置默认值 property: 'customer'
   *      strategy.success = function(customer, info) { }
   *      strategy.fail = function(challenge, status) {}
   *      strategy.redirect = function(url, status) {}
   *      strategy.pass = function() {}
   *      strategy.error = function(err) { 执行上面的callback }
   *      strategy.authenticate(req, options) // 执行jwt策略里面的authenticate  public validate(payload: JwtPayload): Payload {} ！！！
   *    })(0)
   *  }
   * }
   * 
   * 在 jwt策略 构造方法中将包含有validate()的
   * 上面有讲到class MixinStrategy extends Strategy { super(...args, callback) } verify就是callback函数
   *  function JwtStrategy(options, verify) {
   *    this._verify = verify
   *    this._jwtFromRequest = options.jwtFromRequest // 用户自己配置的 决定从哪里获取token 一般是request的header中 也有可能在url或body里面，如email 验证url 实际上并不能解决JwtService，JWTMoudule只能创建一个JwtService
   *  }
   * 
   *  // 他被绑定到possport的策略数组中 
   *  JwtStrategy.prototype.authenticate = function(req, options) {
   *  var token = self._jwtFromRequest(req)
   *  // 这个方法调用的 require('jsonwebtoken')verify()方法
   *  // req是中间件中的request对象
   *  this._secretOrKeyProvider(req, token, function(secretOrKeyError, secretOrKey) {
   *    if (self._passReqToCallback) {
   *      // verified是要用在守卫中的回调
   *      self._verify(req, payload, verified)// ！！！request中验证成功的jwt payload 会传递给 validate，然后在调用 verified(null, validate(req, payload))
   *    } else {
   *      self._verify(payload, verified) // ！！！request中验证成功的jwt payload 会传递给 validate，然后在调用 verified(null, validate(payload))
   *    }
   *   }
   * }
   * @param payload jwt.verify 的callback中返回的验证正确的payload
   * @returns 返回值会传给passport.success
   */
  async validate(payload: JwtPayload): Promise<Payload> {
    // 没什么必要,除非密钥丢失了payload被篡改
    // const customer = await this.authService.validateCustomerById(payload.sub)
    // if (!customer) {
    //   throw new UnauthorizedException()
    // }
    return { id: payload.id, username: payload.username, role: payload.role }
  }
}
