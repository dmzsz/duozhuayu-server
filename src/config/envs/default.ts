
import { join } from 'path'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { CustomNamingStrategy } from './custom-nameing-strategy'
// type Iconfig = {
//   [key: string]: any,
//   graphql: ApolloDriverConfig
// }
let graphql: ApolloDriverConfig = {
  path: 'graphql',
  autoSchemaFile: join(process.cwd(), './src/generator/schema.graphql'),
  autoTransformHttpErrors: true,
  debug: true,
  installSubscriptionHandlers: true,
  playground: true, //{ settings: { 'request.credentials': 'include' } },
  sortSchema: true,
}

export const config = {
  // application
  author: process.env.author || 'dmzsz',
  primary_color: process.env.primary_color || '#87e8de',
  domain: process.env.domain || 'localhost',
  port: +process.env.port || 3000,
  end_point: process.env.end_point || 'graphql',
  rate_limit_max: +process.env.rate_limit_max || 10000,

  // pubsub
  NOTIFICATION_SUBSCRIPTION: 'newNotification',
  USER_SUBSCRIPTION: 'newUser',
  MESSAGES_SUBSCRIPTION: 'newMessages',

  // nodemailer
  nodemailer_user: process.env.nodemailer_user || 'xxx',
  nodemailer_pass: process.env.nodemailer_pass || 'xxx',

  aws: {
    access_key_id: 'access_key_id',
    secret_access_key: 'secret_access_key',
    region: 'region',
  },

  graphql: Object.assign(
    graphql,
    { graphql_depth_limit: +process.env.graphql_depth_limit || 3 }
  ),

  // access
  access_token_secret: process.env.access_token_secret || 'access-token-key',
  access_token: process.env.access_token || 'access-token',
  algorithm: process.env.algorithm || 'SHA-256', // jsonwebtoken default HS256
  audience: process.env.audience || 'http://github.com/dmzsz',
  bcrypt_salt: +process.env.BCRYPT_SALT || 10,
  email_token_secret: process.env.email_token_secret || 'email-token-key',
  email_token: process.env.email_token || 'email-token',
  issuer: process.env.issuer || 'dmzsz',
  refresh_token_secret: process.env.refresh_token_secret || 'refresh-token-key',
  refresh_token: process.env.refresh_token || 'refresh-token',
  resetpass_token_secret: process.env.resetpass_token_secret || 'resetpass-token-key',
  resetpass_token: process.env.resetpass_token || 'resetpass-token',

  // auth
  google_client_id: process.env.google_client_id || 'xxx',
  google_client_secret: process.env.google_client_secret || 'xxx',
  google_callback_url: process.env.google_callback_url || 'auth/google/callback',
  facebook_app_id: process.env.facebook_app_id || 'xxx',
  facebook_app_secret: process.env.facebook_app_secret || 'xxx',
  facebook_callback_url: process.env.facebook_callback_url || 'auth/facebook/callback',

  cors: {
    enabled: true,
    credentials: true,
    origin: ['*'] // 1.boolean 2.RegExp /example\.com$/ 3.Array:Each origin can be a String or a RegExp 4.callback(err, origin)
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  security: {
    expiresIn: '30d',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,

    accessToken: {
      privateKey: process.env.access_token_secret || 'access-token-key',
      signOptions: {
        expiresIn: '7d' // 15m 15分钟 15 * 60000
      }
    },
    refreshToken: {
      privateKey: process.env.refresh_token_secret || 'refresh-token-key',
      signOptions: {
        expiresIn: '30d' // 30d
      }
    },
    emailToken: {
      privateKey: process.env.email_token_secret || 'email-token-key',
      signOptions: {
        expiresIn: '1d' // 1d
      }
    },
    resetPassToken: {
      privateKey: process.env.resetpass_token_secret || 'resetpass-token-key',
      signOptions: {
        expiresIn: '1d' // 1d
      }
    }
  },

  db: {
    namingStrategy: new CustomNamingStrategy(),
  }
}