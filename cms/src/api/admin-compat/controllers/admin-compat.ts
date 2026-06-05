import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

type LocalizedValue = {
  cn?: string
  en?: string
}

type AdminCategoryPayload = {
  name?: LocalizedValue
  description?: LocalizedValue
  sort?: number
  status?: 'enabled' | 'disabled'
  slug?: string
}

type AdminProductPayload = {
  categoryId?: string
  name?: LocalizedValue
  summary?: LocalizedValue
  tags?: string[]
  image?: string
  status?: 'draft' | 'published'
  slug?: string
}

type AdminCertificatePayload = {
  title?: LocalizedValue
  issuer?: string
  image?: string
  sort?: number
}

const localized = (cn = '', en = '') => ({ cn, en })

const firstString = (...values: Array<unknown>) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

const ensureArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

const normalizeCategoryStatus = (value: unknown): 'enabled' | 'disabled' =>
  value === 'disabled' ? 'disabled' : 'enabled'

const normalizeProductStatus = (value: unknown): 'draft' | 'published' =>
  value === 'draft' ? 'draft' : 'published'

const normalizeInquiryStatus = (value: unknown): 'new' | 'processing' | 'quoted' | 'done' => {
  if (value === 'processing' || value === 'quoted' || value === 'done') return value
  return 'new'
}

const compatDataDir = path.join(process.cwd(), '.tmp')
const compatStateFile = path.join(compatDataDir, 'admin-compat-state.json')

type CompatRole = 'super_admin' | 'editor' | 'sales'

type CompatUser = {
  username: string
  password: string
  role: CompatRole
}

type CompatSession = {
  token: string
  username: string
  role: CompatRole
  createdAt: number
}

type CompatAuditLog = {
  id: string
  action: string
  detail: string
  actor: string
  createdAt: string
}

type CompatState = {
  users: CompatUser[]
  sessions: CompatSession[]
  auditLogs: CompatAuditLog[]
}

const defaultCompatState = (): CompatState => ({
  users: [
    { username: 'super_admin', password: 'admin123456', role: 'super_admin' },
    { username: 'editor', password: 'editor123456', role: 'editor' },
    { username: 'sales', password: 'sales123456', role: 'sales' }
  ],
  sessions: [],
  auditLogs: []
})

const ensureCompatStateFile = async () => {
  await mkdir(compatDataDir, { recursive: true })
  try {
    await readFile(compatStateFile, 'utf8')
  } catch {
    await writeFile(compatStateFile, JSON.stringify(defaultCompatState(), null, 2), 'utf8')
  }
}

const readCompatState = async (): Promise<CompatState> => {
  await ensureCompatStateFile()
  try {
    const raw = await readFile(compatStateFile, 'utf8')
    const parsed = JSON.parse(raw || '{}')
    return {
      users: ensureArray<CompatUser>(parsed.users),
      sessions: ensureArray<CompatSession>(parsed.sessions),
      auditLogs: ensureArray<CompatAuditLog>(parsed.auditLogs)
    }
  } catch {
    const fallback = defaultCompatState()
    await writeCompatState(fallback)
    return fallback
  }
}

const writeCompatState = async (state: CompatState) => {
  await ensureCompatStateFile()
  await writeFile(compatStateFile, JSON.stringify(state, null, 2), 'utf8')
}

