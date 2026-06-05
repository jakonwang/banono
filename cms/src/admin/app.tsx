import type { StrapiApp } from '@strapi/strapi/admin'

export default {
  config: {
    locales: ['zh-Hans', 'en']
  },
  bootstrap(_app: StrapiApp) {}
}
