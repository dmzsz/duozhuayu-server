import { Global, Module } from '@nestjs/common';

// import * as providers from './providers';
import { ConfigService } from './providers/config.service';
import { EmailService } from './providers/email.service';
import { Logger } from './providers/logger.service';
import { PasswordService } from './providers/password.service';
import { RequestContext } from './providers/request-context.service';
import { UtilService } from './providers/util.service';

@Global()
@Module({
  providers: [
    ConfigService,
    EmailService,
    Logger,
    PasswordService,
    RequestContext,
    UtilService
  ],
  exports: [
    ConfigService,
    EmailService,
    Logger,
    PasswordService,
    RequestContext,
    UtilService
  ],
})
export class CommonModule { }