const createToken = () => `compat_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

const getSessionToken = (ctx: any) => firstString(ctx.request?.headers?.['x-session-token'], ctx.request?.header?.['x-session-token'])

const getSessionActor = async (ctx: any) => {
  const token = getSessionToken(ctx)
  if (!token) return 'system'
  const state = await readCompatState()
  return state.sessions.find((item) => item.token === token)?.username || 'system'
}

const appendAuditLog = async (action: string, detail: string, actor: string) => {
  const state = await readCompatState()
  state.auditLogs.unshift({
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    action,
    detail,
    actor,
    createdAt: new Date().toISOString()
  })
  state.auditLogs = state.auditLogs.slice(0, 200)
  await writeCompatState(state)
}

const mapCategory = (item: any) => ({
  id: item.documentId || String(item.id),
  name: localized(item.nameCn || '', item.nameEn || ''),
  description: localized(item.descriptionCn || '', item.descriptionEn || ''),
  sort: item.sort || 0,
  status: normalizeCategoryStatus(item.status),
  slug: item.slug || ''
})

const mapProduct = (item: any) => ({
  id: item.documentId || String(item.id),
  categoryId: item.category?.documentId || item.category?.id ? String(item.category?.documentId || item.category?.id) : '',
  name: localized(item.titleCn || '', item.titleEn || ''),
  summary: localized(item.summaryCn || '', item.summaryEn || ''),
  tags: ensureArray<string>(item.tags),
  image: item.coverImage?.url || '',
  status: normalizeProductStatus(item.status),
  slug: item.slug || ''
})

const mapCertificate = (item: any) => ({
  id: item.documentId || String(item.id),
  title: localized(item.titleCn || '', item.titleEn || ''),
  issuer: item.issuer || '',
  image: item.image?.url || '',
  sort: item.sort || 0
})

const mapInquiry = (item: any) => ({
  id: item.documentId || String(item.id),
  name: item.name || '',
  company: item.company || '',
  email: item.email || '',
  phone: item.phone || '',
  message: item.message || '',
  status: item.status || 'new',
  createdAt: item.createdAt || '',
  updatedAt: item.updatedAt || '',
  notes: item.notes || ''
})

const categoryInputFromPayload = (payload: AdminCategoryPayload) => ({
  nameCn: firstString(payload.name?.cn, payload.name?.en, '未命名分类'),
  nameEn: firstString(payload.name?.en, payload.name?.cn, 'Category'),
  descriptionCn: firstString(payload.description?.cn),
  descriptionEn: firstString(payload.description?.en),
  sort: typeof payload.sort === 'number' ? payload.sort : 0,
  status: normalizeCategoryStatus(payload.status),
  slug: firstString(payload.slug, payload.name?.en, payload.name?.cn, `category-${Date.now()}`)
})

const productInputFromPayload = async (payload: AdminProductPayload) => {
  let category: string | null = null
  if (payload.categoryId) {
    const categoryDoc = await strapi
      .documents('api::product-category.product-category')
      .findOne({ documentId: payload.categoryId, status: 'draft' })
    category = categoryDoc?.documentId || null
  }

  return {
    titleCn: firstString(payload.name?.cn, payload.name?.en, '未命名产品'),
    titleEn: firstString(payload.name?.en, payload.name?.cn, 'Product'),
    summaryCn: firstString(payload.summary?.cn),
    summaryEn: firstString(payload.summary?.en),
    slug: firstString(payload.slug, payload.name?.en, payload.name?.cn, `product-${Date.now()}`),
    tags: ensureArray<string>(payload.tags),
    status: normalizeProductStatus(payload.status),
    category
  }
}

const certificateInputFromPayload = (payload: AdminCertificatePayload) => ({
  titleCn: firstString(payload.title?.cn, payload.title?.en, '未命名证书'),
  titleEn: firstString(payload.title?.en, payload.title?.cn, 'Certificate'),
  issuer: firstString(payload.issuer),
  sort: typeof payload.sort === 'number' ? payload.sort : 0
})

const getSingleDraft = async (uid: string) => (strapi.documents(uid as any) as any).findFirst({ status: 'draft' })

const buildSiteModel = async () => {
  const [globalSetting, homePage, factoryPage, aboutPage, contactPage, privacyPage, categories, products, certificates] =
    await Promise.all([
      getSingleDraft('api::global-setting.global-setting'),
      getSingleDraft('api::home-page.home-page'),
      getSingleDraft('api::factory-page.factory-page'),
      getSingleDraft('api::about-page.about-page'),
      getSingleDraft('api::contact-page.contact-page'),
      getSingleDraft('api::privacy-page.privacy-page'),
      (strapi.documents('api::product-category.product-category') as any).findMany({ status: 'draft', sort: ['sort:asc', 'id:asc'] }),
      (strapi.documents('api::product.product') as any).findMany({ status: 'draft', populate: ['category', 'coverImage'], sort: ['id:asc'] }),
      (strapi.documents('api::certificate.certificate') as any).findMany({ status: 'draft', populate: ['image'], sort: ['sort:asc', 'id:asc'] })
    ])

  const companyDoc = globalSetting as any
  const homeDoc = homePage as any
  const factoryDoc = factoryPage as any
  const aboutDoc = aboutPage as any
  const contactDoc = contactPage as any
  const privacyDoc = privacyPage as any

  return {
    company: {
      brand: localized(companyDoc?.brandCn || '', companyDoc?.brandEn || ''),
      phone: companyDoc?.phone || '',
      email: companyDoc?.email || '',
      address: localized(companyDoc?.addressCn || '', companyDoc?.addressEn || '')
    },
    home: {
      heroTitle: localized(homeDoc?.heroTitleCn || '', homeDoc?.heroTitleEn || ''),
      heroBody: localized(homeDoc?.heroBodyCn || '', homeDoc?.heroBodyEn || ''),
      stats: ensureArray<any>(homeDoc?.stats).map((item) => ({
        value: firstString(item?.value),
        label: localized(firstString(item?.labelCn), firstString(item?.labelEn))
      })),
      images: {
        heroImage: homeDoc?.heroImage?.url || ''
      }
    },
    factory: {
      heroTitle: localized(factoryDoc?.heroTitleCn || '', factoryDoc?.heroTitleEn || ''),
      heroBody: localized(factoryDoc?.heroBodyCn || '', factoryDoc?.heroBodyEn || ''),
      images: {}
    },
    about: {
      heroTitle: localized(aboutDoc?.heroTitleCn || '', aboutDoc?.heroTitleEn || ''),
      heroBody: localized(aboutDoc?.heroBodyCn || '', aboutDoc?.heroBodyEn || ''),
      images: {}
    },
    contact: {
      heroTitle: localized(contactDoc?.heroTitleCn || '', contactDoc?.heroTitleEn || ''),
      heroBody: localized(contactDoc?.heroBodyCn || '', contactDoc?.heroBodyEn || ''),
      phone: contactDoc?.phone || companyDoc?.phone || '',
      email: contactDoc?.email || companyDoc?.email || '',
      address: localized(contactDoc?.addressCn || '', contactDoc?.addressEn || ''),
      mapImage: contactDoc?.mapImage?.url || ''
    },
    privacy: {
      heroTitle: localized(privacyDoc?.titleCn || '', privacyDoc?.titleEn || ''),
      heroBody: localized(privacyDoc?.bodyCn || '', privacyDoc?.bodyEn || '')
    },
    productCategories: ensureArray<any>(categories).map(mapCategory),
    products: ensureArray<any>(products).map(mapProduct),
    certificates: ensureArray<any>(certificates).map(mapCertificate)
  }
}

const updateSingleSection = async (uid: string, data: Record<string, unknown>) => {
  const existing = await getSingleDraft(uid)
  if (!existing?.documentId) {
    return (strapi.documents(uid as any) as any).create({ data })
  }

  return (strapi.documents(uid as any) as any).update({
    documentId: existing.documentId,
    status: 'draft',
    data
  })
}

export default {
  async siteModel(ctx: any) {
    ctx.body = await buildSiteModel()
  },

  async updateSiteSection(ctx: any) {
    const section = ctx.params.section
    const payload = ctx.request.body || {}

    if (section === 'company') {
      await updateSingleSection('api::global-setting.global-setting', {
        brandCn: firstString(payload.brand?.cn, payload.brand?.en),
        brandEn: firstString(payload.brand?.en, payload.brand?.cn),
        phone: firstString(payload.phone),
        email: firstString(payload.email),
        addressCn: firstString(payload.address?.cn),
        addressEn: firstString(payload.address?.en)
      })
    } else if (section === 'home') {
      await updateSingleSection('api::home-page.home-page', {
        heroTitleCn: firstString(payload.heroTitle?.cn, payload.heroTitle?.en),
        heroTitleEn: firstString(payload.heroTitle?.en, payload.heroTitle?.cn),
        heroBodyCn: firstString(payload.heroBody?.cn),
        heroBodyEn: firstString(payload.heroBody?.en),
        stats: ensureArray<any>(payload.stats).map((item) => ({
          value: firstString(item?.value),
          labelCn: firstString(item?.label?.cn),
          labelEn: firstString(item?.label?.en)
        }))
      })
    } else if (section === 'factory') {
      await updateSingleSection('api::factory-page.factory-page', {
        heroTitleCn: firstString(payload.heroTitle?.cn, payload.heroTitle?.en),
        heroTitleEn: firstString(payload.heroTitle?.en, payload.heroTitle?.cn),
        heroBodyCn: firstString(payload.heroBody?.cn),
        heroBodyEn: firstString(payload.heroBody?.en)
      })
    } else if (section === 'about') {
      await updateSingleSection('api::about-page.about-page', {
        heroTitleCn: firstString(payload.heroTitle?.cn, payload.heroTitle?.en),
        heroTitleEn: firstString(payload.heroTitle?.en, payload.heroTitle?.cn),
        heroBodyCn: firstString(payload.heroBody?.cn),
        heroBodyEn: firstString(payload.heroBody?.en)
      })
    } else if (section === 'contact') {
      await updateSingleSection('api::contact-page.contact-page', {
        heroTitleCn: firstString(payload.heroTitle?.cn, payload.heroTitle?.en),
        heroTitleEn: firstString(payload.heroTitle?.en, payload.heroTitle?.cn),
        heroBodyCn: firstString(payload.heroBody?.cn),
        heroBodyEn: firstString(payload.heroBody?.en),
        phone: firstString(payload.phone),
        email: firstString(payload.email),
        addressCn: firstString(payload.address?.cn),
        addressEn: firstString(payload.address?.en)
      })
    } else if (section === 'privacy') {
      await updateSingleSection('api::privacy-page.privacy-page', {
        titleCn: firstString(payload.heroTitle?.cn, payload.heroTitle?.en),
        titleEn: firstString(payload.heroTitle?.en, payload.heroTitle?.cn),
        bodyCn: firstString(payload.heroBody?.cn),
        bodyEn: firstString(payload.heroBody?.en)
      })
    } else {
      return ctx.badRequest(`Unsupported site section: ${section}`)
    }

    ctx.body = await buildSiteModel()
  },

  async categories(ctx: any) {
    const records = await strapi
      .documents('api::product-category.product-category')
      .findMany({ status: 'draft', sort: ['sort:asc', 'id:asc'] })
    ctx.body = ensureArray<any>(records).map(mapCategory)
  },

  async createCategory(ctx: any) {
    const created = await (strapi.documents('api::product-category.product-category') as any).create({
      data: categoryInputFromPayload(ctx.request.body || {})
    })
    ctx.body = mapCategory(created)
  },

  async updateCategory(ctx: any) {
    const updated = await (strapi.documents('api::product-category.product-category') as any).update({
      documentId: ctx.params.id,
      status: 'draft',
      data: categoryInputFromPayload(ctx.request.body || {})
    })
    ctx.body = mapCategory(updated)
  },

  async deleteCategory(ctx: any) {
    await (strapi.documents('api::product-category.product-category') as any).delete({
      documentId: ctx.params.id
    })
    ctx.body = { ok: true }
  },

  async products(ctx: any) {
    const records = await strapi
      .documents('api::product.product')
      .findMany({ status: 'draft', populate: ['category', 'coverImage'], sort: ['id:asc'] })
    ctx.body = ensureArray<any>(records).map(mapProduct)
  },

  async createProduct(ctx: any) {
    const created = await (strapi.documents('api::product.product') as any).create({
      data: await productInputFromPayload(ctx.request.body || {})
    })
    const fresh = await (strapi.documents('api::product.product') as any).findOne({
      documentId: created.documentId,
      status: 'draft',
      populate: ['category', 'coverImage']
    })
    ctx.body = mapProduct(fresh || created)
  },

  async updateProduct(ctx: any) {
    const updated = await (strapi.documents('api::product.product') as any).update({
      documentId: ctx.params.id,
      status: 'draft',
      data: await productInputFromPayload(ctx.request.body || {})
    })
    const fresh = await (strapi.documents('api::product.product') as any).findOne({
      documentId: updated.documentId,
      status: 'draft',
      populate: ['category', 'coverImage']
    })
    ctx.body = mapProduct(fresh || updated)
  },

  async deleteProduct(ctx: any) {
    await (strapi.documents('api::product.product') as any).delete({
      documentId: ctx.params.id
    })
    ctx.body = { ok: true }
  },

  async certificates(ctx: any) {
    const records = await strapi
      .documents('api::certificate.certificate')
      .findMany({ status: 'draft', populate: ['image'], sort: ['sort:asc', 'id:asc'] })
    ctx.body = ensureArray<any>(records).map(mapCertificate)
  },

  async createCertificate(ctx: any) {
    const created = await (strapi.documents('api::certificate.certificate') as any).create({
      data: certificateInputFromPayload(ctx.request.body || {})
    })
    ctx.body = mapCertificate(created)
  },

  async updateCertificate(ctx: any) {
    const updated = await (strapi.documents('api::certificate.certificate') as any).update({
      documentId: ctx.params.id,
      status: 'draft',
      data: certificateInputFromPayload(ctx.request.body || {})
    })
    ctx.body = mapCertificate(updated)
  },

  async deleteCertificate(ctx: any) {
    await (strapi.documents('api::certificate.certificate') as any).delete({
      documentId: ctx.params.id
    })
    ctx.body = { ok: true }
  },

  async inquiries(ctx: any) {
    const records = await (strapi.documents('api::inquiry.inquiry') as any).findMany({ sort: ['createdAt:desc'] })
    ctx.body = ensureArray<any>(records).map(mapInquiry)
  },

  async updateInquiry(ctx: any) {
    const body = ctx.request.body || {}
    const updated = await (strapi.documents('api::inquiry.inquiry') as any).update({
      documentId: ctx.params.id,
      data: {
        status: normalizeInquiryStatus(body.status),
        notes: firstString(body.notes)
      }
    })
    ctx.body = mapInquiry(updated)
  },

  async uploads(ctx: any) {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'admin-compat')
    await mkdir(uploadDir, { recursive: true })
    const files = await readFile(compatStateFile, 'utf8').catch(() => '')
    void files
    const fs = await import('node:fs/promises')
    const items = await fs.readdir(uploadDir).catch(() => [])
    ctx.body = items.map((file) => ({
      file,
      url: `/uploads/admin-compat/${file}`
    }))
  },

  async uploadAsset(ctx: any) {
    const body = ctx.request.body || {}
    const filename = firstString(body.name, `asset-${Date.now()}.png`)
    const base64 = firstString(body.base64)
    if (!base64.startsWith('data:')) return ctx.badRequest('Invalid base64 payload')

    const match = base64.match(/^data:(.+?);base64,(.+)$/)
    if (!match) return ctx.badRequest('Invalid data URL')

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'admin-compat')
    await mkdir(uploadDir, { recursive: true })

    const safeName = filename.replace(/[\\/:*?"<>|]+/g, '-')
    const targetPath = path.join(uploadDir, safeName)
    await writeFile(targetPath, Buffer.from(match[2], 'base64'))

    const actor = await getSessionActor(ctx)
    await appendAuditLog('upload_asset', `Uploaded ${safeName}`, actor)

    ctx.body = { url: `/uploads/admin-compat/${safeName}` }
  },

  async users(ctx: any) {
    const state = await readCompatState()
    ctx.body = state.users.map(({ username, role }) => ({ username, role }))
  },

  async createUser(ctx: any) {
    const body = ctx.request.body || {}
    const username = firstString(body.username)
    const password = firstString(body.password)
    const role = body.role === 'super_admin' || body.role === 'editor' ? body.role : 'sales'

    if (!username || !password) return ctx.badRequest('username and password are required')

    const state = await readCompatState()
    if (state.users.some((item) => item.username === username)) return ctx.badRequest('user already exists')

    state.users.push({ username, password, role })
    await writeCompatState(state)
    await appendAuditLog('create_user', `Created user ${username}`, await getSessionActor(ctx))
    ctx.body = { username, role }
  },

  async deleteUser(ctx: any) {
    const username = ctx.params.username
    const state = await readCompatState()
    state.users = state.users.filter((item) => item.username !== username)
    state.sessions = state.sessions.filter((item) => item.username !== username)
    await writeCompatState(state)
    await appendAuditLog('delete_user', `Deleted user ${username}`, await getSessionActor(ctx))
    ctx.body = { ok: true }
  },

  async auditLogs(ctx: any) {
    const state = await readCompatState()
    ctx.body = state.auditLogs
  },

  async sessions(ctx: any) {
    const state = await readCompatState()
    ctx.body = state.sessions
  },

  async deleteSession(ctx: any) {
    const token = ctx.params.token
    const state = await readCompatState()
    state.sessions = state.sessions.filter((item) => item.token !== token)
    await writeCompatState(state)
    await appendAuditLog('delete_session', `Removed session ${token}`, await getSessionActor(ctx))
    ctx.body = { ok: true, token }
  },

  async changePassword(ctx: any) {
    const password = firstString(ctx.request.body?.password)
    const token = getSessionToken(ctx)
    if (!token || !password) return ctx.badRequest('token and password are required')

    const state = await readCompatState()
    const session = state.sessions.find((item) => item.token === token)
    if (!session) return ctx.unauthorized('invalid session')

    state.users = state.users.map((item) =>
      item.username === session.username
        ? {
            ...item,
            password
          }
        : item
    )
    await writeCompatState(state)
    await appendAuditLog('change_password', `Changed password for ${session.username}`, session.username)
    ctx.body = { ok: true }
  },

  async login(ctx: any) {
    const body = ctx.request.body || {}
    const username = firstString(body.username)
    const password = firstString(body.password)
    const state = await readCompatState()
    const user = state.users.find((item) => item.username === username && item.password === password)

    if (!user) return ctx.unauthorized('invalid_credentials')

    const session = {
      token: createToken(),
      username: user.username,
      role: user.role,
      createdAt: Date.now()
    }
    state.sessions.unshift(session)
    await writeCompatState(state)
    await appendAuditLog('login', `Signed in ${user.username}`, user.username)
    ctx.body = session
  },

  async logout(ctx: any) {
    const token = getSessionToken(ctx)
    const state = await readCompatState()
    const session = state.sessions.find((item) => item.token === token)
    state.sessions = state.sessions.filter((item) => item.token !== token)
    await writeCompatState(state)
    if (session) {
      await appendAuditLog('logout', `Signed out ${session.username}`, session.username)
    }
    ctx.body = { ok: true }
  },

  async me(ctx: any) {
    const token = getSessionToken(ctx)
    const state = await readCompatState()
    const session = state.sessions.find((item) => item.token === token)
    if (!session) {
      ctx.body = { tokenOk: false, username: '', role: 'sales' }
      return
    }
    ctx.body = {
      tokenOk: true,
      username: session.username,
      role: session.role
    }
  }
}
