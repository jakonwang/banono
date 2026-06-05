import http from 'node:http'
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import crypto from 'node:crypto'
import { extname, join, dirname } from 'node:path'

const port = Number(process.env.PORT || 3001)
const projectRoot = dirname(process.cwd())
const root = projectRoot
const dataDir = join(root, 'backend', 'data')
const uploadDir = join(root, 'backend', 'uploads')
const dataFile = join(dataDir, 'site.json')
const frontendDistDir = join(root, 'frontend', 'dist')
const adminDistDir = join(root, 'admin', 'dist')
const sessions = new Map()

function hashPassword(password) {
  return crypto.createHash('sha256').update(String(password || '')).digest('hex')
}

function nowIso() {
  return new Date().toISOString()
}

const defaults = {
  site: {
    brand: { cn: '乔天企业', en: 'Qiaotian Enterprise' },
    nav: [
      { key: 'home', cn: '首页', en: 'Home' },
      { key: 'product-center', cn: '产品中心', en: 'Products' },
      { key: 'factory-strength', cn: '工厂实力', en: 'Factory' },
      { key: 'about', cn: '关于我们', en: 'About' },
      { key: 'contact', cn: '联系我们', en: 'Contact' },
      { key: 'admin', cn: '后台管理', en: 'Admin' }
    ],
    hero: {
      title: { cn: '专业 3C 配件制造', en: 'Professional 3C Accessories Manufacturing' },
      body: { cn: '面向品牌商、渠道商与服务商，提供稳定交付的 OEM/ODM 能力。', en: 'Serving brands and distributors with stable OEM/ODM delivery.' }
    },
    products: [
      { id: 'glass-film', categoryId: 'screen-protection', name: { cn: '3D 钢化膜', en: '3D Tempered Glass Film' }, summary: { cn: '高透、耐刮、贴合度高，适用于主流机型。', en: 'High clarity, scratch resistance, and strong fit for mainstream phones.' }, tags: ['Hot', 'OEM'], image: '/site-assets/product-3d-glass.png', status: 'published' },
      { id: 'tablet-film', categoryId: 'screen-protection', name: { cn: '平板保护膜', en: 'Tablet Film' }, summary: { cn: '适配平板设备，兼顾保护与清晰显示。', en: 'Built for tablet devices with clear viewing and screen protection.' }, tags: ['Tablet', 'Protective'], image: '/site-assets/product-tablet-film.png', status: 'published' },
      { id: 'case', categoryId: 'protective-cases', name: { cn: '手机保护壳', en: 'Phone Case' }, summary: { cn: '多材质多工艺可选，支持品牌定制。', en: 'Multiple materials and finishes with brand customization support.' }, tags: ['Custom', 'Case'], image: '/site-assets/product-phone-case.png', status: 'published' },
      { id: 'lens-film', categoryId: 'camera-accessories', name: { cn: '镜头保护膜', en: 'Lens Protection Film' }, summary: { cn: '适用于高端手机镜头区域，抗磨损、透光稳定。', en: 'Built for premium camera lens modules with stable transparency and wear resistance.' }, tags: ['Camera', 'Protection'], image: '/site-assets/product-lens-film.jpg', status: 'published' }
    ],
    stats: [
      { value: '10+', label: { cn: '年经验', en: 'Years' } },
      { value: '50+', label: { cn: '专利', en: 'Patents' } },
      { value: 'ISO', label: { cn: '认证体系', en: 'Certified' } },
      { value: 'GRS', label: { cn: '可持续配套', en: 'Ready' } }
    ],
    contact: { phone: '+86 (755) 2345 6789', email: 'sales@qiaotian.com', address: { cn: '深圳市宝安区高新产业园 4 栋', en: "Building 4, High-Tech Industrial Park, Bao'an, Shenzhen" } },
    images: {
      homeHero: '/site-assets/office-1.jpg',
      factoryHero: '/site-assets/office-2.jpg',
      factoryGalleryMain: '/site-assets/office-3.jpg',
      factoryGalleryLab: '/site-assets/team-1.jpg',
      factoryGalleryQc: '/site-assets/product-lens-film.jpg',
      factoryGalleryWarehouse: '/site-assets/team-2.jpg',
      aboutHero: '/site-assets/team-1.jpg',
      aboutLeaderOne: '/site-assets/team-2.jpg',
      aboutLeaderTwo: '/site-assets/office-1.jpg',
      contactMap: '/site-assets/office-2.jpg',
      privacySecurity: '/site-assets/cert-iso9001.jpg',
      certificateOne: '/site-assets/cert-iso9001.jpg',
      certificateTwo: '/site-assets/cert-iso14001.jpg'
    },
    sections: {
      factory: {
        heroTitle: { cn: '品质背后的核心：先进制造', en: 'The Core of Our Quality: Advanced Manufacturing' },
        heroBody: { cn: '以工业级精度、规模化产能和严格质量控制，为全球 3C 品牌提供稳定支撑。', en: 'Empowering global 3C brands with industrial precision, scalable output, and rigorous quality control at every stage of production.' }
      },
      about: {
        heroTitle: { cn: '规模化中的精密制造', en: 'Engineering Precision at Scale' },
        heroBody: { cn: '乔天企业持续以工程化能力、交付纪律与创新研发，为全球 3C 制造树立更高标准。', en: 'Qiaotian sets the global benchmark for 3C manufacturing, combining industrial rigor with innovative design thinking.' }
      },
      contact: {
        heroTitle: { cn: '全球供应链业务支持', en: 'Expert Support for Your Global Supply Chain' },
        heroBody: { cn: '我们的采购与技术顾问团队可协助你确认规格、报价、打样与定制生产需求。', en: 'Our team of procurement specialists is ready to assist with technical specifications, bulk pricing, and custom manufacturing requirements.' }
      },
      privacy: {
        heroTitle: { cn: '隐私政策', en: 'Privacy Policy' },
        heroBody: { cn: '生效日期：2024 年 1 月 1 日。我们重视你的隐私与数据安全，并以此作为长期合作的基础。', en: 'Effective Date: January 1, 2024. Your privacy and trust are paramount to Qiaotian Enterprise commitment.' }
      }
    }
  },
  inquiries: [
    { id: 'inq-001', name: 'Li Wei', company: 'Sample Tech', email: 'liwei@example.com', phone: '+86-138-0000-0000', message: 'Need quotation for tempered glass film.', status: 'new', createdAt: nowIso(), updatedAt: nowIso(), notes: '' }
  ],
  roles: [
    { username: 'admin', role: 'super_admin' },
    { username: 'editor', role: 'editor' },
    { username: 'sales', role: 'sales' }
  ],
  users: [
    { username: 'admin', passwordHash: hashPassword('admin123'), role: 'super_admin' },
    { username: 'editor', passwordHash: hashPassword('editor123'), role: 'editor' },
    { username: 'sales', passwordHash: hashPassword('sales123'), role: 'sales' }
  ],
  productCategories: [
    { id: 'screen-protection', name: { cn: '屏幕保护', en: 'Screen Protection' }, description: { cn: '适用于手机和平板的保护膜产品。', en: 'Protective film solutions for phones and tablets.' }, sort: 1, status: 'enabled' },
    { id: 'protective-cases', name: { cn: '保护壳', en: 'Protective Cases' }, description: { cn: '手机壳与周边防护配件。', en: 'Phone cases and related protective accessories.' }, sort: 2, status: 'enabled' },
    { id: 'camera-accessories', name: { cn: '镜头配件', en: 'Camera Accessories' }, description: { cn: '镜头膜及相机区域配件。', en: 'Lens film and camera module accessories.' }, sort: 3, status: 'enabled' }
  ],
  certificates: [
    { id: 'cert-iso9001', title: { cn: 'ISO 9001 认证', en: 'ISO 9001 Certificate' }, issuer: 'SGS', image: '/site-assets/cert-iso9001.jpg', sort: 1 },
    { id: 'cert-iso14001', title: { cn: 'ISO 14001 认证', en: 'ISO 14001 Certificate' }, issuer: 'SGS', image: '/site-assets/cert-iso14001.jpg', sort: 2 }
  ],
  sessions: [],
  auditLogs: []
}

