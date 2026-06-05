import type { Core } from '@strapi/strapi'
import { seedData } from './seed-data'

const suspiciousTextPattern = /[浼鍒銆闈㈠悜鍝佺墝鍟嗘笭閬撳晢鈥€]/
const looksGarbled = (value: unknown) => typeof value === 'string' && suspiciousTextPattern.test(value)

const shouldRepairSingle = (record: any, keys: string[]) =>
  !record || keys.some((key) => !record[key] || looksGarbled(record[key]))

const shouldRepairBrand = (record: any) =>
  !record ||
  looksGarbled(record.brandCn) ||
  !record.brandCn ||
  String(record.brandCn).trim().toUpperCase() === 'BANONO'

const shouldRepairHomePage = (record: any) =>
  !record ||
  looksGarbled(record.heroTitleCn) ||
  looksGarbled(record.heroBodyCn) ||
  !record.heroTitleCn ||
  !record.heroBodyCn ||
  !Array.isArray(record.stats) ||
  record.stats.length === 0

const shouldRepairCategory = (record: any) =>
  !record || looksGarbled(record.nameCn) || looksGarbled(record.descriptionCn)

const shouldRepairProduct = (record: any) =>
  !record || looksGarbled(record.titleCn) || looksGarbled(record.summaryCn)

const shouldRepairCertificate = (record: any) => !record || looksGarbled(record.titleCn)

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const globalSetting = await strapi.documents('api::global-setting.global-setting').findFirst({ status: 'draft' })
    if (!globalSetting) {
      await strapi.documents('api::global-setting.global-setting').create({ data: seedData.globalSetting })
    } else if (shouldRepairBrand(globalSetting) || shouldRepairSingle(globalSetting, ['addressCn'])) {
      await strapi.documents('api::global-setting.global-setting').update({
        documentId: (globalSetting as any).documentId,
        status: 'draft',
        data: {
          ...seedData.globalSetting,
          brandEn: (globalSetting as any).brandEn || seedData.globalSetting.brandEn
        }
      })
    }

    const homePage = await strapi.documents('api::home-page.home-page').findFirst({ status: 'draft' })
    if (!homePage) {
      await strapi.documents('api::home-page.home-page').create({ data: seedData.homePage })
    } else if (shouldRepairHomePage(homePage)) {
      await strapi.documents('api::home-page.home-page').update({
        documentId: (homePage as any).documentId,
        status: 'draft',
        data: seedData.homePage
      })
    }

    const factoryPage = await strapi.documents('api::factory-page.factory-page').findFirst({ status: 'draft' })
    if (!factoryPage) {
      await strapi.documents('api::factory-page.factory-page').create({ data: seedData.factoryPage })
    } else if (shouldRepairSingle(factoryPage, ['heroTitleCn', 'heroBodyCn'])) {
      await strapi.documents('api::factory-page.factory-page').update({
        documentId: (factoryPage as any).documentId,
        status: 'draft',
        data: seedData.factoryPage
      })
    }

    const aboutPage = await strapi.documents('api::about-page.about-page').findFirst({ status: 'draft' })
    if (!aboutPage) {
      await strapi.documents('api::about-page.about-page').create({ data: seedData.aboutPage })
    } else if (shouldRepairSingle(aboutPage, ['heroTitleCn', 'heroBodyCn', 'introCn'])) {
      await strapi.documents('api::about-page.about-page').update({
        documentId: (aboutPage as any).documentId,
        status: 'draft',
        data: seedData.aboutPage
      })
    }

    const contactPage = await strapi.documents('api::contact-page.contact-page').findFirst({ status: 'draft' })
    if (!contactPage) {
      await strapi.documents('api::contact-page.contact-page').create({ data: seedData.contactPage })
    } else if (shouldRepairSingle(contactPage, ['heroTitleCn', 'heroBodyCn', 'addressCn'])) {
      await strapi.documents('api::contact-page.contact-page').update({
        documentId: (contactPage as any).documentId,
        status: 'draft',
        data: seedData.contactPage
      })
    }

    const privacyPage = await strapi.documents('api::privacy-page.privacy-page').findFirst({ status: 'draft' })
    if (!privacyPage) {
      await strapi.documents('api::privacy-page.privacy-page').create({ data: seedData.privacyPage })
    } else if (shouldRepairSingle(privacyPage, ['titleCn', 'bodyCn'])) {
      await strapi.documents('api::privacy-page.privacy-page').update({
        documentId: (privacyPage as any).documentId,
        status: 'draft',
        data: seedData.privacyPage
      })
    }

    const existingCategories = await strapi.documents('api::product-category.product-category').findMany({ status: 'draft' })
    if (!existingCategories.length) {
      for (const item of seedData.categories) {
        await strapi.documents('api::product-category.product-category').create({
          data: {
            ...item,
            status: item.status as 'enabled' | 'disabled'
          }
        })
      }
    } else {
      for (const item of seedData.categories) {
        const existing = (existingCategories as any[]).find((record) => record.slug === item.slug)
        if (shouldRepairCategory(existing)) {
          if (existing?.documentId) {
            await strapi.documents('api::product-category.product-category').update({
              documentId: existing.documentId,
              status: 'draft',
              data: {
                ...item,
                status: item.status as 'enabled' | 'disabled'
              }
            })
          }
        }
      }
    }

    const categories = await strapi.documents('api::product-category.product-category').findMany({ status: 'draft' })
    const categoryMap = new Map(categories.map((item: any) => [item.slug, item.documentId]))

    const existingProducts = await strapi.documents('api::product.product').findMany({ status: 'draft' })
    if (!existingProducts.length) {
      for (const item of seedData.products) {
        await strapi.documents('api::product.product').create({
          data: {
            titleCn: item.titleCn,
            titleEn: item.titleEn,
            summaryCn: item.summaryCn,
            summaryEn: item.summaryEn,
            slug: item.slug,
            tags: item.tags,
            status: item.status as 'published' | 'draft',
            category: categoryMap.get(item.categorySlug) || null
          }
        })
      }
    } else {
      for (const item of seedData.products) {
        const existing = (existingProducts as any[]).find((record) => record.slug === item.slug)
        if (shouldRepairProduct(existing) && existing?.documentId) {
          await strapi.documents('api::product.product').update({
            documentId: existing.documentId,
            status: 'draft',
            data: {
              titleCn: item.titleCn,
              titleEn: item.titleEn,
              summaryCn: item.summaryCn,
              summaryEn: item.summaryEn,
              slug: item.slug,
              tags: item.tags,
              status: item.status as 'published' | 'draft',
              category: categoryMap.get(item.categorySlug) || null
            }
          })
        }
      }
    }

    const existingCertificates = await strapi.documents('api::certificate.certificate').findMany({ status: 'draft' })
    if (!existingCertificates.length) {
      for (const item of seedData.certificates) {
        await strapi.documents('api::certificate.certificate').create({ data: item })
      }
    } else {
      for (const item of seedData.certificates) {
        const existing = (existingCertificates as any[]).find((record) => record.sort === item.sort)
        if (shouldRepairCertificate(existing) && existing?.documentId) {
          await strapi.documents('api::certificate.certificate').update({
            documentId: existing.documentId,
            status: 'draft',
            data: item
          })
        }
      }
    }
  }
}
