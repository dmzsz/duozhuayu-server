import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

// import { Customer } from '@/entities'
import { JwtPayload } from '../dto/auth.interface'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        readonly configService: ConfigService
    ) {
        super({
            algorithms: [configService.get('algorithm')],
            audience: configService.get('audience'),
            ignoreExpiration: false,
            issuer: configService.get('issuer'),
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: configService.get('access_token_secret'),   // public key
        })
    }

    async validate(payload: JwtPayload) {
        return { id: payload.id, username: payload.username, role: payload.role }
    }
}