async function ensureData() {
  await mkdir(dataDir, { recursive: true })
  await mkdir(uploadDir, { recursive: true })
  try {
    await readFile(dataFile, 'utf8')
  } catch {
    await writeFile(dataFile, JSON.stringify(defaults, null, 2), 'utf8')
  }
}

function migrateData(loaded = {}) {
  const site = { ...defaults.site, ...(loaded.site || {}) }
  const categories = loaded.productCategories || defaults.productCategories
  const certificates = loaded.certificates || defaults.certificates
  const products = (site.products || defaults.site.products).map((item) => ({
    status: 'published',
    categoryId: categories[0]?.id || '',
    ...item
  }))

  const siteModel = {
    company: {
      brand: site.brand || defaults.site.brand,
      phone: site.contact?.phone || defaults.site.contact.phone,
      email: site.contact?.email || defaults.site.contact.email,
      address: site.contact?.address || defaults.site.contact.address
    },
    home: {
      heroTitle: site.hero?.title || defaults.site.hero.title,
      heroBody: site.hero?.body || defaults.site.hero.body,
      stats: site.stats || defaults.site.stats,
      images: {
        homeHero: site.images?.homeHero || defaults.site.images.homeHero
      }
    },
    factory: {
      heroTitle: site.sections?.factory?.heroTitle || defaults.site.sections.factory.heroTitle,
      heroBody: site.sections?.factory?.heroBody || defaults.site.sections.factory.heroBody,
      images: {
        factoryHero: site.images?.factoryHero || defaults.site.images.factoryHero,
        factoryGalleryMain: site.images?.factoryGalleryMain || defaults.site.images.factoryGalleryMain,
        factoryGalleryLab: site.images?.factoryGalleryLab || defaults.site.images.factoryGalleryLab,
        factoryGalleryQc: site.images?.factoryGalleryQc || defaults.site.images.factoryGalleryQc,
        factoryGalleryWarehouse: site.images?.factoryGalleryWarehouse || defaults.site.images.factoryGalleryWarehouse
      }
    },
    about: {
      heroTitle: site.sections?.about?.heroTitle || defaults.site.sections.about.heroTitle,
      heroBody: site.sections?.about?.heroBody || defaults.site.sections.about.heroBody,
      images: {
        aboutHero: site.images?.aboutHero || defaults.site.images.aboutHero,
        aboutLeaderOne: site.images?.aboutLeaderOne || defaults.site.images.aboutLeaderOne,
        aboutLeaderTwo: site.images?.aboutLeaderTwo || defaults.site.images.aboutLeaderTwo
      }
    },
    contact: {
      heroTitle: site.sections?.contact?.heroTitle || defaults.site.sections.contact.heroTitle,
      heroBody: site.sections?.contact?.heroBody || defaults.site.sections.contact.heroBody,
      phone: site.contact?.phone || defaults.site.contact.phone,
      email: site.contact?.email || defaults.site.contact.email,
      address: site.contact?.address || defaults.site.contact.address,
      mapImage: site.images?.contactMap || defaults.site.images.contactMap
    },
    privacy: {
      heroTitle: site.sections?.privacy?.heroTitle || defaults.site.sections.privacy.heroTitle,
      heroBody: site.sections?.privacy?.heroBody || defaults.site.sections.privacy.heroBody
    },
    productCategories: categories,
    products,
    certificates
  }

  return {
    ...defaults,
    ...loaded,
    site,
    productCategories: categories,
    certificates,
    inquiries: (loaded.inquiries || defaults.inquiries).map((item) => ({
      updatedAt: item.createdAt || nowIso(),
      notes: '',
      ...item
    })),
    roles: loaded.roles || defaults.roles,
    users: loaded.users || defaults.users,
    sessions: loaded.sessions || defaults.sessions,
    auditLogs: loaded.auditLogs || defaults.auditLogs,
    siteModel
  }
}

