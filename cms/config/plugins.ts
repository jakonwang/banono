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
  upload: {
    config: {
      provider: 'local',
      providerOptions: {},
      sizeLimit: 10 * 1024 * 1024,
      breakpoints: {
        large: 1000,
        medium: 750,
        small: 500,
      },
      actionOptions: {},
      sort: 'createdAt:DESC',
      pageSize: 24,
    },
  },
});

export default config;
