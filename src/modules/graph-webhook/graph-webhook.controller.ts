import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

/**
 * Receives Microsoft Graph change notifications.
 * - Handles the subscription validation handshake (echo validationToken).
 * - Acknowledges quickly (202) and enqueues work for the worker.
 *
 * TODO: validate clientState, dedupe, and enqueue `mail.process` jobs.
 */
@Controller('webhooks/graph')
export class GraphWebhookController {
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  handleNotification(
    @Query('validationToken') validationToken: string | undefined,
    @Body() body: unknown,
    @Res() res: Response,
  ): void {
    // Validation handshake: Graph sends ?validationToken=... and expects it echoed back as text/plain.
    if (validationToken) {
      res.status(HttpStatus.OK).type('text/plain').send(validationToken);
      return;
    }

    // TODO: validate clientState + enqueue processing job(s) from `body`.
    void body;
    res.status(HttpStatus.ACCEPTED).send();
  }
}