async function loadData() {
  await ensureData()
  const loaded = JSON.parse(await readFile(dataFile, 'utf8'))
  const migrated = migrateData(loaded)
  syncSessionsFromData(migrated)
  return migrated
}

function dataForSave(data) {
  const { siteModel, ...rest } = data
  return rest
}

async function saveData(data) {
  await writeFile(dataFile, JSON.stringify(dataForSave(data), null, 2), 'utf8')
}

function syncSessionsFromData(data) {
  sessions.clear()
  for (const session of data.sessions || []) {
    sessions.set(session.token, {
      username: session.username,
      role: session.role,
      createdAt: session.createdAt
    })
  }
}

function syncSessionsBack(data) {
  data.sessions = Array.from(sessions.entries()).map(([token, session]) => ({ token, ...session }))
}

function pushAudit(data, action, detail, actor = 'system') {
  data.auditLogs = data.auditLogs || []
  data.auditLogs.unshift({ id: `log-${Date.now()}`, action, detail, actor, createdAt: nowIso() })
  data.auditLogs = data.auditLogs.slice(0, 200)
}

function rebuildSiteFromModel(data) {
  const model = data.siteModel
  data.site.brand = { ...model.company.brand }
  data.site.contact = {
    phone: model.company.phone,
    email: model.company.email,
    address: { ...model.company.address }
  }
  data.site.hero = {
    title: { ...model.home.heroTitle },
    body: { ...model.home.heroBody }
  }
  data.site.stats = model.home.stats || []
  data.site.sections = {
    ...data.site.sections,
    factory: { heroTitle: { ...model.factory.heroTitle }, heroBody: { ...model.factory.heroBody } },
    about: { heroTitle: { ...model.about.heroTitle }, heroBody: { ...model.about.heroBody } },
    contact: { heroTitle: { ...model.contact.heroTitle }, heroBody: { ...model.contact.heroBody } },
    privacy: { heroTitle: { ...model.privacy.heroTitle }, heroBody: { ...model.privacy.heroBody } }
  }
  data.site.images = {
    ...data.site.images,
    ...model.home.images,
    ...model.factory.images,
    ...model.about.images,
    contactMap: model.contact.mapImage || '',
    certificateOne: model.certificates?.[0]?.image || '',
    certificateTwo: model.certificates?.[1]?.image || ''
  }
  data.site.products = model.products || []
  data.productCategories = model.productCategories || []
  data.certificates = model.certificates || []
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token, X-Admin-Token, X-Admin-Role'
  })
  res.end(JSON.stringify(data))
}

