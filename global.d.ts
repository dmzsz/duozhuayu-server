import { Payload } from './src/auth/dto/auth.interface'

declare namespace NodeJS {
  interface ProcessEnv {
    node_env: 'production' | 'development' | 'testing'
    api_env: 'stable' | 'real' | 'pre' | 'dev'
  }
}

declare namespace Normal {
  type IAnyObject = Record<string, any>
}

export declare global {
  type AnyObject = Record<string, unknown>;

  namespace Express {
    interface Request {
      id: string;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Payload {
    }
  }
}