import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { forwardRef, Global, Module } from '@nestjs/common'

import { AuthSerializer } from './auth.serializer'
import { AuthService } from './auth.service'
// import { LocalStrategy, JwtStrategy, JwtRefreshStrategy } from './strategies'
import { PassportModule } from '@nestjs/passport'
import { UserService } from '../graphql/services/user.service';
import { GraphqlModule } from '../graphql/graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm'
// import { User } from '@/entities'
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { User } from '@/entities/user.entity'

@Global()
@Module({
  imports: [
    // TypeOrmModule.forFeature([
    //   User,
    // ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('access_token_secret'),
        signOptions: {
          algorithm: configService.get('algorithm'),
          audience: configService.get('audience'),
          expiresIn: '30d',
          issuer: configService.get('issuer'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthSerializer,
    AuthService,
    JwtRefreshStrategy,
    JwtStrategy,
    LocalStrategy,
    // {
    //   provide: 'JwtEmailService',
    //   useFactory: (configService: ConfigService) => {
    //     return new JwtService({
    //       secret: configService.get('email_token_secret'),
    //       signOptions: {
    //         expiresIn: '1d',
    //         algorithm: 'HS256',
    //       },
    //     })
    //   },
    //   inject: [ConfigService],
    // },
    // {
    //   provide: 'resetPassEmailService',
    //   useFactory: (configService: ConfigService) => {
    //     return new JwtService({
    //       secret: configService.get('resetpass_token_secret'),
    //       signOptions: {
    //         expiresIn: '1d',
    //         algorithm: 'HS256',
    //       },
    //     })
    //   },
    //   inject: [ConfigService],
    // }
  ],
  exports: [
    // 'JwtEmailService',
    // 'resetPassEmailService',
    AuthService,
  ],
})
export class AuthModule { }
