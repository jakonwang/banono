import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  email: {
    config: {
      provider: 'sendmail',
      providerOptions: {},
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'no-reply@joesky3c.com'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'sales@joesky3c.com'),
      },
    },
  },
});

export default config;
