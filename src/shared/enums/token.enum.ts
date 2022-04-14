import { registerEnumType } from '@nestjs/graphql'

export enum TokenType {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
    EMAIL_TOKEN = 'email_token',
    RESETPASS_TOKEN = 'resetpass_token'
}

registerEnumType(TokenType, {
    name: 'TokenType',
}) 
