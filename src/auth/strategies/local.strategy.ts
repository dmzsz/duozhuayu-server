import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import type { Payload } from '../dto/auth.interface'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super()
  }

  public async validateCustomer(username: string, password: string): Promise<Payload> {
    const customer = await this.auth.validateCustomer(username, password)
    if (!customer) {
      throw new UnauthorizedException('NotFoundCustomer')
    }

    return { id: customer.id, username: customer.name, role: customer.role?.name }
  }
}