function sendText(res, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' })
  res.end(body)
}

function currentSession(req) {
  return sessions.get(String(req.headers['x-session-token'] || ''))
}

function currentRole(req) {
  return currentSession(req)?.role || 'sales'
}

function currentUser(req) {
  return currentSession(req)?.username || 'guest'
}

function isAuthed(req) {
  return !!currentSession(req)
}

function requireRole(req, roles) {
  return isAuthed(req) && roles.includes(currentRole(req))
}

function pruneSessions(data) {
  const ttl = 1000 * 60 * 60 * 24
  const now = Date.now()
  for (const [token, session] of sessions.entries()) {
    if (now - session.createdAt > ttl) sessions.delete(token)
  }
  syncSessionsBack(data)
}

async function readBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

function guessType(filePath) {
  return {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.json': 'application/json; charset=utf-8'
  }[extname(filePath).toLowerCase()] || 'application/octet-stream'
}

async function serveFrontend(pathname, res) {
  const normalized = pathname.startsWith('/assets/') || pathname === '/favicon.svg' ? pathname : '/index.html'
  const filePath = join(frontendDistDir, normalized.replace(/^\//, ''))
  const data = await readFile(filePath)
  sendText(res, 200, data, guessType(filePath))
}

async function serveAdmin(pathname, res) {
  const safePath = pathname === '/admin' || pathname === '/admin/' || pathname === '/admin.html' ? '/index.html' : pathname.replace(/^\/admin/, '') || '/index.html'
  const normalized = safePath.startsWith('/assets/') || safePath === '/favicon.svg' ? safePath : '/index.html'
  const filePath = join(adminDistDir, normalized.replace(/^\//, ''))
  const data = await readFile(filePath)
  sendText(res, 200, data, guessType(filePath))
}

const server = http.createServer(async (req, res) => {
  if (!req.url) return sendText(res, 400, 'Bad Request')

  const url = new URL(req.url, `http://${req.headers.host}`)
  const data = await loadData()
  pruneSessions(data)

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token, X-Admin-Token, X-Admin-Role'
    })
    return res.end()
  }

  if (url.pathname === '/api/health') return sendJson(res, 200, { ok: true, service: 'backend' })

  if (url.pathname === '/api/auth/login' && req.method === 'POST') {
    const body = await readBody(req)
    const user = data.users.find((item) => item.username === body.username && item.passwordHash === hashPassword(body.password))
    if (!user) return sendJson(res, 401, { message: 'invalid_credentials' })
    const token = crypto.randomBytes(16).toString('hex')
    sessions.set(token, { username: user.username, role: user.role, createdAt: Date.now() })
    syncSessionsBack(data)
    pushAudit(data, 'login', user.username, user.username)
    await saveData(data)
    return sendJson(res, 200, { token, username: user.username, role: user.role })
  }

  if (url.pathname === '/api/auth/logout' && req.method === 'POST') {
    const token = String(req.headers['x-session-token'] || '')
    const session = sessions.get(token)
    sessions.delete(token)
    syncSessionsBack(data)
    if (session) pushAudit(data, 'logout', session.username, session.username)
    await saveData(data)
    return sendJson(res, 200, { ok: true })
  }

  if (url.pathname === '/api/auth/me') return sendJson(res, 200, { tokenOk: isAuthed(req), username: currentUser(req), role: currentRole(req) })

  if (url.pathname === '/api/site' && req.method === 'GET') return sendJson(res, 200, data.site)
  if (url.pathname === '/api/admin/site-model' && req.method === 'GET') {
    if (!isAuthed(req)) return sendJson(res, 401, { message: 'unauthorized' })
    return sendJson(res, 200, data.siteModel)
  }
  if (url.pathname.startsWith('/api/admin/site-model/') && req.method === 'PUT') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const section = url.pathname.split('/').pop()
    const body = await readBody(req)
    if (!section || !(section in data.siteModel)) return sendJson(res, 404, { message: 'not_found' })
    data.siteModel[section] = { ...data.siteModel[section], ...body }
    rebuildSiteFromModel(data)
    pushAudit(data, 'update_site_section', section, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, data.siteModel[section])
  }

  if (url.pathname === '/api/site' && req.method === 'PUT') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const body = await readBody(req)
    data.site = { ...data.site, ...body }
    data.siteModel = migrateData(data).siteModel
    rebuildSiteFromModel(data)
    pushAudit(data, 'update_site', 'site', currentUser(req))
    await saveData(data)
    return sendJson(res, 200, data.site)
  }

  if (url.pathname === '/api/inquiries' && req.method === 'GET') return sendJson(res, 200, data.inquiries)
  if (url.pathname === '/api/inquiries' && req.method === 'POST') {
    const body = await readBody(req)
    const inquiry = {
      id: `inq-${String(data.inquiries.length + 1).padStart(3, '0')}`,
      name: body.name || '',
      company: body.company || '',
      email: body.email || '',
      phone: body.phone || '',
      message: body.message || '',
      status: 'new',
      createdAt: nowIso(),
      updatedAt: nowIso(),
      notes: ''
    }
    data.inquiries.unshift(inquiry)
    pushAudit(data, 'create_inquiry', inquiry.id, body.name || 'visitor')
    await saveData(data)
    return sendJson(res, 201, inquiry)
  }
  if (url.pathname.startsWith('/api/inquiries/') && req.method === 'PUT') {
    if (!isAuthed(req)) return sendJson(res, 401, { message: 'unauthorized' })
    const id = url.pathname.split('/').pop()
    const body = await readBody(req)
    data.inquiries = data.inquiries.map((item) => item.id === id ? { ...item, ...body, updatedAt: nowIso() } : item)
    pushAudit(data, 'update_inquiry', id, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, data.inquiries.find((item) => item.id === id) || null)
  }
  if (url.pathname === '/api/inquiries/export' && req.method === 'GET') {
    const rows = ['id,name,company,email,phone,message,status,createdAt,updatedAt,notes', ...data.inquiries.map((item) => [item.id, item.name, item.company, item.email, item.phone, item.message, item.status, item.createdAt, item.updatedAt || '', item.notes || ''].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))]
    res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="inquiries.csv"', 'Access-Control-Allow-Origin': '*' })
    return res.end(rows.join('\n'))
  }

  if (url.pathname === '/api/product-categories' && req.method === 'GET') return sendJson(res, 200, data.productCategories)
  if (url.pathname === '/api/product-categories' && req.method === 'POST') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const body = await readBody(req)
    const item = { id: body.id || `cat-${Date.now()}`, name: body.name || { cn: '', en: '' }, description: body.description || { cn: '', en: '' }, sort: Number(body.sort || 0), status: body.status || 'enabled' }
    data.productCategories.unshift(item)
    data.siteModel.productCategories = data.productCategories
    rebuildSiteFromModel(data)
    pushAudit(data, 'create_category', item.id, currentUser(req))
    await saveData(data)
    return sendJson(res, 201, item)
  }
  if (url.pathname.startsWith('/api/product-categories/') && req.method === 'PUT') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const id = url.pathname.split('/').pop()
    const body = await readBody(req)
    data.productCategories = data.productCategories.map((item) => item.id === id ? { ...item, ...body } : item)
    data.siteModel.productCategories = data.productCategories
    rebuildSiteFromModel(data)
    pushAudit(data, 'update_category', id, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, data.productCategories.find((item) => item.id === id) || null)
  }
  if (url.pathname.startsWith('/api/product-categories/') && req.method === 'DELETE') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const id = url.pathname.split('/').pop()
    data.productCategories = data.productCategories.filter((item) => item.id !== id)
    data.siteModel.productCategories = data.productCategories
    rebuildSiteFromModel(data)
    pushAudit(data, 'delete_category', id, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, { ok: true })
  }

  if (url.pathname === '/api/products' && req.method === 'GET') return sendJson(res, 200, data.siteModel.products)
  if (url.pathname === '/api/products' && req.method === 'POST') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const body = await readBody(req)
    const product = { id: body.id || `product-${Date.now()}`, categoryId: body.categoryId || '', name: body.name || { cn: '', en: '' }, summary: body.summary || { cn: '', en: '' }, tags: body.tags || [], image: body.image || '', status: body.status || 'published' }
    data.siteModel.products.unshift(product)
    rebuildSiteFromModel(data)
    pushAudit(data, 'create_product', product.id, currentUser(req))
    await saveData(data)
    return sendJson(res, 201, product)
  }
  if (url.pathname.startsWith('/api/products/') && req.method === 'PUT') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const id = url.pathname.split('/').pop()
    const body = await readBody(req)
    data.siteModel.products = data.siteModel.products.map((item) => item.id === id ? { ...item, ...body } : item)
    rebuildSiteFromModel(data)
    pushAudit(data, 'update_product', id, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, data.siteModel.products.find((item) => item.id === id) || null)
  }
  if (url.pathname.startsWith('/api/products/') && req.method === 'DELETE') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const id = url.pathname.split('/').pop()
    data.siteModel.products = data.siteModel.products.filter((item) => item.id !== id)
    rebuildSiteFromModel(data)
    pushAudit(data, 'delete_product', id, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, { ok: true })
  }

  if (url.pathname === '/api/certificates' && req.method === 'GET') return sendJson(res, 200, data.certificates)
  if (url.pathname === '/api/certificates' && req.method === 'POST') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const body = await readBody(req)
    const item = { id: body.id || `cert-${Date.now()}`, title: body.title || { cn: '', en: '' }, issuer: body.issuer || '', image: body.image || '', sort: Number(body.sort || 0) }
    data.certificates.unshift(item)
    data.siteModel.certificates = data.certificates
    rebuildSiteFromModel(data)
    pushAudit(data, 'create_certificate', item.id, currentUser(req))
    await saveData(data)
    return sendJson(res, 201, item)
  }
  if (url.pathname.startsWith('/api/certificates/') && req.method === 'PUT') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const id = url.pathname.split('/').pop()
    const body = await readBody(req)
    data.certificates = data.certificates.map((item) => item.id === id ? { ...item, ...body } : item)
    data.siteModel.certificates = data.certificates
    rebuildSiteFromModel(data)
    pushAudit(data, 'update_certificate', id, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, data.certificates.find((item) => item.id === id) || null)
  }
  if (url.pathname.startsWith('/api/certificates/') && req.method === 'DELETE') {
    if (!requireRole(req, ['super_admin', 'editor'])) return sendJson(res, 403, { message: 'forbidden' })
    const id = url.pathname.split('/').pop()
    data.certificates = data.certificates.filter((item) => item.id !== id)
    data.siteModel.certificates = data.certificates
    rebuildSiteFromModel(data)
    pushAudit(data, 'delete_certificate', id, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, { ok: true })
  }

  if (url.pathname === '/api/uploads' && req.method === 'GET') {
    if (!isAuthed(req)) return sendJson(res, 401, { message: 'unauthorized' })
    const files = await readdir(uploadDir)
    return sendJson(res, 200, files.map((file) => ({ file, url: `/backend/uploads/${file}` })))
  }
  if (url.pathname === '/api/uploads' && req.method === 'POST') {
    if (!isAuthed(req)) return sendJson(res, 401, { message: 'unauthorized' })
    const body = await readBody(req)
    const filename = `${Date.now()}-${String(body.name || 'file').replace(/[^a-zA-Z0-9_.-]/g, '_')}`
    const target = join(uploadDir, filename)
    const base64 = String(body.base64 || '').replace(/^data:[^;]+;base64,/, '')
    await writeFile(target, Buffer.from(base64, 'base64'))
    pushAudit(data, 'upload_media', filename, currentUser(req))
    await saveData(data)
    return sendJson(res, 201, { url: `/backend/uploads/${filename}` })
  }

  if (url.pathname === '/api/users' && req.method === 'GET') {
    if (!isAuthed(req)) return sendJson(res, 401, { message: 'unauthorized' })
    return sendJson(res, 200, data.users.map(({ passwordHash, ...item }) => item))
  }
  if (url.pathname === '/api/users' && req.method === 'POST') {
    if (!requireRole(req, ['super_admin'])) return sendJson(res, 403, { message: 'forbidden' })
    const body = await readBody(req)
    const item = { username: body.username || `user-${Date.now()}`, passwordHash: hashPassword(body.password || '123456'), role: body.role || 'sales' }
    data.users.unshift(item)
    pushAudit(data, 'create_user', item.username, currentUser(req))
    await saveData(data)
    return sendJson(res, 201, { username: item.username, role: item.role })
  }
  if (url.pathname.startsWith('/api/users/') && req.method === 'DELETE') {
    if (!requireRole(req, ['super_admin'])) return sendJson(res, 403, { message: 'forbidden' })
    const username = decodeURIComponent(url.pathname.split('/').pop())
    data.users = data.users.filter((item) => item.username !== username)
    pushAudit(data, 'delete_user', username, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, { ok: true })
  }
  if (url.pathname === '/api/users/password' && req.method === 'PUT') {
    if (!isAuthed(req)) return sendJson(res, 401, { message: 'unauthorized' })
    const body = await readBody(req)
    const username = currentUser(req)
    data.users = data.users.map((item) => item.username === username ? { ...item, passwordHash: hashPassword(body.password || '') } : item)
    pushAudit(data, 'change_password', username, username)
    await saveData(data)
    return sendJson(res, 200, { ok: true })
  }

  if (url.pathname === '/api/audit-logs' && req.method === 'GET') {
    if (!requireRole(req, ['super_admin'])) return sendJson(res, 403, { message: 'forbidden' })
    return sendJson(res, 200, data.auditLogs || [])
  }
  if (url.pathname === '/api/session-store' && req.method === 'GET') {
    if (!requireRole(req, ['super_admin'])) return sendJson(res, 403, { message: 'forbidden' })
    return sendJson(res, 200, Array.from(sessions.entries()).map(([token, session]) => ({ token, ...session })))
  }
  if (url.pathname.startsWith('/api/session-store/') && req.method === 'DELETE') {
    if (!requireRole(req, ['super_admin'])) return sendJson(res, 403, { message: 'forbidden' })
    const token = decodeURIComponent(url.pathname.split('/').pop())
    sessions.delete(token)
    syncSessionsBack(data)
    pushAudit(data, 'delete_session', token, currentUser(req))
    await saveData(data)
    return sendJson(res, 200, { ok: true })
  }

  if (req.method === 'GET' && url.pathname.startsWith('/backend/uploads/')) {
    try {
      const filePath = join(uploadDir, url.pathname.replace('/backend/uploads/', ''))
      const content = await readFile(filePath)
      return sendText(res, 200, content, guessType(filePath))
    } catch {
      return sendText(res, 404, 'Not Found')
    }
  }

  if (req.method === 'GET' && !url.pathname.startsWith('/api/')) {
    try {
      if (url.pathname === '/admin' || url.pathname === '/admin/' || url.pathname === '/admin.html' || url.pathname.startsWith('/admin/assets/') || url.pathname === '/admin/favicon.svg') {
        await serveAdmin(url.pathname, res)
        return
      }
      await serveFrontend(url.pathname, res)
      return
    } catch {
      return sendText(res, 404, 'Not Found')
    }
  }

  return sendJson(res, 404, { message: 'not_found' })
})

server.listen(port, '127.0.0.1', () => {
  console.log(`backend listening on http://127.0.0.1:${port}`)
})
