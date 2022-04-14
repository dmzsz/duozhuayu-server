import { registerEnumType } from '@nestjs/graphql'

export enum EmailType {
    VERIFY_EMAIL = 'verify_email', // 数据库如果存储的是'1'话 会返回错误信息 'Enum \'EmailType\' cannot represent value: \'1\''
    FORGOT_PASSWORD = 'forgot_password'
}

registerEnumType(EmailType, {
    name: 'EmailType',
    valuesMap: {
        VERIFY_EMAIL: { description: 'verify_email' },
        FORGOT_PASSWORD: { description: 'forgot_password' },
    }
})
