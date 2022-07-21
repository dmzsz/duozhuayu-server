import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Token } from './models/token.model'

import type { JwtPayload, Payload } from './dto/auth.interface'
import { ConfigService } from '@nestjs/config'
import { TokenType } from '@/shared/enums'
import { sign, verify } from 'jsonwebtoken'
import { getRepository, Repository } from 'typeorm'
import { PasswordService } from '@/common/providers/password.service'
import { Customer } from '@/entities/customer.entity'
import { SecurityConfig } from '@/config/config.interface'

type CustomerModleOmitPassword = Omit<Customer, 'password'>

@Injectable()
export class AuthService {
  private ALGORITHM: string
  private AUDIENCE: string
  private ISSUER: string
  private securityConfig: SecurityConfig

  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private configService: ConfigService
  ) {
    this.ALGORITHM = configService.get('algorithm')
    this.AUDIENCE = configService.get('audience')
    this.ISSUER = configService.get('issuer')
    this.securityConfig = configService.get<SecurityConfig>('security')
  }

  /**
   * 验证用户名和密码
   * @param name 
   * @param password 
   * @returns 没有password 字段的Customer实例
   */
  public async validateCustomer(name: string, password: string): Promise<CustomerModleOmitPassword | null> {
    const customer = await getRepository(Customer).findOne({
      where: {
        name: name,
      },
    })

    if (customer && await this.passwordService.validatePassword(password, customer.password)) {
      const { password: _, ...result } = customer
      return new Customer(result)
    }

    return null
  }

  public signJwt(customer: CustomerModleOmitPassword): { access_token: string } {
    const payload: JwtPayload = { id: customer.id, username: customer.name, role: customer.role?.name }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  /**
   * 生成 accessToken 和 refreshToken
   * @param payload 
   * @returns 
   */
  generateTokens(payload: JwtPayload): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  private generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload)
  }

  generateToken(user: Customer, type: TokenType): string {
    // payload is JwtPayload type
    return sign(
      {
        id: user.id,
        username: user.name,
        role: user.role?.name
      },
      this.securityConfig[type].privateKey,
      {
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
        algorithm: this.configService.get('algorithm'), // ?? 好神奇呀 不能使用 this.ALGORITHM
        expiresIn: this.securityConfig[type].signOptions.expiresIn
      }
    )
  }

  private generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.securityConfig.refreshToken.privateKey,
      expiresIn: this.securityConfig.refreshToken.signOptions.expiresIn,
    })
  }

  refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.securityConfig.refreshToken.privateKey,
      })

      return this.generateTokens(payload)
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
