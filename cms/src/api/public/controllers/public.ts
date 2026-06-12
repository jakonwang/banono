const localized = (cn = '', en = '') => ({ cn, en })

const ensureArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

const mediaUrl = (media: any) => {
  const url = media?.url
  if (!url) return ''
  const base = strapi.config.get('server.url') || `http://127.0.0.1:${strapi.config.get('server.port', 1337)}`
  return url.startsWith('http') ? url : `${base}${url}`
}

export default {
  async site(ctx: any) {
    const [globalSetting, homePage, factoryPage, aboutPage, contactPage, privacyPage, categories, products, certificates] =
      await Promise.all([
        (strapi.documents('api::global-setting.global-setting') as any).findFirst({ status: 'draft' }),
        (strapi.documents('api::home-page.home-page') as any).findFirst({ status: 'draft', populate: ['heroImage'] }),
        (strapi.documents('api::factory-page.factory-page') as any).findFirst({ status: 'draft', populate: ['gallery'] }),
        (strapi.documents('api::about-page.about-page') as any).findFirst({ status: 'draft', populate: ['teamImages'] }),
        (strapi.documents('api::contact-page.contact-page') as any).findFirst({ status: 'draft', populate: ['mapImage'] }),
        (strapi.documents('api::privacy-page.privacy-page') as any).findFirst({ status: 'draft' }),
        (strapi.documents('api::product-category.product-category') as any).findMany({
          status: 'draft',
          sort: ['sort:asc', 'id:asc']
        }),
        (strapi.documents('api::product.product') as any).findMany({
          status: 'draft',
          populate: ['category', 'coverImage'],
          sort: ['id:asc']
        }),
        (strapi.documents('api::certificate.certificate') as any).findMany({
          status: 'draft',
          populate: ['image'],
          sort: ['sort:asc', 'id:asc']
        })
      ])

    const categoryList = ensureArray<any>(categories)
    const productList = ensureArray<any>(products)
    const certificateList = ensureArray<any>(certificates)

    ctx.body = {
      brand: localized(globalSetting?.brandCn || 'Qiaotian Enterprise', globalSetting?.brandEn || 'Qiaotian Enterprise'),
      hero: {
        title: localized(homePage?.heroTitleCn || '', homePage?.heroTitleEn || ''),
        body: localized(homePage?.heroBodyCn || '', homePage?.heroBodyEn || '')
      },
      products: productList.map((item) => ({
        id: item.documentId || String(item.id),
        slug: item.slug || '',
        name: localized(item.titleCn || '', item.titleEn || ''),
        summary: localized(item.summaryCn || '', item.summaryEn || ''),
        tags: ensureArray<string>(item.tags),
        image: mediaUrl(item.coverImage),
        categorySlug: item.category?.slug || '',
        categoryId: item.category?.documentId || (item.category?.id ? String(item.category.id) : '')
      })),
      stats: ensureArray<any>(homePage?.stats).map((item) => ({
        value: item?.value || '',
        label: localized(item?.labelCn || '', item?.labelEn || '')
      })),
      contact: {
        phone: contactPage?.phone || globalSetting?.phone || '',
        email: contactPage?.email || globalSetting?.email || '',
        address: localized(contactPage?.addressCn || globalSetting?.addressCn || '', contactPage?.addressEn || globalSetting?.addressEn || '')
      },
      images: {
        homeHero: mediaUrl(homePage?.heroImage),
        factoryHero: ensureArray<any>(factoryPage?.gallery)[0] ? mediaUrl(ensureArray<any>(factoryPage?.gallery)[0]) : '',
        factoryGalleryMain: ensureArray<any>(factoryPage?.gallery)[0] ? mediaUrl(ensureArray<any>(factoryPage?.gallery)[0]) : '',
        factoryGalleryLab: ensureArray<any>(factoryPage?.gallery)[1] ? mediaUrl(ensureArray<any>(factoryPage?.gallery)[1]) : '',
        factoryGalleryQc: ensureArray<any>(factoryPage?.gallery)[2] ? mediaUrl(ensureArray<any>(factoryPage?.gallery)[2]) : '',
        factoryGalleryWarehouse: ensureArray<any>(factoryPage?.gallery)[3] ? mediaUrl(ensureArray<any>(factoryPage?.gallery)[3]) : '',
        aboutHero: ensureArray<any>(aboutPage?.teamImages)[0] ? mediaUrl(ensureArray<any>(aboutPage?.teamImages)[0]) : '',
        aboutLeaderOne: ensureArray<any>(aboutPage?.teamImages)[0] ? mediaUrl(ensureArray<any>(aboutPage?.teamImages)[0]) : '',
        aboutLeaderTwo: ensureArray<any>(aboutPage?.teamImages)[1] ? mediaUrl(ensureArray<any>(aboutPage?.teamImages)[1]) : '',
        contactMap: mediaUrl(contactPage?.mapImage),
        privacySecurity: '',
        certificateOne: certificateList[0] ? mediaUrl(certificateList[0].image) : '',
        certificateTwo: certificateList[1] ? mediaUrl(certificateList[1].image) : ''
      },
      sections: {
        factory: {
          heroTitle: localized(factoryPage?.heroTitleCn || '', factoryPage?.heroTitleEn || ''),
          heroBody: localized(factoryPage?.heroBodyCn || '', factoryPage?.heroBodyEn || '')
        },
        about: {
          heroTitle: localized(aboutPage?.heroTitleCn || '', aboutPage?.heroTitleEn || ''),
          heroBody: localized(aboutPage?.heroBodyCn || '', aboutPage?.heroBodyEn || '')
        },
        contact: {
          heroTitle: localized(contactPage?.heroTitleCn || '', contactPage?.heroTitleEn || ''),
          heroBody: localized(contactPage?.heroBodyCn || '', contactPage?.heroBodyEn || '')
        },
        privacy: {
          heroTitle: localized(privacyPage?.titleCn || '', privacyPage?.titleEn || ''),
          heroBody: localized(privacyPage?.bodyCn || '', privacyPage?.bodyEn || '')
        }
      },
      categories: categoryList.map((item) => ({
        id: item.documentId || String(item.id),
        slug: item.slug || '',
        name: localized(item.nameCn || '', item.nameEn || ''),
        description: localized(item.descriptionCn || '', item.descriptionEn || ''),
        sort: item.sort || 0,
        status: item.status || 'enabled'
      })),
      certificates: certificateList.map((item) => ({
        id: item.documentId || String(item.id),
        title: localized(item.titleCn || '', item.titleEn || ''),
        issuer: item.issuer || '',
        image: mediaUrl(item.image),
        sort: item.sort || 0
      }))
    }
  },

  async inquiry(ctx: any) {
    const body = ctx.request.body || {}
    const payload = body.data || body

    if (!payload?.name || !payload?.email || !payload?.message) {
      return ctx.badRequest('name, email and message are required')
    }

    try {
      const created = await (strapi.documents('api::inquiry.inquiry') as any).create({
        data: {
          name: payload.name,
          company: payload.company || '',
          email: payload.email,
          phone: payload.phone || '',
          message: payload.message,
          status: 'new',
          notes: ''
        }
      })

      ctx.body = { ok: true, id: created.documentId || created.id }
    } catch (error) {
      strapi.log.error('Failed to create inquiry', error)
      ctx.internalServerError('Failed to create inquiry')
    }
  }
}
