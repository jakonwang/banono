import './style.css'
import { loadSiteFromCms, submitInquiryToCms } from './api/cms'

type Route = 'home' | 'product-center' | 'factory-strength' | 'about' | 'contact' | 'privacy'
type Locale = 'en' | 'cn'
type LocalizedText = { cn?: string; en?: string }
type Product = {
  id: string
  slug?: string
  name: LocalizedText
  summary: LocalizedText
  tags?: string[]
  image?: string
  categorySlug?: string
  categoryId?: string
}
type SiteData = {
  brand?: LocalizedText
  hero?: { title?: LocalizedText; body?: LocalizedText }
  products?: Product[]
  stats?: { value: string; label: LocalizedText }[]
  contact?: { phone?: string; email?: string; address?: LocalizedText }
  images?: Record<string, string>
  sections?: {
    factory?: { heroTitle?: LocalizedText; heroBody?: LocalizedText }
    about?: { heroTitle?: LocalizedText; heroBody?: LocalizedText }
    contact?: { heroTitle?: LocalizedText; heroBody?: LocalizedText }
    privacy?: { heroTitle?: LocalizedText; heroBody?: LocalizedText }
  }
  categories?: Array<{
    id: string
    slug?: string
    name: LocalizedText
    description?: LocalizedText
    sort?: number
    status?: string
  }>
  certificates?: Array<{
    id: string
    title: LocalizedText
    issuer?: string
    image?: string
    sort?: number
  }>
}
type InquiryPayload = {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

const root = document.querySelector<HTMLDivElement>('#app')
if (!root) throw new Error('App root not found')

const app = root

const fallbackProducts: Product[] = [
  {
    id: 'fallback-1',
    name: { cn: '钢化膜方案', en: 'Tempered Glass Program' },
    summary: { cn: '适用于主流机型的屏幕保护产品。', en: 'Screen protection products for mainstream devices.' },
    tags: ['OEM', 'Hot'],
    image: '/stitch_/homepage_desktop/screen.png',
    categorySlug: 'screen-protection'
  },
  {
    id: 'fallback-2',
    name: { cn: '保护壳方案', en: 'Protective Case Program' },
    summary: { cn: '支持材质、颜色与品牌定制。', en: 'Supports material, color, and brand customization.' },
    tags: ['Custom', 'Case'],
    image: '/stitch_/contact_us_desktop/screen.png',
    categorySlug: 'protective-cases'
  },
  {
    id: 'fallback-3',
    name: { cn: '镜头配件方案', en: 'Lens Accessory Program' },
    summary: { cn: '面向高端机型的镜头防护与配件。', en: 'Lens protection and accessory solutions for premium devices.' },
    tags: ['Camera', 'Protection'],
    image: '/stitch_/about_us_mobile/screen.png',
    categorySlug: 'camera-accessories'
  }
]

const copy = {
  en: {
    nav: {
      home: 'Home',
      productCenter: 'Product Center',
      factoryStrength: 'Factory Strength',
      about: 'About Us',
      contact: 'Contact',
      privacy: 'Privacy Policy'
    },
    langToggle: 'EN / CN',
    heroEyebrow: 'Industrial Manufacturing Partner',
    heroTitle: 'Premium 3C accessories engineered for global sourcing programs',
    heroBody:
      'Qiaotian Enterprise supports OEM, ODM, and export delivery with disciplined manufacturing, reliable quality control, and a clear commercial response process.',
    heroPrimary: 'Explore Products',
    heroSecondary: 'Start Inquiry',
    trustTitle: 'Trusted by procurement teams that care about consistency, certification, and delivery discipline.',
    metrics: [
      { value: '15+', label: 'Years in export manufacturing' },
      { value: '500K+', label: 'Monthly production capacity' },
      { value: '40+', label: 'Countries and regions served' },
      { value: '24H', label: 'Technical response commitment' }
    ],
    heroHighlights: ['OEM / ODM Programs', 'Export-grade QC', 'Retail-ready Packaging'],
    heroSideTitle: 'Manufacturing Notes',
    featureEyebrow: 'Featured Range',
    featureTitle: 'Product lines prepared for B2B sourcing and export programs',
    featureBody:
      'Our catalog focuses on charging, connectivity, and accessory essentials that are easier to quote, sample, certify, pack, and scale for overseas buyers.',
    trustMarks: ['OEM / ODM', 'CE / RoHS / FCC', 'Factory Direct', 'Export Delivery', 'Retail Packaging'],
    factoryEyebrow: 'Factory Capability',
    factoryTitle: 'A factory system designed for repeatable delivery',
    factoryBody:
      'Production, quality inspection, packaging, and shipment coordination work as one operating system so your sourcing plan stays predictable.',
    factoryPoints: [
      {
        title: 'Certification Ready',
        body: 'Product and process preparation aligned with CE, RoHS, FCC, and common market-entry requirements.'
      },
      {
        title: 'OEM / ODM Coordination',
        body: 'Tooling, logo, packaging, labeling, inserts, and sample confirmation managed in one commercial track.'
      },
      {
        title: 'Delivery Rhythm',
        body: 'Scheduling, inspection, and shipment coordination reduce avoidable delay and batch inconsistency.'
      }
    ],
    valueEyebrow: 'Why Qiaotian',
    valueTitle: 'A commercial partner built for long-cycle cooperation',
    valueBody:
      'We combine engineering, production discipline, and export coordination to support brands and distributors beyond one-off orders.',
    valueCards: [
      {
        title: 'Engineering Precision',
        body: 'Signal integrity, charging safety, and material consistency are controlled from concept to release.'
      },
      {
        title: 'Factory Transparency',
        body: 'Capacity, lead time, and inspection checkpoints stay clear enough for practical sourcing decisions.'
      },
      {
        title: 'Commercial Reliability',
        body: 'We optimize around repeat orders, stable programs, and long-term supply relationships.'
      }
    ],
    certificateEyebrow: 'Quality Standards',
    certificateTitle: 'International compliance and manufacturing confidence',
    certificateBody: 'Aligned with the certifications, testing expectations, and export discipline global buyers expect.',
    procurementEyebrow: 'Start A Project',
    procurementTitle: 'Request quotation, samples, or a private-label proposal',
    procurementBody:
      'Tell us your target product, quantity range, destination market, certification needs, and packaging expectation. We will reply with a workable sourcing direction.',
    fullName: 'Full Name',
    companyName: 'Company Name',
    workEmail: 'Work Email',
    phone: 'Phone / WhatsApp',
    projectDetails: 'Project Details',
    formPlaceholderName: 'e.g. John Smith',
    formPlaceholderCompany: 'e.g. Global Trade Ltd.',
    formPlaceholderEmail: 'name@company.com',
    formPlaceholderPhone: 'e.g. +1 555 000 1234',
    formPlaceholderMessage: 'Share product target, volume, certifications, packaging, or market requirements.',
    formSubmit: 'Send Inquiry',
    formSuccess: 'Inquiry submitted successfully. We will contact you soon.',
    formError: 'Submission failed. Please try again later.',
    productCenterEyebrow: 'Product Catalog',
    productCenterTitle: 'Product center built for overseas sourcing review',
    productCenterBody:
      'A cleaner catalog structure for buyers who need quick category scanning, specification confidence, and direct inquiry entry.',
    filterAll: 'All Products',
    categoryTitle: 'Category Navigation',
    categoryBody: 'Browse major product directions and request the matching quotation or technical sheet.',
    supportTitle: 'Program Support',
    supportItems: ['OEM branding', 'Retail packaging', 'Export compliance', 'Sample validation'],
    requestPrice: 'Request Quotation',
    details: 'Send Inquiry',
    customTitle: 'Need a custom project?',
    customBody:
      'We support structure, packaging, logo, insert, and market-specific requirement coordination for long-term product programs.',
    contactOem: 'Talk to OEM Team',
    factoryHeroEyebrow: 'Production System',
    factoryHeroTitle: 'Industrial execution from line planning to export dispatch',
    factoryHeroBody:
      'Qiaotian builds manufacturing around repeatability, inspection discipline, and practical communication so global buyers can move with confidence.',
    factoryStats: [
      { value: '12', label: 'Production lines' },
      { value: '50+', label: 'Engineering and QA staff' },
      { value: '98%', label: 'On-time delivery target' },
      { value: 'ISO', label: 'Quality system ready' }
    ],
    galleryCaptions: [
      { title: 'Core Production Area', body: 'Assembly and testing organized around throughput and consistency.' },
      { title: 'Inspection Control', body: 'In-process and final checks reduce batch risk before shipment.' },
      { title: 'Packing & Dispatch', body: 'Packaging and dispatch stay aligned with brand delivery requirements.' }
    ],
    qualityTitle: 'Three layers of delivery assurance',
    qualityCards: [
      { step: '01', title: 'Incoming Control', body: 'Materials, connectors, chips, and packaging inputs are checked before production starts.' },
      { step: '02', title: 'Process Monitoring', body: 'Assembly, soldering, and charging tests are monitored inline to stop defects from traveling downstream.' },
      { step: '03', title: 'Final Release', body: 'Final inspection and shipment confirmation keep mass production batches stable and controllable.' }
    ],
    factoryCtaTitle: 'Plan your next sourcing program with a factory-first approach',
    factoryCtaBody: 'We can help evaluate product fit, production arrangement, and delivery timing for your next project.',
    aboutEyebrow: 'Brand Story',
    aboutTitle: 'An export manufacturing team built for long-term cooperation',
    aboutBody:
      'Qiaotian Enterprise focuses on practical manufacturing excellence and steady commercial collaboration across product, quality, and delivery.',
    timelineTitle: 'Milestones',
    timeline: [
      { year: '2009', title: 'Started from cable engineering', body: 'The company began by solving core accessory requirements with a practical manufacturing mindset.' },
      { year: '2016', title: 'Expanded into integrated production', body: 'Assembly, quality control, and packaging were consolidated into a more scalable manufacturing system.' },
      { year: 'Today', title: 'Serving global sourcing programs', body: 'Qiaotian supports brands, distributors, and retail channels with repeatable export execution.' }
    ],
    contactEyebrow: 'Contact Us',
    contactTitle: 'Tell us what you need and we will return with a workable supply direction',
    contactBody:
      'Use the inquiry form for quotations, samples, OEM requests, target market requirements, or product matching. Our response style stays direct and commercially practical.',
    responseTitle: 'Response Commitment',
    responseBody: 'Most inquiries receive an answer within one business day.',
    directChannels: 'Direct Channels',
    hubTitle: 'Factory & Office Base',
    hubBody: 'Product discussion, sample arrangement, mass production, and export coordination run from one connected operating base.',
    privacyEyebrow: 'Privacy Policy',
    privacyTitle: 'Formal handling of business contact information',
    privacyBody:
      'We only collect and use business inquiry information as needed to support communication, quotation, delivery coordination, and service improvement.',
    privacySections: [
      { title: '1. Information We Receive', body: 'When you contact us, we may receive your name, company, email, phone number, and inquiry details.' },
      { title: '2. How We Use It', body: 'This information is used to answer inquiries, prepare quotations, support sampling, and advance business cooperation.' },
      { title: '3. Protection Measures', body: 'We apply reasonable management, access limitation, and process control to reduce the risk around stored information.' },
      { title: '4. Contact', body: 'If you have any question about data handling, please contact us through the information listed on this site.' }
    ],
    footerBody: 'Professional 3C accessories manufacturing for importers, distributors, retailers, and global procurement teams.',
    footerNavTitle: 'Navigation',
    footerCapabilityTitle: 'Capabilities',
    footerContactTitle: 'Contact',
    footerCapabilityLinks: ['OEM / ODM', 'Factory Production', 'Quality Control', 'Export Delivery'],
    footerRights: '© 2026 Qiaotian Enterprise. All rights reserved.'
  },
  cn: {
    nav: {
      home: '首页',
      productCenter: '产品中心',
      factoryStrength: '工厂实力',
      about: '关于我们',
      contact: '联系我们',
      privacy: '隐私政策'
    },
    langToggle: '中 / EN',
    heroEyebrow: '工业制造合作伙伴',
    heroTitle: '面向全球采购项目的高端 3C 配件制造服务',
    heroBody: '乔天企业围绕 OEM、ODM 与出口交付提供稳定制造、质量控制与清晰商业响应机制。',
    heroPrimary: '查看产品',
    heroSecondary: '发起询盘',
    trustTitle: '服务重视一致性、认证能力与交付纪律的国际采购团队。',
    metrics: [
      { value: '15+', label: '年出口制造经验' },
      { value: '500K+', label: '月产能规模' },
      { value: '40+', label: '服务国家与地区' },
      { value: '24H', label: '技术响应承诺' }
    ],
    heroHighlights: ['OEM / ODM 项目', '出口级质控', '零售包装配套'],
    heroSideTitle: '制造要点',
    featureEyebrow: '精选产品',
    featureTitle: '面向 B2B 采购与出口项目整理的产品线',
    featureBody: '我们的目录聚焦充电、连接与基础配件，更适合海外买家进行报价、打样、认证、包装和规模化交付。',
    trustMarks: ['OEM / ODM', 'CE / RoHS / FCC', '工厂直供', '出口交付', '零售包装'],
    factoryEyebrow: '工厂能力',
    factoryTitle: '围绕稳定交付建立的工厂体系',
    factoryBody: '生产、质检、包装与出货协同运转，让采购计划依赖流程和标准，而不是依赖运气。',
    factoryPoints: [
      { title: '认证与合规准备', body: '产品和流程可对接 CE、RoHS、FCC 等主要出口市场常见要求。' },
      { title: 'OEM / ODM 协调', body: '模具、Logo、包装、标签与样品确认在同一商业节奏中推进。' },
      { title: '交付节奏', body: '排产、检验与发运协调减少不必要延误和批次波动。' }
    ],
    valueEyebrow: '合作价值',
    valueTitle: '面向长期项目协作建立的商业型制造伙伴',
    valueBody: '我们把工程能力、生产纪律与出口协同结合在一起，服务的不只是一次性订单，而是长期合作项目。',
    valueCards: [
      { title: '工程精度', body: '从传输性能、充电安全到材料一致性，关键控制点贯穿方案到量产全流程。' },
      { title: '工厂透明', body: '产能、交期与检验节点清晰可沟通，适合重视可预期性的采购团队。' },
      { title: '商业可靠', body: '我们围绕持续补货、稳定项目与长期供货关系做优化。' }
    ],
    certificateEyebrow: '质量标准',
    certificateTitle: '面向国际市场的合规与制造信心',
    certificateBody: '围绕全球买家关心的认证、测试要求和出口执行纪律进行准备与交付。',
    procurementEyebrow: '开启合作',
    procurementTitle: '获取报价、样品或自有品牌方案',
    procurementBody: '告诉我们目标产品、数量区间、目标市场、认证要求和包装预期，我们会给出可执行的供货方向。',
    fullName: '姓名',
    companyName: '公司名称',
    workEmail: '工作邮箱',
    phone: '电话 / WhatsApp',
    projectDetails: '项目需求',
    formPlaceholderName: '例如：张先生',
    formPlaceholderCompany: '例如：环球贸易有限公司',
    formPlaceholderEmail: 'name@company.com',
    formPlaceholderPhone: '例如：+86 138 0000 0000',
    formPlaceholderMessage: '请填写目标产品、数量区间、认证要求、包装要求或目标市场。',
    formSubmit: '发送询盘',
    formSuccess: '询盘已提交，我们会尽快联系您。',
    formError: '提交失败，请稍后重试。',
    productCenterEyebrow: '产品目录',
    productCenterTitle: '为海外采购评估整理的产品中心',
    productCenterBody: '采用更清晰的目录结构，方便买家快速浏览分类、确认规格表达，并直接进入询盘。',
    filterAll: '全部产品',
    categoryTitle: '分类导航',
    categoryBody: '按主要产品方向浏览，并快速索取对应报价或技术资料。',
    supportTitle: '项目支持',
    supportItems: ['OEM 品牌化', '零售包装', '出口合规', '样品验证'],
    requestPrice: '获取报价',
    details: '立即询盘',
    customTitle: '需要定制化项目？',
    customBody: '我们支持结构、包装、Logo、说明书与目标市场要求的整体协调，适合长期产品项目合作。',
    contactOem: '联系 OEM 团队',
    factoryHeroEyebrow: '生产体系',
    factoryHeroTitle: '从产线规划到出口发运的工业化执行能力',
    factoryHeroBody: '乔天企业围绕可重复性、检验纪律与务实沟通组织制造，让全球采购团队更有把握推进合作。',
    factoryStats: [
      { value: '12', label: '条生产线' },
      { value: '50+', label: '工程与质检人员' },
      { value: '98%', label: '准时交付目标' },
      { value: 'ISO', label: '质量体系准备' }
    ],
    galleryCaptions: [
      { title: '核心生产区域', body: '围绕效率和一致性组织装配与测试流程。' },
      { title: '品质检验', body: '通过过程与终检双重控制降低批次风险。' },
      { title: '包装与出货', body: '让包装和发运节奏与品牌交付要求保持同步。' }
    ],
    qualityTitle: '三层交付保障机制',
    qualityCards: [
      { step: '01', title: '来料控制', body: '材料、连接器、芯片和包装物料在进入生产前完成基础检查。' },
      { step: '02', title: '过程监控', body: '组装、焊接与充电测试等关键环节做在线监控，避免缺陷继续流入后段。' },
      { step: '03', title: '出货放行', body: '通过终检与出货确认保持大货批次的一致性和可控性。' }
    ],
    factoryCtaTitle: '用工厂型思路规划你的下一次采购项目',
    factoryCtaBody: '我们可以协助评估产品匹配、排产安排和交付时间，帮助你更快推进合作。',
    aboutEyebrow: '品牌故事',
    aboutTitle: '为长期合作而建立的出口制造团队',
    aboutBody: '乔天企业专注务实的制造能力建设，在产品、质量和交付三个维度维持稳定协作能力。',
    timelineTitle: '发展节点',
    timeline: [
      { year: '2009', title: '从线材工程起步', body: '公司从解决基础配件需求开始，逐步积累 3C 配件制造能力。' },
      { year: '2016', title: '形成一体化制造体系', body: '整合装配、质检与包装流程，形成更适合规模交付的体系。' },
      { year: '至今', title: '服务全球采购项目', body: '持续为品牌商、分销商与零售渠道提供稳定出口支持。' }
    ],
    contactEyebrow: '联系我们',
    contactTitle: '告诉我们你的需求，我们会给出可执行的供货方向',
    contactBody: '无论是报价、样品、OEM 需求、目标市场要求还是产品匹配，都可以通过表单直接发起。',
    responseTitle: '响应承诺',
    responseBody: '大多数询盘会在 1 个工作日内获得回复。',
    directChannels: '直接沟通',
    hubTitle: '工厂与办公基地',
    hubBody: '产品沟通、样品安排、量产与出口协同由同一套运营体系推进。',
    privacyEyebrow: '隐私政策',
    privacyTitle: '面向商业联系信息的正式处理方式',
    privacyBody: '我们仅在支持沟通、报价、交付协同与服务改进所需范围内收集和使用业务信息。',
    privacySections: [
      { title: '1. 我们接收的信息', body: '当你联系我们时，我们可能会接收姓名、公司、邮箱、电话和询盘内容。' },
      { title: '2. 我们如何使用', body: '这些信息用于回复询盘、准备报价、支持打样与推进合作。' },
      { title: '3. 保护措施', body: '我们通过合理管理、访问限制与流程控制降低信息风险。' },
      { title: '4. 联系我们', body: '如果你对数据处理有疑问，可通过网站中的联系方式与我们沟通。' }
    ],
    footerBody: '面向进口商、分销商、零售商与全球采购团队的专业 3C 配件制造服务。',
    footerNavTitle: '导航',
    footerCapabilityTitle: '能力',
    footerContactTitle: '联系',
    footerCapabilityLinks: ['OEM / ODM', '工厂生产', '质量控制', '出口交付'],
    footerRights: '© 2026 乔天企业。保留所有权利。'
  }
} as const

const navRoutes: Array<{ route: Route; label: keyof typeof copy.en.nav }> = [
  { route: 'home', label: 'home' },
  { route: 'product-center', label: 'productCenter' },
  { route: 'factory-strength', label: 'factoryStrength' },
  { route: 'about', label: 'about' },
  { route: 'contact', label: 'contact' },
  { route: 'privacy', label: 'privacy' }
]

const state: {
  route: Route
  locale: Locale
  site: SiteData | null
  submitting: boolean
} = {
  route: 'home',
  locale: 'cn',
  site: null,
  submitting: false
}

function readRoute(): Route {
  const route = location.hash.replace(/^#\/?/, '') || 'home'
  if (route === 'product-center' || route === 'factory-strength' || route === 'about' || route === 'contact' || route === 'privacy') {
    return route
  }
  return 'home'
}

function t() {
  return copy[state.locale]
}

function textOf(value?: LocalizedText | string) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[state.locale] || value.en || value.cn || ''
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function siteImage(key: string, fallback: string) {
  return state.site?.images?.[key] || fallback
}

function siteSectionText(section: keyof NonNullable<SiteData['sections']>, field: 'heroTitle' | 'heroBody', fallback: string) {
  return textOf(state.site?.sections?.[section]?.[field]) || fallback
}

function siteBrand(part: 'cn' | 'en', fallback: string) {
  return state.site?.brand?.[part] || fallback
}

function getHomeStats() {
  const stats = state.site?.stats?.filter((item) => item?.value && textOf(item.label))
  if (stats?.length) {
    return stats.map((item) => ({
      value: item.value,
      label: textOf(item.label)
    }))
  }
  return t().metrics
}

function getHomeHighlights() {
  const stats = getHomeStats().slice(0, 3)
  return stats.length ? stats.map((item) => item.label) : t().heroHighlights
}

function getTrustTitle() {
  return state.locale === 'cn'
    ? `${siteBrand('cn', '乔天企业')}围绕稳定交付、质量控制与出口协同服务全球采购项目。`
    : `${siteBrand('en', 'Qiaotian Enterprise')} supports global sourcing programs with stable delivery, quality control, and export coordination.`
}

function getContactChecklist() {
  const address = textOf(state.site?.contact?.address)
  if (state.locale === 'cn') {
    return [
      state.site?.contact?.email ? `邮箱：${state.site.contact.email}` : '邮箱与联系方式',
      state.site?.contact?.phone ? `电话：${state.site.contact.phone}` : '电话与即时沟通方式',
      address ? `地址：${address}` : '地址与来访信息',
      '支持报价、打样、定制与批量交付沟通'
    ]
  }
  return [
    state.site?.contact?.email ? `Email: ${state.site.contact.email}` : 'Email and contact channel',
    state.site?.contact?.phone ? `Phone: ${state.site.contact.phone}` : 'Phone and instant communication',
    address ? `Address: ${address}` : 'Address and visiting information',
    'Support for quotation, sampling, customization, and bulk delivery'
  ]
}

function getContactSupportText() {
  return state.locale === 'cn'
    ? '支持产品匹配、报价、打样、品牌定制、包装协同与出口交付沟通。'
    : 'Support for product matching, quotation, sampling, branding, packaging coordination, and export delivery.'
}

function getProducts() {
  const products = state.site?.products?.length ? state.site.products : fallbackProducts
  return products.map((product, index) => ({
    ...product,
    image: product.image || fallbackProducts[index % fallbackProducts.length].image
  }))
}

function getHeroTitle() {
  return textOf(state.site?.hero?.title) || t().heroTitle
}

function getHeroBody() {
  return textOf(state.site?.hero?.body) || t().heroBody
}

function productCategory(product: Product) {
  const fromTags = (product.tags || []).join(' ').toLowerCase()
  const fromSlug = (product.categorySlug || '').toLowerCase()
  if (fromSlug.includes('screen') || fromTags.includes('film')) return state.locale === 'cn' ? '屏幕保护' : 'Screen Protection'
  if (fromSlug.includes('case') || fromTags.includes('case')) return state.locale === 'cn' ? '保护壳' : 'Protective Cases'
  if (fromSlug.includes('camera') || fromTags.includes('camera')) return state.locale === 'cn' ? '镜头配件' : 'Camera Accessories'
  return state.locale === 'cn' ? '配件方案' : 'Accessory Program'
}

function uniqueCategories(products: Product[]) {
  const items = products.map((product) => productCategory(product))
  return [t().filterAll, ...new Set(items)]
}

function renderHeader(active: Route) {
  return `
    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="site-brand" href="#/home">
          <span class="site-brand__cn">${escapeHtml(siteBrand('cn', '乔天企业'))}</span>
          <span class="site-brand__en">${escapeHtml(siteBrand('en', 'Qiaotian Enterprise'))}</span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${navRoutes
            .map(
              (item) => `
                <a class="site-nav__link ${item.route === active ? 'is-active' : ''}" href="#/${item.route}">
                  ${t().nav[item.label]}
                </a>
              `
            )
            .join('')}
        </nav>
        <button id="lang-toggle" class="site-lang" type="button">${t().langToggle}</button>
      </div>
    </header>
  `
}

function renderFooter() {
  const contact = state.site?.contact
  return `
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="site-footer__brand-block">
          <div class="site-brand site-brand--footer">
            <span class="site-brand__cn">${escapeHtml(siteBrand('cn', '乔天企业'))}</span>
            <span class="site-brand__en">${escapeHtml(siteBrand('en', 'Qiaotian Enterprise'))}</span>
          </div>
          <p class="site-footer__text">${t().footerBody}</p>
        </div>
        <div class="site-footer__column">
          <h4>${t().footerNavTitle}</h4>
          ${navRoutes.map((item) => `<a href="#/${item.route}">${t().nav[item.label]}</a>`).join('')}
        </div>
        <div class="site-footer__column">
          <h4>${t().footerCapabilityTitle}</h4>
          ${t().footerCapabilityLinks.map((item) => `<span>${item}</span>`).join('')}
        </div>
        <div class="site-footer__column">
          <h4>${t().footerContactTitle}</h4>
          <span>${escapeHtml(state.site?.contact?.email || 'sales@qiaotian.com')}</span>
          <span>${escapeHtml(state.site?.contact?.phone || '+86 138 0000 0000')}</span>
          <span>${escapeHtml(textOf(contact?.address) || 'Shenzhen, China')}</span>
        </div>
      </div>
      <div class="shell site-footer__bottom">${t().footerRights}</div>
    </footer>
  `
}

function renderHome() {
  const products = getProducts().slice(0, 3)
  const contact = state.site?.contact
  const homeStats = getHomeStats()
  const homeHighlights = getHomeHighlights()

  app.innerHTML = `
    <div class="site-page">
      ${renderHeader('home')}
      <main>
        <section class="hero hero--home">
          <div class="hero__media">
            <img src="${siteImage('homeHero', '/stitch_/homepage_desktop/screen.png')}" alt="Qiaotian manufacturing" />
          </div>
          <div class="hero__veil"></div>
          <div class="shell hero__content">
            <div class="hero__copy">
              <span class="eyebrow eyebrow--light">${t().heroEyebrow}</span>
              <h1>${escapeHtml(getHeroTitle())}</h1>
              <p>${escapeHtml(getHeroBody())}</p>
              <div class="hero__highlights">
                ${homeHighlights.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
              </div>
              <div class="hero__actions">
                <a class="button button--primary" href="#/product-center">${t().heroPrimary}</a>
                <a class="button button--secondary-light" href="#/contact">${t().heroSecondary}</a>
              </div>
            </div>
            <aside class="hero__panel">
              <span class="hero__panel-label">${escapeHtml(getTrustTitle())}</span>
              <div class="hero__metrics">
                ${homeStats
                  .map(
                    (item) => `
                      <div class="hero__metric">
                        <strong>${escapeHtml(item.value)}</strong>
                        <span>${escapeHtml(item.label)}</span>
                      </div>
                    `
                  )
                  .join('')}
              </div>
              <div class="hero__panel-note">
                <strong>${t().heroSideTitle}</strong>
                <ul>
                  ${homeStats.map((item) => `<li>${escapeHtml(item.label)}</li>`).join('')}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section class="trust-strip">
          <div class="shell trust-strip__inner">
            ${t().trustMarks.map((item) => `<span>${item}</span>`).join('')}
          </div>
        </section>

        <section class="section section--light">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${t().featureEyebrow}</span>
                <h2>${t().featureTitle}</h2>
              </div>
              <p>${t().featureBody}</p>
            </div>
            <div class="product-grid">
              ${products
                .map(
                  (product, index) => `
                    <article class="product-card">
                      <div class="product-card__image">
                        <img src="${product.image}" alt="${escapeHtml(textOf(product.name))}" />
                      </div>
                      <div class="product-card__body">
                        <span class="card-tag">${escapeHtml(productCategory(product))}</span>
                        <div class="product-card__index">0${index + 1}</div>
                        <h3>${escapeHtml(textOf(product.name))}</h3>
                        <p>${escapeHtml(textOf(product.summary))}</p>
                        <div class="product-card__specs">
                          <span>${state.locale === 'cn' ? '支持打样' : 'Sample Ready'}</span>
                          <span>${state.locale === 'cn' ? '支持私牌' : 'Private Label'}</span>
                        </div>
                        <div class="product-card__foot">
                          <div class="pill-row">
                            ${(product.tags || []).slice(0, 2).map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join('')}
                          </div>
                          <a class="text-link" href="#/contact">${t().details}</a>
                        </div>
                      </div>
                    </article>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell split-section">
            <div class="split-section__media">
              <img src="${siteImage('factoryGalleryMain', '/stitch_/factory_strength_desktop/screen.png')}" alt="Factory strength" />
            </div>
            <div class="split-section__content">
              <span class="eyebrow">${t().factoryEyebrow}</span>
              <h2>${t().factoryTitle}</h2>
              <p>${t().factoryBody}</p>
              <div class="value-grid">
                ${t().factoryPoints
                  .map(
                    (item) => `
                      <article class="value-card">
                        <span class="value-card__line"></span>
                        <h3>${item.title}</h3>
                        <p>${item.body}</p>
                      </article>
                    `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${t().certificateEyebrow}</span>
                <h2>${t().certificateTitle}</h2>
              </div>
              <p>${t().certificateBody}</p>
            </div>
            <div class="value-grid">
              ${(state.site?.certificates || [])
                .map(
                  (item) => `
                    <article class="value-card value-card--light">
                      <span class="value-card__line"></span>
                      <h3>${escapeHtml(textOf(item.title))}</h3>
                      <p>${escapeHtml(item.issuer || '')}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="section section--contact">
          <div class="shell inquiry-layout">
            <div class="inquiry-copy">
              <span class="eyebrow eyebrow--light">${t().procurementEyebrow}</span>
              <h2>${t().procurementTitle}</h2>
              <p>${t().procurementBody}</p>
              <div class="contact-points">
                <div>
                  <small>Email</small>
                  <strong>${escapeHtml(contact?.email || 'sales@qiaotian.com')}</strong>
                </div>
                <div>
                  <small>${state.locale === 'cn' ? '电话' : 'Phone'}</small>
                  <strong>${escapeHtml(contact?.phone || '+86 138 0000 0000')}</strong>
                </div>
                <div>
                  <small>${state.locale === 'cn' ? '地址' : 'Address'}</small>
                  <strong>${escapeHtml(textOf(contact?.address) || 'Shenzhen, China')}</strong>
                </div>
              </div>
            </div>
            <div class="inquiry-card">
              ${renderInquiryForm()}
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `
}

function renderProductCenter() {
  const products = getProducts()
  const categories = uniqueCategories(products)

  app.innerHTML = `
    <div class="site-page">
      ${renderHeader('product-center')}
      <main>
        <section class="page-hero page-hero--light">
          <div class="shell page-hero__grid">
            <div>
              <span class="eyebrow">${t().productCenterEyebrow}</span>
              <h1>${t().productCenterTitle}</h1>
            </div>
            <p>${t().productCenterBody}</p>
          </div>
        </section>

        <section class="section section--light section--tight-top">
          <div class="shell catalog-layout">
            <aside class="catalog-sidebar">
              <div class="sidebar-card">
                <span class="eyebrow">${t().categoryTitle}</span>
                <h3>${t().categoryTitle}</h3>
                <p>${t().categoryBody}</p>
                <div class="category-list">
                  ${categories.map((item) => `<span class="category-chip">${escapeHtml(item)}</span>`).join('')}
                </div>
              </div>
              <div class="sidebar-card sidebar-card--dark">
                <span class="eyebrow eyebrow--light">${t().supportTitle}</span>
                <h3>${t().supportTitle}</h3>
                <ul class="support-list">
                  ${t().supportItems.map((item) => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            </aside>
            <div class="catalog-main">
              <div class="catalog-grid">
                ${products
                  .map(
                    (product) => `
                      <article class="catalog-card">
                        <div class="catalog-card__image">
                          <img src="${product.image}" alt="${escapeHtml(textOf(product.name))}" />
                        </div>
                        <div class="catalog-card__body">
                          <span class="card-tag">${escapeHtml(productCategory(product))}</span>
                          <h3>${escapeHtml(textOf(product.name))}</h3>
                          <p>${escapeHtml(textOf(product.summary))}</p>
                          <div class="pill-row">
                            ${(product.tags || []).slice(0, 2).map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join('')}
                          </div>
                          <div class="catalog-card__actions">
                            <a class="button button--outline" href="#/contact">${t().details}</a>
                          </div>
                        </div>
                      </article>
                    `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell cta-panel">
            <div>
              <span class="eyebrow">${t().customTitle}</span>
              <h2>${t().customTitle}</h2>
              <p>${t().customBody}</p>
            </div>
            <div class="cta-panel__actions">
              <a class="button button--dark" href="#/contact">${t().contactOem}</a>
              <a class="button button--outline-dark" href="#/contact">${t().requestPrice}</a>
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `
}

function renderFactoryStrength() {
  const stats = t().factoryStats

  app.innerHTML = `
    <div class="site-page">
      ${renderHeader('factory-strength')}
      <main>
        <section class="page-hero page-hero--dark">
          <div class="hero__media">
            <img src="${siteImage('factoryHero', '/stitch_/factory_strength_desktop/screen.png')}" alt="Factory floor" />
          </div>
          <div class="hero__veil"></div>
          <div class="shell page-hero__stack">
            <span class="eyebrow eyebrow--light">${t().factoryHeroEyebrow}</span>
            <h1>${siteSectionText('factory', 'heroTitle', t().factoryHeroTitle)}</h1>
            <p>${siteSectionText('factory', 'heroBody', t().factoryHeroBody)}</p>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell stat-grid">
            ${stats
              .map(
                (item) => `
                  <article class="stat-card">
                    <strong>${item.value}</strong>
                    <span>${item.label}</span>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>

        <section class="section section--light section--tight-top">
          <div class="shell gallery-grid">
            <article class="gallery-card gallery-card--wide">
              <img src="${siteImage('factoryGalleryMain', '/stitch_/factory_strength_desktop/screen.png')}" alt="Production line" />
              <div class="gallery-card__caption">
                <h3>${t().galleryCaptions[0].title}</h3>
                <p>${t().galleryCaptions[0].body}</p>
              </div>
            </article>
            <article class="gallery-card">
              <img src="${siteImage('factoryGalleryLab', '/stitch_/contact_us_desktop/screen.png')}" alt="Quality inspection" />
              <div class="gallery-card__caption">
                <h3>${t().galleryCaptions[1].title}</h3>
                <p>${t().galleryCaptions[1].body}</p>
              </div>
            </article>
            <article class="gallery-card">
              <img src="${siteImage('factoryGalleryQc', '/stitch_/about_us_mobile/screen.png')}" alt="Packing zone" />
              <div class="gallery-card__caption">
                <h3>${t().galleryCaptions[2].title}</h3>
                <p>${t().galleryCaptions[2].body}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${t().qualityTitle}</span>
                <h2>${t().qualityTitle}</h2>
              </div>
            </div>
            <div class="quality-grid">
              ${t().qualityCards
                .map(
                  (item) => `
                    <article class="quality-card">
                      <span class="quality-card__step">${item.step}</span>
                      <h3>${item.title}</h3>
                      <p>${item.body}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="section section--contact">
          <div class="shell cta-banner">
            <div>
              <span class="eyebrow eyebrow--light">${t().factoryHeroEyebrow}</span>
              <h2>${t().factoryCtaTitle}</h2>
              <p>${t().factoryCtaBody}</p>
            </div>
            <a class="button button--primary" href="#/contact">${t().heroSecondary}</a>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `
}

function renderAbout() {
  app.innerHTML = `
    <div class="site-page">
      ${renderHeader('about')}
      <main>
        <section class="page-hero page-hero--dark page-hero--about">
          <div class="hero__media">
            <img src="${siteImage('aboutHero', '/stitch_/about_us_mobile/screen.png')}" alt="About Qiaotian" />
          </div>
          <div class="hero__veil"></div>
          <div class="shell page-hero__stack">
            <span class="eyebrow eyebrow--light">${t().aboutEyebrow}</span>
            <h1>${siteSectionText('about', 'heroTitle', t().aboutTitle)}</h1>
            <p>${siteSectionText('about', 'heroBody', t().aboutBody)}</p>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell timeline-layout">
            <div class="timeline-layout__intro">
              <span class="eyebrow">${t().timelineTitle}</span>
              <h2>${t().timelineTitle}</h2>
              <p>${t().valueBody}</p>
            </div>
            <div class="timeline-list">
              ${t().timeline
                .map(
                  (item) => `
                    <article class="timeline-card">
                      <span class="timeline-card__year">${item.year}</span>
                      <h3>${item.title}</h3>
                      <p>${item.body}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${t().valueEyebrow}</span>
                <h2>${t().valueTitle}</h2>
              </div>
            </div>
            <div class="value-grid">
              ${t().valueCards
                .map(
                  (item) => `
                    <article class="value-card value-card--light">
                      <span class="value-card__line"></span>
                      <h3>${item.title}</h3>
                      <p>${item.body}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `
}

function renderContact() {
  const contact = state.site?.contact
  const contactChecklist = getContactChecklist()

  app.innerHTML = `
    <div class="site-page">
      ${renderHeader('contact')}
      <main>
        <section class="page-hero page-hero--light">
          <div class="shell page-hero__grid">
            <div>
              <span class="eyebrow">${t().contactEyebrow}</span>
              <h1>${siteSectionText('contact', 'heroTitle', t().contactTitle)}</h1>
            </div>
            <p>${siteSectionText('contact', 'heroBody', t().contactBody)}</p>
          </div>
        </section>

        <section class="section section--light section--tight-top">
          <div class="shell contact-layout">
            <div class="contact-card">
              <div class="contact-card__head">
                <span class="eyebrow">${t().responseTitle}</span>
                <h2>${t().directChannels}</h2>
                <p>${t().responseBody}</p>
              </div>
              <div class="contact-badge-row">
                <span>OEM</span>
                <span>ODM</span>
                <span>${state.locale === 'cn' ? '出口交付' : 'Export Delivery'}</span>
              </div>
              <div class="contact-quote">
                <p>${escapeHtml(siteSectionText('contact', 'heroBody', t().contactBody))}</p>
              </div>
              <div class="contact-checklist">
                ${contactChecklist.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
              </div>
              <div class="contact-detail-list">
                <div>
                  <small>Email</small>
                  <strong>${escapeHtml(contact?.email || 'sales@qiaotian.com')}</strong>
                </div>
                <div>
                  <small>${state.locale === 'cn' ? '电话' : 'Phone'}</small>
                  <strong>${escapeHtml(contact?.phone || '+86 138 0000 0000')}</strong>
                </div>
                <div>
                  <small>${state.locale === 'cn' ? '地址' : 'Address'}</small>
                  <strong>${escapeHtml(textOf(contact?.address) || 'Shenzhen, China')}</strong>
                </div>
              </div>
              <div class="contact-service-panel">
                <span>${state.locale === 'cn' ? '支持事项' : 'What We Can Support'}</span>
                <p>${escapeHtml(getContactSupportText())}</p>
              </div>
              <div class="contact-map">
                <img src="${siteImage('contactMap', '/stitch_/contact_us_desktop/screen.png')}" alt="Office and factory" />
              </div>
              <div class="contact-note">
                <h3>${escapeHtml(siteBrand('en', 'Qiaotian Enterprise'))}</h3>
                <p>${escapeHtml(textOf(contact?.address) || t().hubBody)}</p>
              </div>
            </div>
            <div class="inquiry-card inquiry-card--light">
              ${renderInquiryForm()}
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `
  bindInquiryForm()
}

function renderPrivacy() {
  app.innerHTML = `
    <div class="site-page">
      ${renderHeader('privacy')}
      <main>
        <section class="page-hero page-hero--dark page-hero--legal">
          <div class="shell page-hero__stack">
            <span class="eyebrow eyebrow--light">${t().privacyEyebrow}</span>
            <h1>${siteSectionText('privacy', 'heroTitle', t().privacyTitle)}</h1>
            <p>${siteSectionText('privacy', 'heroBody', t().privacyBody)}</p>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell legal-layout">
            ${t().privacySections
              .map(
                (item) => `
                  <article class="legal-card">
                    <h2>${item.title}</h2>
                    <p>${item.body}</p>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `
}

function renderInquiryForm() {
  return `
    <form id="lead-form" class="lead-form">
      <div class="form-grid">
        <label>
          <span>${t().fullName}</span>
          <input name="name" placeholder="${t().formPlaceholderName}" required />
        </label>
        <label>
          <span>${t().companyName}</span>
          <input name="company" placeholder="${t().formPlaceholderCompany}" required />
        </label>
        <label>
          <span>${t().workEmail}</span>
          <input name="email" type="email" placeholder="${t().formPlaceholderEmail}" required />
        </label>
        <label>
          <span>${t().phone}</span>
          <input name="phone" placeholder="${t().formPlaceholderPhone}" required />
        </label>
        <label class="form-grid__full">
          <span>${t().projectDetails}</span>
          <textarea name="message" rows="5" placeholder="${t().formPlaceholderMessage}" required></textarea>
        </label>
      </div>
      <button class="button button--primary button--block" type="submit">${state.submitting ? '...' : t().formSubmit}</button>
      <p id="lead-form-feedback" class="form-feedback"></p>
    </form>
  `
}

function bindCommonEvents() {
  document.querySelector<HTMLButtonElement>('#lang-toggle')?.addEventListener('click', () => {
    state.locale = state.locale === 'cn' ? 'en' : 'cn'
    renderCurrentRoute()
  })
}

function bindInquiryForm() {
  const form = document.querySelector<HTMLFormElement>('#lead-form')
  form?.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (state.submitting) return

    const currentForm = event.currentTarget as HTMLFormElement | null
    if (!currentForm) return

    const payload = Object.fromEntries(new FormData(currentForm).entries()) as unknown as InquiryPayload
    state.submitting = true
    renderCurrentRoute()

    const feedback = document.querySelector<HTMLParagraphElement>('#lead-form-feedback')

    try {
      await submitInquiryToCms(payload)
      const nextForm = document.querySelector<HTMLFormElement>('#lead-form')
      if (feedback) {
        feedback.textContent = t().formSuccess
        feedback.className = 'form-feedback is-success'
      }
      nextForm?.reset()
    } catch (error) {
      if (feedback) {
        const message = error instanceof Error && error.message ? error.message : t().formError
        feedback.textContent = `${t().formError} ${message}`
        feedback.className = 'form-feedback is-error'
      }
    } finally {
      state.submitting = false
      const button = document.querySelector<HTMLButtonElement>('#lead-form button[type="submit"]')
      if (button) button.textContent = t().formSubmit
    }
  })
}

async function loadSite() {
  const result = await loadSiteFromCms()
  state.site = result.site
}

function renderCurrentRoute() {
  state.route = readRoute()
  if (state.route === 'product-center') renderProductCenter()
  else if (state.route === 'factory-strength') renderFactoryStrength()
  else if (state.route === 'about') renderAbout()
  else if (state.route === 'contact') renderContact()
  else if (state.route === 'privacy') renderPrivacy()
  else renderHome()

  bindCommonEvents()
  if (state.route === 'home' || state.route === 'contact') bindInquiryForm()
}

async function bootstrap() {
  await loadSite()
  renderCurrentRoute()
}

window.addEventListener('hashchange', () => renderCurrentRoute())

bootstrap().catch((error) => {
  console.error(error)
  app.innerHTML = `<pre>${escapeHtml(error instanceof Error ? error.message : String(error))}</pre>`
})
