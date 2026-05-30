import { Module } from '@nestjs/common';
import { GraphWebhookController } from './graph-webhook.controller';

@Module({
  controllers: [GraphWebhookController],
})
export class GraphWebhookModule {}
