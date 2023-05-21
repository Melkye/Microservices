import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import CredentialsService from './credentials.service';
import CredentialsRepository from './credentials.repository';

@Module({
  imports: [HttpModule],
  providers: [CredentialsService, CredentialsRepository],
  exports: [CredentialsService],
})
export default class CredentialsModule {}
