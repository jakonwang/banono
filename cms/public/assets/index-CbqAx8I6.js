(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=``.replace(/\/$/,``);async function t(t,n={}){let r=await fetch(`${e}${t}`,n);if(!r.ok)throw Error(`CMS request failed: ${t}`);return r.json()}async function n(){return{site:await t(`/api/public/site`)}}async function r(t){if(!(await fetch(`${e}/api/public/inquiry`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).ok)throw Error(`Failed to submit inquiry`)}var i=document.querySelector(`#app`);if(!i)throw Error(`App root not found`);var a=i,o={en:{nav:{home:`Home`,productCenter:`Product Center`,factoryStrength:`Factory Strength`,about:`About Us`,contact:`Contact`,privacy:`Privacy Policy`},langToggle:`EN / CN`,heroEyebrow:`Industrial Manufacturing Partner`,heroTitle:`Premium 3C accessories engineered for global sourcing programs`,heroBody:`Qiaotian Enterprise supports OEM, ODM, and export delivery with disciplined manufacturing, reliable quality control, and a clear commercial response process.`,heroPrimary:`Explore Products`,heroSecondary:`Start Inquiry`,trustTitle:`Trusted by procurement teams that care about consistency, certification, and delivery discipline.`,metrics:[{value:`15+`,label:`Years in export manufacturing`},{value:`500K+`,label:`Monthly production capacity`},{value:`40+`,label:`Countries and regions served`},{value:`24H`,label:`Technical response commitment`}],trustMarks:[`OEM / ODM`,`CE / RoHS / FCC`,`Factory Direct`,`Export Delivery`,`Retail Packaging`],heroHighlights:[`OEM / ODM Programs`,`Export-grade QC`,`Retail-ready Packaging`],heroSideTitle:`Manufacturing Notes`,heroSideList:[`Structured OEM quoting`,`Factory-side QC checkpoints`,`Export program coordination`],tradeSignals:[`Low MOQ Support`,`Sample Development`,`Bulk Quotation`,`Global Shipment Coordination`],featureEyebrow:`Featured Range`,featureTitle:`Product lines prepared for B2B sourcing and export programs`,featureBody:`Our catalog focuses on charging, connectivity, and accessory essentials that are easier to quote, sample, certify, pack, and scale for overseas buyers.`,factoryEyebrow:`Factory Capability`,factoryTitle:`A factory system designed for repeatable delivery`,factoryBody:`Production, quality inspection, packaging, and shipment coordination work as one operating system so your sourcing plan stays predictable.`,factoryPoints:[{title:`Certification Ready`,body:`Product and process preparation aligned with CE, RoHS, FCC, and common market-entry requirements.`},{title:`OEM / ODM Coordination`,body:`Tooling, logo, packaging, labeling, inserts, and sample confirmation managed in one commercial track.`},{title:`Delivery Rhythm`,body:`Scheduling, inspection, and shipment coordination reduce avoidable delay and batch inconsistency.`}],valueEyebrow:`Why Qiaotian`,valueTitle:`A commercial partner built for long-cycle cooperation`,valueBody:`We combine engineering, production discipline, and export coordination to support brands and distributors beyond one-off orders.`,valueCards:[{title:`Engineering Precision`,body:`Signal integrity, charging safety, and material consistency are controlled from concept to release.`},{title:`Factory Transparency`,body:`Capacity, lead time, and inspection checkpoints stay clear enough for practical sourcing decisions.`},{title:`Commercial Reliability`,body:`We optimize around repeat orders, stable programs, and long-term supply relationships.`}],certificateEyebrow:`Quality Standards`,certificateTitle:`International compliance and manufacturing confidence`,certificateBody:`Aligned with the certifications, testing expectations, and export discipline global buyers expect.`,procurementEyebrow:`Start A Project`,procurementTitle:`Request quotation, samples, or a private-label proposal`,procurementBody:`Tell us your target product, quantity range, destination market, certification needs, and packaging expectation. We will reply with a workable sourcing direction.`,fullName:`Full Name`,companyName:`Company Name`,workEmail:`Work Email`,phone:`Phone / WhatsApp`,projectDetails:`Project Details`,formPlaceholderName:`e.g. John Smith`,formPlaceholderCompany:`e.g. Global Trade Ltd.`,formPlaceholderEmail:`name@company.com`,formPlaceholderPhone:`e.g. +1 555 000 1234`,formPlaceholderMessage:`Share product target, volume, certifications, packaging, or market requirements.`,formSubmit:`Send Inquiry`,formSuccess:`Inquiry submitted successfully. We will contact you soon.`,formError:`Submission failed. Please try again later.`,productCenterEyebrow:`Product Catalog`,productCenterTitle:`Product center built for overseas sourcing review`,productCenterBody:`A cleaner catalog structure for buyers who need quick category scanning, specification confidence, and direct inquiry entry.`,filterAll:`All Products`,categoryTitle:`Category Navigation`,categoryBody:`Browse major product directions and request the matching quotation or technical sheet.`,supportTitle:`Program Support`,supportItems:[`OEM branding`,`Retail packaging`,`Export compliance`,`Sample validation`],requestPrice:`Request Quotation`,details:`Send Inquiry`,customTitle:`Need a custom project?`,customBody:`We support structure, packaging, logo, insert, and market-specific requirement coordination for long-term product programs.`,contactOem:`Talk to OEM Team`,factoryHeroEyebrow:`Production System`,factoryHeroTitle:`Industrial execution from line planning to export dispatch`,factoryHeroBody:`Qiaotian builds manufacturing around repeatability, inspection discipline, and practical communication so global buyers can move with confidence.`,factoryStats:[{value:`12`,label:`Production lines`},{value:`50+`,label:`Engineering and QA staff`},{value:`98%`,label:`On-time delivery target`},{value:`ISO`,label:`Quality system ready`}],galleryCaptions:[{title:`Core Production Area`,body:`Assembly and testing organized around throughput and consistency.`},{title:`Inspection Control`,body:`In-process and final checks reduce batch risk before shipment.`},{title:`Packing & Dispatch`,body:`Packaging and dispatch stay aligned with brand delivery requirements.`}],qualityTitle:`Three layers of delivery assurance`,qualityCards:[{step:`01`,title:`Incoming Control`,body:`Materials, connectors, chips, and packaging inputs are checked before production starts.`},{step:`02`,title:`Process Monitoring`,body:`Assembly, soldering, and charging tests are monitored inline to stop defects from traveling downstream.`},{step:`03`,title:`Final Release`,body:`Final inspection and shipment confirmation keep mass production batches stable and controllable.`}],factoryCtaTitle:`Plan your next sourcing program with a factory-first approach`,factoryCtaBody:`We can help evaluate product fit, production arrangement, and delivery timing for your next project.`,aboutEyebrow:`Brand Story`,aboutTitle:`An export manufacturing team built for long-term cooperation`,aboutBody:`Qiaotian Enterprise focuses on practical manufacturing excellence and steady commercial collaboration across product, quality, and delivery.`,timelineTitle:`Milestones`,timeline:[{year:`2009`,title:`Started from cable engineering`,body:`The company began by solving core accessory requirements with a practical manufacturing mindset.`},{year:`2016`,title:`Expanded into integrated production`,body:`Assembly, quality control, and packaging were consolidated into a more scalable manufacturing system.`},{year:`Today`,title:`Serving global sourcing programs`,body:`Qiaotian supports brands, distributors, and retail channels with repeatable export execution.`}],contactEyebrow:`Contact Us`,contactTitle:`Tell us what you need and we will return with a workable supply direction`,contactBody:`Use the inquiry form for quotations, samples, OEM requests, target market requirements, or product matching. Our response style stays direct and commercially practical.`,responseTitle:`Response Commitment`,responseBody:`Most inquiries receive an answer within one business day.`,directChannels:`Direct Channels`,hubTitle:`Factory & Office Base`,hubBody:`Product discussion, sample arrangement, mass production, and export coordination run from one connected operating base.`,contactChecklist:[`Product target or SKU`,`Quantity range / MOQ expectation`,`Destination market`,`Certification or packaging needs`],privacyEyebrow:`Privacy Policy`,privacyTitle:`Formal handling of business contact information`,privacyBody:`We only collect and use business inquiry information as needed to support communication, quotation, delivery coordination, and service improvement.`,privacySections:[{title:`1. Information We Receive`,body:`When you contact us, we may receive your name, company, email, phone number, and inquiry details.`},{title:`2. How We Use It`,body:`This information is used to answer inquiries, prepare quotations, support sampling, and advance business cooperation.`},{title:`3. Protection Measures`,body:`We apply reasonable management, access limitation, and process control to reduce the risk around stored information.`},{title:`4. Contact`,body:`If you have any question about data handling, please contact us through the information listed on this site.`}],footerBody:`Professional 3C accessories manufacturing for importers, distributors, retailers, and global procurement teams.`,footerNavTitle:`Navigation`,footerCapabilityTitle:`Capabilities`,footerContactTitle:`Contact`,footerCapabilityLinks:[`OEM / ODM`,`Factory Production`,`Quality Control`,`Export Delivery`],footerRights:`© 2026 Qiaotian Enterprise. All rights reserved.`},cn:{nav:{home:`首页`,productCenter:`产品中心`,factoryStrength:`工厂实力`,about:`关于我们`,contact:`联系我们`,privacy:`隐私政策`},langToggle:`中 / EN`,heroEyebrow:`工业制造合作伙伴`,heroTitle:`面向全球采购项目的高端 3C 配件制造服务`,heroBody:`乔天企业围绕 OEM、ODM 与出口交付提供稳定制造、可靠品控和清晰响应机制，让品牌商、分销商和采购团队更放心推进合作。`,heroPrimary:`查看产品`,heroSecondary:`发起询盘`,trustTitle:`服务重视一致性、认证能力与交付纪律的国际采购团队。`,metrics:[{value:`15+`,label:`年出口制造经验`},{value:`50万+`,label:`月产能规模`},{value:`40+`,label:`服务国家与地区`},{value:`24H`,label:`技术响应承诺`}],trustMarks:[`OEM / ODM`,`CE / RoHS / FCC`,`工厂直供`,`出口交付`,`零售包装`],heroHighlights:[`OEM / ODM 项目`,`出口级质控`,`零售包装配套`],heroSideTitle:`制造要点`,heroSideList:[`结构化 OEM 报价`,`工厂侧质检节点`,`出口项目协同推进`],tradeSignals:[`支持低 MOQ`,`样品开发`,`批量报价`,`全球发运协同`],featureEyebrow:`精选产品`,featureTitle:`面向 B2B 采购与出口项目整理的产品线`,featureBody:`我们的目录聚焦充电、连接与基础配件，更适合海外买家进行报价、打样、认证、包装和规模化交付。`,factoryEyebrow:`工厂能力`,factoryTitle:`围绕稳定交付建立的工厂体系`,factoryBody:`生产、质检、包装与出货协同运转，让采购计划依赖流程和标准，而不是依赖运气。`,factoryPoints:[{title:`认证与合规准备`,body:`产品和流程可对接 CE、RoHS、FCC 等主要出口市场的常见合规要求。`},{title:`OEM / ODM 协调`,body:`模具、Logo、包装、标签、说明书与样品确认在同一商业节奏中推进。`},{title:`交付节奏`,body:`排产、检验与发运协同减少不必要的延误和批次波动。`}],valueEyebrow:`合作价值`,valueTitle:`面向长期项目协作建立的商业型制造伙伴`,valueBody:`我们把工程能力、生产纪律与出口协同结合在一起，服务的不只是一次性订单，而是长期合作项目。`,valueCards:[{title:`工程精度`,body:`从传输性能、充电安全到材料一致性，关键控制点贯穿方案到放行全过程。`},{title:`工厂透明`,body:`产能、交期与检验节点清晰可沟通，适合重视可预期性的采购团队。`},{title:`商业可靠`,body:`我们围绕持续补货、稳定项目与长期供货关系做优化。`}],certificateEyebrow:`质量标准`,certificateTitle:`面向国际市场的合规与制造信心`,certificateBody:`围绕全球买家关心的认证、测试要求和出口执行纪律进行准备与交付。`,procurementEyebrow:`开启合作`,procurementTitle:`获取报价、样品或自有品牌方案`,procurementBody:`告诉我们目标产品、数量区间、目标市场、认证要求和包装预期，我们会给出可执行的供货方向和回复。`,fullName:`姓名`,companyName:`公司名称`,workEmail:`工作邮箱`,phone:`电话 / WhatsApp`,projectDetails:`项目需求`,formPlaceholderName:`例如：张先生`,formPlaceholderCompany:`例如：环球贸易有限公司`,formPlaceholderEmail:`name@company.com`,formPlaceholderPhone:`例如：+86 138 0000 0000`,formPlaceholderMessage:`请填写目标产品、数量区间、认证要求、包装要求或目标市场。`,formSubmit:`发送询盘`,formSuccess:`询盘已提交，我们会尽快联系您。`,formError:`提交失败，请稍后重试。`,productCenterEyebrow:`产品目录`,productCenterTitle:`为海外采购评估整理的产品中心`,productCenterBody:`采用更清晰的目录结构，方便买家快速浏览分类、确认规格表达，并直接进入询盘。`,filterAll:`全部产品`,categoryTitle:`分类导航`,categoryBody:`按主要产品方向浏览，并快速索取对应报价或技术资料。`,supportTitle:`项目支持`,supportItems:[`OEM 品牌化`,`零售包装`,`出口合规`,`样品验证`],requestPrice:`获取报价`,details:`立即询盘`,customTitle:`需要定制化项目？`,customBody:`我们支持结构、包装、Logo、说明书与目标市场要求的整体协调，适合长期产品项目合作。`,contactOem:`联系 OEM 团队`,factoryHeroEyebrow:`生产体系`,factoryHeroTitle:`从产线规划到出口出货的工业化执行能力`,factoryHeroBody:`乔天企业围绕可重复性、检验纪律和务实沟通组织制造，让全球采购团队更有把握推进合作。`,factoryStats:[{value:`12`,label:`条生产线`},{value:`50+`,label:`工程与质检人员`},{value:`98%`,label:`准时交付目标`},{value:`ISO`,label:`质量体系准备`}],galleryCaptions:[{title:`核心生产区域`,body:`围绕效率和一致性组织装配与测试流程。`},{title:`品质检验`,body:`通过过程与终检双重控制降低批次风险。`},{title:`包装与出货`,body:`让包装和发运节奏与品牌交付要求保持同步。`}],qualityTitle:`三层交付保障机制`,qualityCards:[{step:`01`,title:`来料控制`,body:`材料、连接器、芯片和包装物料在进入生产前完成基础检查。`},{step:`02`,title:`过程监控`,body:`组装、焊接与充电测试等关键环节做在线监控，避免缺陷继续流入后段。`},{step:`03`,title:`出货放行`,body:`通过终检与出货确认保持大货批次的一致性和可控性。`}],factoryCtaTitle:`用工厂型思路规划你的下一次采购项目`,factoryCtaBody:`我们可以协助评估产品匹配、排产安排和交付时间，帮助你更快推进合作。`,aboutEyebrow:`品牌故事`,aboutTitle:`为长期合作而建立的出口制造团队`,aboutBody:`乔天企业专注务实的制造能力建设，在产品、质量和交付三个维度维持稳定协作能力。`,timelineTitle:`发展节点`,timeline:[{year:`2009`,title:`从线材工程起步`,body:`公司从解决核心配件需求开始，逐步积累 3C 配件制造能力。`},{year:`2016`,title:`扩展为一体化生产体系`,body:`将组装、质检与包装整合为更适合规模化交付的制造系统。`},{year:`至今`,title:`服务全球采购项目`,body:`持续为品牌、分销商与零售渠道提供可重复、可交付的出口执行支持。`}],contactEyebrow:`联系我们`,contactTitle:`告诉我们你的需求，我们会给出可执行的供货方向`,contactBody:`无论是报价、样品、OEM 需求、目标市场要求还是产品匹配，都可以通过表单直接发起，我们会用务实的方式回复。`,responseTitle:`响应承诺`,responseBody:`大多数询盘会在 1 个工作日内获得回复。`,directChannels:`直接联系`,hubTitle:`工厂与办公基地`,hubBody:`产品沟通、样品安排、批量生产与出口交付在同一协同体系中推进，减少中间断点。`,contactChecklist:[`目标产品或 SKU`,`数量区间 / MOQ 预期`,`目标市场`,`认证或包装要求`],privacyEyebrow:`隐私政策`,privacyTitle:`以正式方式处理商务联系信息`,privacyBody:`我们仅在支持沟通、报价、交付协同和服务改进所必需的范围内收集与使用商务联系信息。`,privacySections:[{title:`1. 我们接收的信息`,body:`当你联系我们时，我们可能会接收姓名、公司、邮箱、电话以及询盘内容等信息。`},{title:`2. 信息用途`,body:`这些信息主要用于回复询盘、准备报价、支持样品沟通以及推进后续合作。`},{title:`3. 保护措施`,body:`我们通过合理管理、访问限制与流程控制来降低信息使用风险。`},{title:`4. 联系方式`,body:`如果你对数据处理方式有疑问，可以通过本站联系方式与我们沟通。`}],footerBody:`面向品牌、分销与全球采购团队的工业级 3C 配件制造服务。`,footerNavTitle:`站点导航`,footerCapabilityTitle:`能力范围`,footerContactTitle:`联系方式`,footerCapabilityLinks:[`OEM / ODM`,`工厂生产`,`质量控制`,`出口交付`],footerRights:`© 2026 乔天企业 版权所有。`}},s=[{id:`cable-1`,slug:`pro-series-100w-pd-cable`,name:{en:`Pro-Series 100W PD Cable`,cn:`Pro 系列 100W PD 数据线`},summary:{en:`Braided fast-charging cable prepared for export programs and premium accessory lines.`,cn:`面向出口项目与高端配件线的编织快充数据线。`},tags:[`Cable`,`PD 100W`],image:`/stitch_/product_center_desktop/product-1.png`},{id:`charger-1`,slug:`65w-gan-triple-port-charger`,name:{en:`65W GaN Triple-Port Charger`,cn:`65W 氮化镓三口充电器`},summary:{en:`Compact high-efficiency charging solution for travel, retail, and channel programs.`,cn:`适合差旅、零售与渠道项目的高效率便携充电方案。`},tags:[`Charger`,`GaN`],image:`/stitch_/product_center_desktop/product-2.png`},{id:`hub-1`,slug:`masterhub-8-in-1-dock`,name:{en:`MasterHub 8-in-1 Dock`,cn:`MasterHub 8 合 1 扩展坞`},summary:{en:`Structured multi-port docking solution for modern office and retail accessory programs.`,cn:`适合办公与零售配件项目的多接口扩展方案。`},tags:[`Hub`,`4K HDMI`],image:`/stitch_/product_center_desktop/product-3.png`},{id:`cable-2`,slug:`mfi-certified-cable`,name:{en:`MFi Certified Cable`,cn:`MFi 认证数据线`},summary:{en:`A compatibility-focused premium option for structured iOS accessory programs.`,cn:`面向 iOS 配件项目的高兼容性线材方案。`},tags:[`Cable`,`MFi`],image:`/stitch_/product_center_desktop/product-4.png`},{id:`adapter-1`,slug:`ultra-slim-usbc-adapter`,name:{en:`Ultra-Slim USB-C Adapter`,cn:`超薄 USB-C 转接器`},summary:{en:`Minimal-footprint adapter solution for channel packaging and daily business use.`,cn:`适合渠道包装与日常商务配套的紧凑型转接器。`},tags:[`Adapter`,`USB 3.2`],image:`/stitch_/product_center_desktop/product-5.png`},{id:`charger-2`,slug:`140w-desktop-power-station`,name:{en:`140W Desktop Power Station`,cn:`140W 桌面多口充电站`},summary:{en:`High-power desktop charging product for workstation bundles and premium retail lines.`,cn:`适合桌面工作场景与高端零售线的多口供电产品。`},tags:[`Charger`,`140W`],image:`/stitch_/product_center_desktop/product-6.png`}],c=[{route:`home`,label:`home`},{route:`product-center`,label:`productCenter`},{route:`factory-strength`,label:`factoryStrength`},{route:`about`,label:`about`},{route:`contact`,label:`contact`},{route:`privacy`,label:`privacy`}],l={route:u(),site:null,locale:`cn`,submitting:!1};function u(){let e=location.hash.replace(/^#\/?/,``)||`home`;return e===`product-center`||e===`factory-strength`||e===`about`||e===`contact`||e===`privacy`?e:`home`}function d(){return o[l.locale]}function f(e){return e?typeof e==`string`?e:e[l.locale]||e.en||e.cn||``:``}function p(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function m(e,t){return l.site?.images?.[e]||t}function h(e,t,n){return f(l.site?.sections?.[e]?.[t])||n}function g(){return(l.site?.products?.length?l.site.products:s).map((e,t)=>({...e,image:e.image||s[t%s.length].image}))}function _(){return f(l.site?.hero?.title)||d().heroTitle}function v(){return f(l.site?.hero?.body)||d().heroBody}function y(e){let t=(e.tags||[]).join(` `).toLowerCase();return t.includes(`charger`)?l.locale===`cn`?`充电器`:`Chargers`:t.includes(`hub`)||t.includes(`adapter`)?l.locale===`cn`?`扩展与转接`:`Hubs & Adapters`:l.locale===`cn`?`数据线`:`Cables`}function b(e){let t=e.map(e=>y(e));return[d().filterAll,...new Set(t)]}function x(e){return`
    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="site-brand" href="#/home">
          <span class="site-brand__cn">${l.locale===`cn`?`乔天企业`:`Qiaotian`}</span>
          <span class="site-brand__en">${l.locale===`cn`?`Qiaotian Enterprise`:`Enterprise`}</span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${c.map(t=>`
                <a class="site-nav__link ${t.route===e?`is-active`:``}" href="#/${t.route}">
                  ${d().nav[t.label]}
                </a>
              `).join(``)}
        </nav>
        <button id="lang-toggle" class="site-lang" type="button">${d().langToggle}</button>
      </div>
    </header>
  `}function S(){let e=l.site?.contact;return`
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="site-footer__brand-block">
          <div class="site-brand site-brand--footer">
            <span class="site-brand__cn">${l.locale===`cn`?`乔天企业`:`Qiaotian`}</span>
            <span class="site-brand__en">${l.locale===`cn`?`Qiaotian Enterprise`:`Enterprise`}</span>
          </div>
          <p class="site-footer__text">${d().footerBody}</p>
        </div>
        <div class="site-footer__column">
          <h4>${d().footerNavTitle}</h4>
          ${c.map(e=>`<a href="#/${e.route}">${d().nav[e.label]}</a>`).join(``)}
        </div>
        <div class="site-footer__column">
          <h4>${d().footerCapabilityTitle}</h4>
          ${d().footerCapabilityLinks.map(e=>`<span>${e}</span>`).join(``)}
        </div>
        <div class="site-footer__column">
          <h4>${d().footerContactTitle}</h4>
          <span>${p(l.site?.contact?.email||`sales@qiaotian.com`)}</span>
          <span>${p(l.site?.contact?.phone||`+86 138 0000 0000`)}</span>
          <span>${p(f(e?.address)||`Shenzhen, China`)}</span>
        </div>
      </div>
      <div class="shell site-footer__bottom">${d().footerRights}</div>
    </footer>
  `}function C(){let e=g().slice(0,3),t=l.site?.contact;a.innerHTML=`
    <div class="site-page">
      ${x(`home`)}
      <main>
        <section class="hero hero--home">
          <div class="hero__media">
            <img src="${m(`homeHero`,`/stitch_/homepage_desktop/screen.png`)}" alt="Qiaotian manufacturing" />
          </div>
          <div class="hero__veil"></div>
          <div class="shell hero__content">
            <div class="hero__copy">
              <span class="eyebrow eyebrow--light">${d().heroEyebrow}</span>
              <h1>${p(_())}</h1>
              <p>${p(v())}</p>
              <div class="hero__highlights">
                ${d().heroHighlights.map(e=>`<span>${e}</span>`).join(``)}
              </div>
              <div class="hero__actions">
                <a class="button button--primary" href="#/product-center">${d().heroPrimary}</a>
                <a class="button button--secondary-light" href="#/contact">${d().heroSecondary}</a>
              </div>
            </div>
            <aside class="hero__panel">
              <span class="hero__panel-label">${d().trustTitle}</span>
              <div class="hero__metrics">
                ${d().metrics.map(e=>`
                      <div class="hero__metric">
                        <strong>${e.value}</strong>
                        <span>${e.label}</span>
                      </div>
                    `).join(``)}
              </div>
              <div class="hero__panel-note">
                <strong>${d().heroSideTitle}</strong>
                <ul>
                  ${d().heroSideList.map(e=>`<li>${e}</li>`).join(``)}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section class="trust-strip">
          <div class="shell trust-strip__inner">
            ${d().trustMarks.map(e=>`<span>${e}</span>`).join(``)}
          </div>
          <div class="shell trade-strip">
            ${d().tradeSignals.map(e=>`<span>${e}</span>`).join(``)}
          </div>
        </section>

        <section class="section section--light">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${d().featureEyebrow}</span>
                <h2>${d().featureTitle}</h2>
              </div>
              <p>${d().featureBody}</p>
            </div>
            <div class="section-ribbon">
              <span>${l.locale===`cn`?`适合进口商、分销商、品牌方与零售渠道`:`Built for importers, distributors, brands, and retail channels`}</span>
            </div>
            <div class="product-grid">
              ${e.map(t=>`
                    <article class="product-card">
                      <div class="product-card__image">
                        <img src="${t.image}" alt="${p(f(t.name))}" />
                      </div>
                      <div class="product-card__body">
                        <span class="card-tag">${y(t)}</span>
                        <div class="product-card__index">0${e.indexOf(t)+1}</div>
                        <h3>${p(f(t.name))}</h3>
                        <p>${p(f(t.summary))}</p>
                        <div class="product-card__specs">
                          <span>${l.locale===`cn`?`支持打样`:`Sample Ready`}</span>
                          <span>${l.locale===`cn`?`支持私牌`:`Private Label`}</span>
                        </div>
                        <div class="product-card__foot">
                          <div class="pill-row">
                            ${(t.tags||[]).slice(0,2).map(e=>`<span class="pill">${p(e)}</span>`).join(``)}
                          </div>
                          <a class="text-link" href="#/contact">${d().details}</a>
                        </div>
                      </div>
                    </article>
                  `).join(``)}
            </div>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell split-section">
            <div class="split-section__media">
              <img src="${m(`factoryGalleryMain`,`/stitch_/factory_strength_desktop/screen.png`)}" alt="Factory strength" />
              <div class="stat-badge">
                <strong>${l.locale===`cn`?`50万+`:`500K+`}</strong>
                <span>${l.locale===`cn`?`月产能规模`:`Monthly output capacity`}</span>
              </div>
            </div>
            <div class="split-section__content">
              <span class="eyebrow">${d().factoryEyebrow}</span>
              <h2>${d().factoryTitle}</h2>
              <p>${d().factoryBody}</p>
              <div class="advantage-list">
                ${d().factoryPoints.map(e=>`
                      <article class="advantage-card">
                        <h3>${e.title}</h3>
                        <p>${e.body}</p>
                      </article>
                    `).join(``)}
              </div>
              <a class="button button--dark" href="#/factory-strength">${d().nav.factoryStrength}</a>
            </div>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${d().valueEyebrow}</span>
                <h2>${d().valueTitle}</h2>
              </div>
              <p>${d().valueBody}</p>
            </div>
            <div class="value-grid">
              ${d().valueCards.map(e=>`
                    <article class="value-card">
                      <span class="value-card__line"></span>
                      <h3>${e.title}</h3>
                      <p>${e.body}</p>
                    </article>
                  `).join(``)}
            </div>
          </div>
        </section>

        <section class="section section--certificate">
          <div class="shell section-head section-head--stack">
            <span class="eyebrow">${d().certificateEyebrow}</span>
            <h2>${d().certificateTitle}</h2>
            <p>${d().certificateBody}</p>
          </div>
          <div class="shell certificate-wall">
            <span>ISO</span>
            <span>CE</span>
            <span>FCC</span>
            <span>RoHS</span>
            <span>UL</span>
          </div>
        </section>

        <section class="section section--contact">
          <div class="shell inquiry-layout">
            <div class="inquiry-copy">
              <span class="eyebrow eyebrow--light">${d().procurementEyebrow}</span>
              <h2>${d().procurementTitle}</h2>
              <p>${d().procurementBody}</p>
              <div class="contact-points">
                <div>
                  <small>Email</small>
                  <strong>${p(t?.email||`sales@qiaotian.com`)}</strong>
                </div>
                <div>
                  <small>${l.locale===`cn`?`电话`:`Phone`}</small>
                  <strong>${p(t?.phone||`+86 138 0000 0000`)}</strong>
                </div>
                <div>
                  <small>${l.locale===`cn`?`地址`:`Address`}</small>
                  <strong>${p(f(t?.address)||`Shenzhen, China`)}</strong>
                </div>
              </div>
            </div>
            <div class="inquiry-card">
              ${k()}
            </div>
          </div>
        </section>
      </main>
      ${S()}
    </div>
  `}function w(){let e=g(),t=b(e);a.innerHTML=`
    <div class="site-page">
      ${x(`product-center`)}
      <main>
        <section class="page-hero page-hero--light">
          <div class="shell page-hero__grid">
            <div>
              <span class="eyebrow">${d().productCenterEyebrow}</span>
              <h1>${d().productCenterTitle}</h1>
            </div>
            <p>${d().productCenterBody}</p>
          </div>
        </section>

        <section class="section section--light section--tight-top">
          <div class="shell catalog-layout">
            <aside class="catalog-sidebar">
              <div class="sidebar-card">
                <span class="eyebrow">${d().categoryTitle}</span>
                <h3>${d().categoryTitle}</h3>
                <p>${d().categoryBody}</p>
                <div class="category-list">
                  ${t.map(e=>`<span class="category-chip">${p(e)}</span>`).join(``)}
                </div>
              </div>
              <div class="sidebar-card sidebar-card--dark">
                <span class="eyebrow eyebrow--light">${d().supportTitle}</span>
                <h3>${d().supportTitle}</h3>
                <ul class="support-list">
                  ${d().supportItems.map(e=>`<li>${e}</li>`).join(``)}
                </ul>
              </div>
            </aside>
            <div class="catalog-main">
              <div class="catalog-intro-card">
                <strong>${l.locale===`cn`?`目录说明`:`Catalog Note`}</strong>
                <p>${l.locale===`cn`?`以下产品以出口配套、批量采购与品牌化需求为导向，便于快速筛选和询盘。`:`The following products are presented for export support, bulk sourcing, and branded accessory programs.`}</p>
              </div>
              <div class="catalog-grid">
                ${e.map(e=>`
                      <article class="catalog-card">
                        <div class="catalog-card__image">
                          <img src="${e.image}" alt="${p(f(e.name))}" />
                        </div>
                        <div class="catalog-card__body">
                          <span class="card-tag">${y(e)}</span>
                          <div class="catalog-card__topline">${l.locale===`cn`?`出口项目系列`:`Export Program Series`}</div>
                          <h3>${p(f(e.name))}</h3>
                          <p>${p(f(e.summary))}</p>
                          <div class="pill-row">
                            ${(e.tags||[]).slice(0,2).map(e=>`<span class="pill">${p(e)}</span>`).join(``)}
                          </div>
                          <div class="catalog-card__actions">
                            <div class="catalog-card__signal">
                              <span>${l.locale===`cn`?`支持打样 / 报价 / 私牌定制`:`Sample / Quote / Private Label Ready`}</span>
                            </div>
                            <a class="button button--outline" href="#/contact">${d().details}</a>
                          </div>
                        </div>
                      </article>
                    `).join(``)}
              </div>
            </div>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell cta-panel">
            <div>
              <span class="eyebrow">${d().customTitle}</span>
              <h2>${d().customTitle}</h2>
              <p>${d().customBody}</p>
            </div>
            <div class="cta-panel__actions">
              <a class="button button--dark" href="#/contact">${d().contactOem}</a>
              <a class="button button--outline-dark" href="#/contact">${d().requestPrice}</a>
            </div>
          </div>
        </section>
      </main>
      ${S()}
    </div>
  `}function T(){let e=d().factoryStats;a.innerHTML=`
    <div class="site-page">
      ${x(`factory-strength`)}
      <main>
        <section class="page-hero page-hero--dark">
          <div class="hero__media">
            <img src="${m(`factoryHero`,`/stitch_/factory_strength_desktop/screen.png`)}" alt="Factory floor" />
          </div>
          <div class="hero__veil"></div>
          <div class="shell page-hero__stack">
            <span class="eyebrow eyebrow--light">${d().factoryHeroEyebrow}</span>
            <h1>${h(`factory`,`heroTitle`,d().factoryHeroTitle)}</h1>
            <p>${h(`factory`,`heroBody`,d().factoryHeroBody)}</p>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell stat-grid">
            ${e.map(e=>`
                  <article class="stat-card">
                    <strong>${e.value}</strong>
                    <span>${e.label}</span>
                  </article>
                `).join(``)}
          </div>
        </section>

        <section class="section section--light section--tight-top">
          <div class="shell gallery-grid">
            <article class="gallery-card gallery-card--wide">
              <img src="${m(`factoryGalleryMain`,`/stitch_/factory_strength_desktop/screen.png`)}" alt="Production line" />
              <div class="gallery-card__caption">
                <h3>${d().galleryCaptions[0].title}</h3>
                <p>${d().galleryCaptions[0].body}</p>
              </div>
            </article>
            <article class="gallery-card">
              <img src="${m(`factoryGallerySecondary`,`/stitch_/contact_us_desktop/screen.png`)}" alt="Quality inspection" />
              <div class="gallery-card__caption">
                <h3>${d().galleryCaptions[1].title}</h3>
                <p>${d().galleryCaptions[1].body}</p>
              </div>
            </article>
            <article class="gallery-card">
              <img src="${m(`factoryGalleryThird`,`/stitch_/about_us_mobile/screen.png`)}" alt="Packing zone" />
              <div class="gallery-card__caption">
                <h3>${d().galleryCaptions[2].title}</h3>
                <p>${d().galleryCaptions[2].body}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${d().qualityTitle}</span>
                <h2>${d().qualityTitle}</h2>
              </div>
            </div>
            <div class="quality-grid">
              ${d().qualityCards.map(e=>`
                    <article class="quality-card">
                      <span class="quality-card__step">${e.step}</span>
                      <h3>${e.title}</h3>
                      <p>${e.body}</p>
                    </article>
                  `).join(``)}
            </div>
          </div>
        </section>

        <section class="section section--contact">
          <div class="shell cta-banner">
            <div>
              <span class="eyebrow eyebrow--light">${d().factoryHeroEyebrow}</span>
              <h2>${d().factoryCtaTitle}</h2>
              <p>${d().factoryCtaBody}</p>
            </div>
            <a class="button button--primary" href="#/contact">${d().heroSecondary}</a>
          </div>
        </section>
      </main>
      ${S()}
    </div>
  `}function E(){a.innerHTML=`
    <div class="site-page">
      ${x(`about`)}
      <main>
        <section class="page-hero page-hero--dark page-hero--about">
          <div class="hero__media">
            <img src="${m(`aboutHero`,`/stitch_/about_us_mobile/screen.png`)}" alt="About Qiaotian" />
          </div>
          <div class="hero__veil"></div>
          <div class="shell page-hero__stack">
            <span class="eyebrow eyebrow--light">${d().aboutEyebrow}</span>
            <h1>${h(`about`,`heroTitle`,d().aboutTitle)}</h1>
            <p>${h(`about`,`heroBody`,d().aboutBody)}</p>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell timeline-layout">
            <div class="timeline-layout__intro">
              <span class="eyebrow">${d().timelineTitle}</span>
              <h2>${d().timelineTitle}</h2>
              <p>${d().valueBody}</p>
            </div>
            <div class="timeline-list">
              ${d().timeline.map(e=>`
                    <article class="timeline-card">
                      <span class="timeline-card__year">${e.year}</span>
                      <h3>${e.title}</h3>
                      <p>${e.body}</p>
                    </article>
                  `).join(``)}
            </div>
          </div>
        </section>

        <section class="section section--slate">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${d().valueEyebrow}</span>
                <h2>${d().valueTitle}</h2>
              </div>
            </div>
            <div class="value-grid">
              ${d().valueCards.map(e=>`
                    <article class="value-card value-card--light">
                      <span class="value-card__line"></span>
                      <h3>${e.title}</h3>
                      <p>${e.body}</p>
                    </article>
                  `).join(``)}
            </div>
          </div>
        </section>
      </main>
      ${S()}
    </div>
  `}function D(){let e=l.site?.contact;a.innerHTML=`
    <div class="site-page">
      ${x(`contact`)}
      <main>
        <section class="page-hero page-hero--light">
          <div class="shell page-hero__grid">
            <div>
              <span class="eyebrow">${d().contactEyebrow}</span>
              <h1>${h(`contact`,`heroTitle`,d().contactTitle)}</h1>
            </div>
            <p>${h(`contact`,`heroBody`,d().contactBody)}</p>
          </div>
        </section>

        <section class="section section--light section--tight-top">
          <div class="shell contact-layout">
            <div class="contact-card">
              <div class="contact-card__head">
                <span class="eyebrow">${d().responseTitle}</span>
                <h2>${d().directChannels}</h2>
                <p>${d().responseBody}</p>
              </div>
              <div class="contact-badge-row">
                <span>OEM</span>
                <span>ODM</span>
                <span>${l.locale===`cn`?`出口交付`:`Export Delivery`}</span>
              </div>
              <div class="contact-quote">
                <p>${l.locale===`cn`?`我们更适合重视交付纪律、认证准备与长期合作节奏的客户。`:`Best suited for buyers who value disciplined delivery, certification readiness, and long-term cooperation.`}</p>
              </div>
              <div class="contact-checklist">
                ${d().contactChecklist.map(e=>`<span>${e}</span>`).join(``)}
              </div>
              <div class="contact-detail-list">
                <div>
                  <small>Email</small>
                  <strong>${p(e?.email||`sales@qiaotian.com`)}</strong>
                </div>
                <div>
                  <small>${l.locale===`cn`?`电话`:`Phone`}</small>
                  <strong>${p(e?.phone||`+86 138 0000 0000`)}</strong>
                </div>
                <div>
                  <small>${l.locale===`cn`?`地址`:`Address`}</small>
                  <strong>${p(f(e?.address)||`Shenzhen, China`)}</strong>
                </div>
              </div>
              <div class="contact-service-panel">
                <span>${l.locale===`cn`?`可支持事项`:`What We Can Support`}</span>
                <p>${l.locale===`cn`?`产品推荐、样品安排、私牌定制、认证准备、包装配套与批量报价。`:`Product matching, sampling, private label support, certification preparation, packaging coordination, and bulk quotations.`}</p>
              </div>
              <div class="contact-map">
                <img src="${m(`contactMap`,`/stitch_/contact_us_desktop/screen.png`)}" alt="Office and factory" />
              </div>
              <div class="contact-note">
                <h3>${d().hubTitle}</h3>
                <p>${d().hubBody}</p>
              </div>
            </div>
            <div class="inquiry-card inquiry-card--light">
              ${k()}
            </div>
          </div>
        </section>
      </main>
      ${S()}
    </div>
  `,j()}function O(){a.innerHTML=`
    <div class="site-page">
      ${x(`privacy`)}
      <main>
        <section class="page-hero page-hero--dark page-hero--legal">
          <div class="shell page-hero__stack">
            <span class="eyebrow eyebrow--light">${d().privacyEyebrow}</span>
            <h1>${h(`privacy`,`heroTitle`,d().privacyTitle)}</h1>
            <p>${h(`privacy`,`heroBody`,d().privacyBody)}</p>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell legal-layout">
            ${d().privacySections.map(e=>`
                  <article class="legal-card">
                    <h2>${e.title}</h2>
                    <p>${e.body}</p>
                  </article>
                `).join(``)}
          </div>
        </section>
      </main>
      ${S()}
    </div>
  `}function k(){return`
    <form id="lead-form" class="lead-form">
      <div class="form-grid">
        <label>
          <span>${d().fullName}</span>
          <input name="name" placeholder="${d().formPlaceholderName}" required />
        </label>
        <label>
          <span>${d().companyName}</span>
          <input name="company" placeholder="${d().formPlaceholderCompany}" required />
        </label>
        <label>
          <span>${d().workEmail}</span>
          <input name="email" type="email" placeholder="${d().formPlaceholderEmail}" required />
        </label>
        <label>
          <span>${d().phone}</span>
          <input name="phone" placeholder="${d().formPlaceholderPhone}" required />
        </label>
        <label class="form-grid__full">
          <span>${d().projectDetails}</span>
          <textarea name="message" rows="5" placeholder="${d().formPlaceholderMessage}" required></textarea>
        </label>
      </div>
      <button class="button button--primary button--block" type="submit">${l.submitting?`...`:d().formSubmit}</button>
      <p id="lead-form-feedback" class="form-feedback"></p>
    </form>
  `}function A(){document.querySelector(`#lang-toggle`)?.addEventListener(`click`,()=>{l.locale=l.locale===`cn`?`en`:`cn`,N()})}function j(){document.querySelector(`#lead-form`)?.addEventListener(`submit`,async e=>{if(e.preventDefault(),l.submitting)return;l.submitting=!0,N();let t=document.querySelector(`#lead-form`),n=document.querySelector(`#lead-form-feedback`);if(!t)return;let i=Object.fromEntries(new FormData(t).entries());try{await r(i),n&&(n.textContent=d().formSuccess,n.className=`form-feedback is-success`),t.reset()}catch{n&&(n.textContent=d().formError,n.className=`form-feedback is-error`)}finally{l.submitting=!1;let e=document.querySelector(`#lead-form button[type="submit"]`);e&&(e.textContent=d().formSubmit)}})}async function M(){l.site=(await n()).site}function N(){l.route=u(),l.route===`product-center`?w():l.route===`factory-strength`?T():l.route===`about`?E():l.route===`contact`?D():l.route===`privacy`?O():C(),A(),(l.route===`home`||l.route===`contact`)&&j()}async function P(){await M(),N()}window.addEventListener(`hashchange`,()=>N()),P().catch(e=>{console.error(e),a.innerHTML=`<pre>${p(e instanceof Error?e.message:String(e))}</pre>`});