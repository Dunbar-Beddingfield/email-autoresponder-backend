import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3001),
  APP_URL: z.string().url().optional(),
  WEB_APP_URL: z.string().url().optional(),

  // Datastores
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1).default('redis://localhost:6379'),

  // Security (required in production, optional in dev/test for easier bootstrap)
  TOKEN_ENCRYPTION_KEY: z.string().optional(),
  SESSION_SECRET: z.string().optional(),

  // Microsoft Graph
  MS_CLIENT_ID: z.string().optional(),
  MS_CLIENT_SECRET: z.string().optional(),
  MS_TENANT_ID: z.string().default('common'),
  MS_REDIRECT_URI: z.string().optional(),
  GRAPH_WEBHOOK_CLIENT_STATE: z.string().optional(),
  GRAPH_WEBHOOK_NOTIFICATION_URL: z.string().optional(),

  // AI - Anthropic
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default('claude-sonnet-4-5'),

  // Embeddings - Voyage AI
  VOYAGE_API_KEY: z.string().optional(),
  VOYAGE_MODEL: z.string().default('voyage-3.5'),
  VOYAGE_EMBED_DIM: z.coerce.number().int().positive().default(1024),

  // WhatsApp - Meta Cloud API
  WHATSAPP_ACCESS_TOKEN: z.string().optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().optional(),
  WHATSAPP_VERIFY_TOKEN: z.string().optional(),

  // Behavior
  AUTO_SEND_CONFIDENCE_THRESHOLD: z.coerce.number().min(0).max(1).default(0.75),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  return parsed.data;
}
