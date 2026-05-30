import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailboxModule } from './modules/mailbox/mailbox.module';
import { RulesModule } from './modules/rules/rules.module';
import { ThreadsModule } from './modules/threads/threads.module';
import { MessagesModule } from './modules/messages/messages.module';
import { DraftsModule } from './modules/drafts/drafts.module';
import { AiModule } from './modules/ai/ai.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { QueueModule } from './modules/queue/queue.module';
import { GraphWebhookModule } from './modules/graph-webhook/graph-webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    AuthModule,
    MailboxModule,
    RulesModule,
    ThreadsModule,
    MessagesModule,
    DraftsModule,
    AiModule,
    NotificationsModule,
    QueueModule,
    GraphWebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
