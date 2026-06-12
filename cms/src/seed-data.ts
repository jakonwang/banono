type CategorySeed = {
  nameCn: string
  nameEn: string
  descriptionCn: string
  descriptionEn: string
  sort: number
  availability: 'enabled' | 'disabled'
  slug: string
}

type ProductSeed = {
  titleCn: string
  titleEn: string
  summaryCn: string
  summaryEn: string
  slug: string
  tags: string[]
  status: 'published' | 'draft'
  categorySlug: string
}

export const seedData = {
  globalSetting: {
    brandCn: '乔天企业',
    brandEn: 'Qiaotian Enterprise',
    phone: '+86 (755) 2345 6789',
    email: 'sales@qiaotian.com',
    addressCn: '深圳市宝安区高新产业园 4 栋',
    addressEn: "Building 4, High-Tech Industrial Park, Bao'an, Shenzhen",
    seoTitle: 'Qiaotian Enterprise',
    seoDescription: 'Professional 3C accessories manufacturing'
  },
  homePage: {
    heroTitleCn: '专业 3C 配件制造',
    heroTitleEn: 'Professional 3C Accessories Manufacturing',
    heroBodyCn: '面向品牌商、渠道商与服务商，提供稳定交付的 OEM / ODM 制造能力。',
    heroBodyEn: 'Serving brands and distributors with stable OEM / ODM delivery.',
    stats: [
      { value: '10+', labelCn: '行业经验', labelEn: 'Years' },
      { value: '50+', labelCn: '专利技术', labelEn: 'Patents' },
      { value: 'ISO', labelCn: '认证体系', labelEn: 'Certified' },
      { value: 'GRS', labelCn: '可持续配套', labelEn: 'Ready' }
    ],
    advantages: [
      {
        titleCn: '稳定交付',
        titleEn: 'Stable Delivery',
        bodyCn: '围绕批量生产、品质控制与出货排程建立稳定执行能力。',
        bodyEn: 'Built around repeatable production, quality control, and shipment scheduling.'
      },
      {
        titleCn: '品牌定制',
        titleEn: 'OEM / ODM Support',
        bodyCn: '支持品牌标识、包装、配件组合与项目级定制协同。',
        bodyEn: 'Support for brand identity, packaging, bundled accessories, and program customization.'
      },
      {
        titleCn: '出口协同',
        titleEn: 'Export Coordination',
        bodyCn: '面向国际市场交付要求，协助推进认证、包装与发运准备。',
        bodyEn: 'Aligned with export requirements for certification, packing, and shipment readiness.'
      }
    ]
  },
  factoryPage: {
    heroTitleCn: '品质背后的核心：先进制造',
    heroTitleEn: 'The Core of Our Quality: Advanced Manufacturing',
    heroBodyCn: '以工业级精度、规模化产能和严格质量控制，为全球 3C 品牌提供稳定支撑。',
    heroBodyEn: 'Empowering global 3C brands with industrial precision, scalable output, and rigorous quality control.',
    capabilities: [
      {
        labelCn: '规模化生产',
        labelEn: 'Scalable Production',
        valueCn: '支持稳定批量交付与多项目并行排产。',
        valueEn: 'Supports stable bulk delivery and parallel production scheduling.'
      },
      {
        labelCn: '过程质检',
        labelEn: 'Process Quality Control',
        valueCn: '通过来料、制程与终检三层控制降低批次风险。',
        valueEn: 'Reduces batch risk through incoming, in-process, and final inspection.'
      },
      {
        labelCn: '项目协同',
        labelEn: 'Program Coordination',
        valueCn: '让打样、报价、包装和出货节奏在同一项目链路中推进。',
        valueEn: 'Keeps sampling, quotation, packaging, and shipment aligned in one project track.'
      }
    ],
    qualityPoints: [
      {
        labelCn: '来料控制',
        labelEn: 'Incoming Control',
        valueCn: '关键原材、辅料与包装件在投产前完成基础检查。',
        valueEn: 'Core materials, accessories, and packaging are checked before production.'
      },
      {
        labelCn: '制程监控',
        labelEn: 'Process Monitoring',
        valueCn: '关键组装与测试节点保持在线检查和异常追踪。',
        valueEn: 'Critical assembly and testing points are monitored with issue tracking.'
      },
      {
        labelCn: '出货放行',
        labelEn: 'Shipment Release',
        valueCn: '确保批量产品在出货前达到一致的交付标准。',
        valueEn: 'Ensures batches meet consistent release standards before shipment.'
      }
    ]
  },
  aboutPage: {
    heroTitleCn: '规模化中的精密制造',
    heroTitleEn: 'Engineering Precision at Scale',
    heroBodyCn: '乔天企业持续以工程化能力、交付纪律与创新研发，为全球 3C 制造树立更高标准。',
    heroBodyEn: 'Qiaotian sets a higher benchmark for 3C manufacturing through engineering discipline and reliable execution.',
    introCn: '我们专注 3C 配件制造与出口协同，围绕产品开发、生产交付、质量管理与品牌定制提供长期服务。',
    introEn: 'We focus on 3C accessories manufacturing and export execution across product development, delivery, quality, and branding.',
    timeline: [
      {
        year: '2009',
        titleCn: '从配件工程起步',
        titleEn: 'Started from accessory engineering',
        bodyCn: '从解决基础配件需求开始，逐步积累制造与交付能力。',
        bodyEn: 'Started by solving core accessory needs and built execution capabilities step by step.'
      },
      {
        year: '2016',
        titleCn: '形成一体化制造体系',
        titleEn: 'Built an integrated manufacturing system',
        bodyCn: '整合装配、质检与包装流程，形成更适合规模交付的体系。',
        bodyEn: 'Integrated assembly, quality control, and packaging into a scalable operating model.'
      },
      {
        year: 'Today',
        titleCn: '服务全球采购项目',
        titleEn: 'Serving global sourcing programs',
        bodyCn: '持续为品牌商、分销商与零售渠道提供稳定出口支持。',
        bodyEn: 'Continuing to support brands, distributors, and retail channels worldwide.'
      }
    ],
    values: [
      {
        titleCn: '工程导向',
        titleEn: 'Engineering Driven',
        bodyCn: '以结构、材料、性能和可制造性为核心推进产品落地。',
        bodyEn: 'Product execution is driven by structure, materials, performance, and manufacturability.'
      },
      {
        titleCn: '交付纪律',
        titleEn: 'Delivery Discipline',
        bodyCn: '围绕节奏、排产和质量建立长期可依赖的合作基础。',
        bodyEn: 'Schedules, production planning, and quality form the base of reliable cooperation.'
      },
      {
        titleCn: '长期合作',
        titleEn: 'Long-term Cooperation',
        bodyCn: '关注持续订单、项目延展与全球采购团队的长期协同。',
        bodyEn: 'Focused on repeat business, program growth, and long-term sourcing cooperation.'
      }
    ]
  },
  contactPage: {
    heroTitleCn: '全球供应链业务支持',
    heroTitleEn: 'Expert Support for Your Global Supply Chain',
    heroBodyCn: '我们的采购与技术顾问团队可协助你确认规格、报价、打样与定制生产需求。',
    heroBodyEn: 'Our team is ready to assist with specifications, quotations, sampling, and custom manufacturing requirements.',
    phone: '+86 (755) 2345 6789',
    email: 'sales@qiaotian.com',
    addressCn: '深圳市宝安区高新产业园 4 栋',
    addressEn: "Building 4, High-Tech Industrial Park, Bao'an, Shenzhen",
    formHints: [
      {
        labelCn: '产品方向',
        labelEn: 'Product Direction',
        valueCn: '请说明目标产品、功能或应用场景。',
        valueEn: 'Tell us the target product, feature, or use case.'
      },
      {
        labelCn: '数量范围',
        labelEn: 'Volume Range',
        valueCn: '请提供预估数量或 MOQ 预期。',
        valueEn: 'Share expected quantity or MOQ range.'
      },
      {
        labelCn: '市场要求',
        labelEn: 'Market Requirements',
        valueCn: '可补充认证、包装或目标市场要求。',
        valueEn: 'You may include certification, packaging, or market requirements.'
      }
    ]
  },
  privacyPage: {
    titleCn: '隐私政策',
    titleEn: 'Privacy Policy',
    bodyCn: '生效日期：2024 年 1 月 1 日。我们重视你的隐私与业务数据安全，并以此作为长期合作的基础。',
    bodyEn: 'Effective Date: January 1, 2024. We value your privacy and business data security as a foundation for long-term cooperation.'
  },
  categories: [
    {
      nameCn: '屏幕保护',
      nameEn: 'Screen Protection',
      descriptionCn: '适用于手机和平板的保护膜产品方案。',
      descriptionEn: 'Protective film solutions for phones and tablets.',
      sort: 1,
      availability: 'enabled',
      slug: 'screen-protection'
    },
    {
      nameCn: '保护壳',
      nameEn: 'Protective Cases',
      descriptionCn: '手机壳与周边防护配件产品。',
      descriptionEn: 'Phone cases and related protective accessories.',
      sort: 2,
      availability: 'enabled',
      slug: 'protective-cases'
    },
    {
      nameCn: '镜头配件',
      nameEn: 'Camera Accessories',
      descriptionCn: '镜头膜及相机区域防护配件。',
      descriptionEn: 'Lens film and camera module accessories.',
      sort: 3,
      availability: 'enabled',
      slug: 'camera-accessories'
    }
  ] as CategorySeed[],
  products: [
    {
      titleCn: '3D 钢化膜',
      titleEn: '3D Tempered Glass Film',
      summaryCn: '高透、耐刮、贴合度高，适用于主流机型。',
      summaryEn: 'High clarity, scratch resistance, and strong fit for mainstream phones.',
      slug: '3d-tempered-glass-film',
      tags: ['Hot', 'OEM'],
      status: 'published',
      categorySlug: 'screen-protection'
    },
    {
      titleCn: '平板保护膜',
      titleEn: 'Tablet Film',
      summaryCn: '适配平板设备，兼顾保护与清晰显示。',
      summaryEn: 'Built for tablet devices with clear viewing and screen protection.',
      slug: 'tablet-film',
      tags: ['Tablet', 'Protective'],
      status: 'published',
      categorySlug: 'screen-protection'
    },
    {
      titleCn: '手机保护壳',
      titleEn: 'Phone Case',
      summaryCn: '多材质多工艺可选，支持品牌定制。',
      summaryEn: 'Multiple materials and finishes with brand customization support.',
      slug: 'phone-case',
      tags: ['Custom', 'Case'],
      status: 'published',
      categorySlug: 'protective-cases'
    },
    {
      titleCn: '镜头保护膜',
      titleEn: 'Lens Protection Film',
      summaryCn: '适用于高端手机镜头区域，抗磨损、透光稳定。',
      summaryEn: 'Built for premium camera lens modules with stable transparency and wear resistance.',
      slug: 'lens-protection-film',
      tags: ['Camera', 'Protection'],
      status: 'published',
      categorySlug: 'camera-accessories'
    }
  ] as ProductSeed[],
  certificates: [
    { titleCn: 'ISO 9001 认证', titleEn: 'ISO 9001 Certificate', issuer: 'SGS', sort: 1 },
    { titleCn: 'ISO 14001 认证', titleEn: 'ISO 14001 Certificate', issuer: 'SGS', sort: 2 }
  ]
}
