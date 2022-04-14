import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hash, compare } from 'bcrypt'
import { Default } from '@/config/config.interface';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) { }

  /**
   * Returns boolean by compare password.
   *
   * @remarks
   * This method is part of the {@link utils/password}.
   *
   * @param password - 1st input number
   * @param hashedPassword - The second input number
   * @returns The boolean mean of `password` and `hash`
   *
   * @beta
   */
  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }


  /**
   * Returns hashed password by hash password.
   *
   * @remarks
   * This method is part of the {@link utils/password}.
   *
   * @param password - 1st input number
   * @returns The hashed password mean of `password`
   *
   * @beta
   */
  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds)
  }

  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<Default['security']>('security')
    const saltOrRounds = securityConfig.bcryptSaltOrRound

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds
  }
}
