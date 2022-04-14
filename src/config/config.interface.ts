import type { config as base } from './envs/default'
import type { config as production } from './envs/production'
import { ApolloDriverConfig } from '@nestjs/apollo'
export type Objectype = Record<string, unknown>
export type Default = typeof base
export type Production = typeof production
export type Config = Default & Production
export type GqlOptions = ApolloDriverConfig
export type SecurityConfig = typeof base.security
