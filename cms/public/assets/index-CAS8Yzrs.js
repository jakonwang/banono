(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=``.replace(/\/$/,``);async function t(t,n={}){let r=await fetch(`${e}${t}`,{cache:`no-store`,...n,headers:{Accept:`application/json`,...n.headers||{}}});if(!r.ok)throw Error(`CMS request failed: ${t}`);return r.json()}async function n(){return{site:await t(`/api/public/site`)}}async function r(t){let n=await fetch(`${e}/api/public/inquiry`,{method:`POST`,cache:`no-store`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok){let e=n.headers.get(`content-type`)||``,t=``;try{if(e.includes(`application/json`)){let e=await n.json();t=e?.error?.message||e?.message||e?.data?.message||JSON.stringify(e)}else t=(await n.text()).trim()}catch{t=``}throw Error(t||`Failed to submit inquiry (${n.status})`)}}var i=document.querySelector(`#app`);if(!i)throw Error(`App root not found`);var a=i,o=[{id:`fallback-1`,name:{cn:`钢化膜方案`,en:`Tempered Glass Program`},summary:{cn:`适用于主流机型的屏幕保护产品。`,en:`Screen protection products for mainstream devices.`},tags:[`OEM`,`Hot`],image:`/site-assets/product-3d-glass.png`,categorySlug:`screen-protection`},{id:`fallback-2`,name:{cn:`保护壳方案`,en:`Protective Case Program`},summary:{cn:`支持材质、颜色与品牌定制。`,en:`Supports material, color, and brand customization.`},tags:[`Custom`,`Case`],image:`/site-assets/product-phone-case.png`,categorySlug:`protective-cases`},{id:`fallback-3`,name:{cn:`镜头配件方案`,en:`Lens Accessory Program`},summary:{cn:`面向高端机型的镜头防护与配件。`,en:`Lens protection and accessory solutions for premium devices.`},tags:[`Camera`,`Protection`],image:`/site-assets/product-lens-film.jpg`,categorySlug:`camera-accessories`}],s={en:{nav:{home:`Home`,oem:`OEM / ODM`,productCenter:`Product Center`,factoryStrength:`Factory Strength`,about:`About Us`,contact:`Contact`,privacy:`Privacy Policy`},langToggle:`EN / CN`,heroEyebrow:`Industrial Manufacturing Partner`,heroTitle:`Premium 3C accessories engineered for global sourcing programs`,heroBody:`Qiaotian Enterprise supports OEM, ODM, and export delivery with disciplined manufacturing, reliable quality control, and a clear commercial response process.`,heroPrimary:`Explore Products`,heroSecondary:`Start Inquiry`,trustTitle:`Trusted by procurement teams that care about consistency, certification, and delivery discipline.`,metrics:[{value:`15+`,label:`Years in export manufacturing`},{value:`500K+`,label:`Monthly production capacity`},{value:`40+`,label:`Countries and regions served`},{value:`24H`,label:`Technical response commitment`}],heroHighlights:[`OEM / ODM Programs`,`Export-grade QC`,`Retail-ready Packaging`],heroSideTitle:`Manufacturing Notes`,featureEyebrow:`Featured Range`,featureTitle:`Product lines prepared for B2B sourcing and export programs`,featureBody:`Our catalog focuses on charging, connectivity, and accessory essentials that are easier to quote, sample, certify, pack, and scale for overseas buyers.`,trustMarks:[`OEM / ODM`,`CE / RoHS / FCC`,`Factory Direct`,`Export Delivery`,`Retail Packaging`],factoryEyebrow:`Factory Capability`,factoryTitle:`A factory system designed for repeatable delivery`,factoryBody:`Production, quality inspection, packaging, and shipment coordination work as one operating system so your sourcing plan stays predictable.`,factoryPoints:[{title:`Certification Ready`,body:`Product and process preparation aligned with CE, RoHS, FCC, and common market-entry requirements.`},{title:`OEM / ODM Coordination`,body:`Tooling, logo, packaging, labeling, inserts, and sample confirmation managed in one commercial track.`},{title:`Delivery Rhythm`,body:`Scheduling, inspection, and shipment coordination reduce avoidable delay and batch inconsistency.`}],valueEyebrow:`Why Qiaotian`,valueTitle:`A commercial partner built for long-cycle cooperation`,valueBody:`We combine engineering, production discipline, and export coordination to support brands and distributors beyond one-off orders.`,valueCards:[{title:`Engineering Precision`,body:`Signal integrity, charging safety, and material consistency are controlled from concept to release.`},{title:`Factory Transparency`,body:`Capacity, lead time, and inspection checkpoints stay clear enough for practical sourcing decisions.`},{title:`Commercial Reliability`,body:`We optimize around repeat orders, stable programs, and long-term supply relationships.`}],certificateEyebrow:`Quality Standards`,certificateTitle:`International compliance and manufacturing confidence`,certificateBody:`Aligned with the certifications, testing expectations, and export discipline global buyers expect.`,procurementEyebrow:`Start A Project`,procurementTitle:`Request quotation, samples, or a private-label proposal`,procurementBody:`Tell us your target product, quantity range, destination market, certification needs, and packaging expectation. We will reply with a workable sourcing direction.`,fullName:`Full Name`,companyName:`Company Name`,workEmail:`Work Email`,phone:`Phone / WhatsApp`,projectDetails:`Project Details`,formPlaceholderName:`e.g. John Smith`,formPlaceholderCompany:`e.g. Global Trade Ltd.`,formPlaceholderEmail:`name@company.com`,formPlaceholderPhone:`e.g. +1 555 000 1234`,formPlaceholderMessage:`Share product target, volume, certifications, packaging, or market requirements.`,formSubmit:`Send Inquiry`,formSuccess:`Inquiry submitted successfully. We will contact you soon.`,formError:`Submission failed. Please try again later.`,productCenterEyebrow:`Product Catalog`,productCenterTitle:`Product center built for overseas sourcing review`,productCenterBody:`A cleaner catalog structure for buyers who need quick category scanning, specification confidence, and direct inquiry entry.`,filterAll:`All Products`,categoryTitle:`Category Navigation`,categoryBody:`Browse major product directions and request the matching quotation or technical sheet.`,supportTitle:`Program Support`,supportItems:[`OEM branding`,`Retail packaging`,`Export compliance`,`Sample validation`],requestPrice:`Request Quotation`,details:`Send Inquiry`,customTitle:`Need a custom project?`,customBody:`We support structure, packaging, logo, insert, and market-specific requirement coordination for long-term product programs.`,contactOem:`Talk to OEM Team`,factoryHeroEyebrow:`Production System`,factoryHeroTitle:`Industrial execution from line planning to export dispatch`,factoryHeroBody:`Qiaotian builds manufacturing around repeatability, inspection discipline, and practical communication so global buyers can move with confidence.`,factoryStats:[{value:`12`,label:`Production lines`},{value:`50+`,label:`Engineering and QA staff`},{value:`98%`,label:`On-time delivery target`},{value:`ISO`,label:`Quality system ready`}],galleryCaptions:[{title:`Core Production Area`,body:`Assembly and testing organized around throughput and consistency.`},{title:`Inspection Control`,body:`In-process and final checks reduce batch risk before shipment.`},{title:`Packing & Dispatch`,body:`Packaging and dispatch stay aligned with brand delivery requirements.`}],qualityTitle:`Three layers of delivery assurance`,qualityCards:[{step:`01`,title:`Incoming Control`,body:`Materials, connectors, chips, and packaging inputs are checked before production starts.`},{step:`02`,title:`Process Monitoring`,body:`Assembly, soldering, and charging tests are monitored inline to stop defects from traveling downstream.`},{step:`03`,title:`Final Release`,body:`Final inspection and shipment confirmation keep mass production batches stable and controllable.`}],factoryCtaTitle:`Plan your next sourcing program with a factory-first approach`,factoryCtaBody:`We can help evaluate product fit, production arrangement, and delivery timing for your next project.`,aboutEyebrow:`Brand Story`,aboutTitle:`An export manufacturing team built for long-term cooperation`,aboutBody:`Qiaotian Enterprise focuses on practical manufacturing excellence and steady commercial collaboration across product, quality, and delivery.`,timelineTitle:`Milestones`,timeline:[{year:`2009`,title:`Started from cable engineering`,body:`The company began by solving core accessory requirements with a practical manufacturing mindset.`},{year:`2016`,title:`Expanded into integrated production`,body:`Assembly, quality control, and packaging were consolidated into a more scalable manufacturing system.`},{year:`Today`,title:`Serving global sourcing programs`,body:`Qiaotian supports brands, distributors, and retail channels with repeatable export execution.`}],contactEyebrow:`Contact Us`,contactTitle:`Tell us what you need and we will return with a workable supply direction`,contactBody:`Use the inquiry form for quotations, samples, OEM requests, target market requirements, or product matching. Our response style stays direct and commercially practical.`,responseTitle:`Response Commitment`,responseBody:`Most inquiries receive an answer within one business day.`,directChannels:`Direct Channels`,hubTitle:`Factory & Office Base`,hubBody:`Product discussion, sample arrangement, mass production, and export coordination run from one connected operating base.`,privacyEyebrow:`Privacy Policy`,privacyTitle:`Formal handling of business contact information`,privacyBody:`We only collect and use business inquiry information as needed to support communication, quotation, delivery coordination, and service improvement.`,privacySections:[{title:`1. Information We Receive`,body:`When you contact us, we may receive your name, company, email, phone number, and inquiry details.`},{title:`2. How We Use It`,body:`This information is used to answer inquiries, prepare quotations, support sampling, and advance business cooperation.`},{title:`3. Protection Measures`,body:`We apply reasonable management, access limitation, and process control to reduce the risk around stored information.`},{title:`4. Contact`,body:`If you have any question about data handling, please contact us through the information listed on this site.`}],footerBody:`Professional 3C accessories manufacturing for importers, distributors, retailers, and global procurement teams.`,footerNavTitle:`Navigation`,footerCapabilityTitle:`Capabilities`,footerContactTitle:`Contact`,footerCapabilityLinks:[`OEM / ODM`,`Factory Production`,`Quality Control`,`Export Delivery`],footerRights:`© 2026 Qiaotian Enterprise. All rights reserved.`},cn:{nav:{home:`首页`,oem:`OEM / ODM`,productCenter:`产品中心`,factoryStrength:`工厂实力`,about:`关于我们`,contact:`联系我们`,privacy:`隐私政策`},langToggle:`中 / EN`,heroEyebrow:`工业制造合作伙伴`,heroTitle:`面向全球采购项目的高端 3C 配件制造服务`,heroBody:`乔天企业围绕 OEM、ODM 与出口交付提供稳定制造、质量控制与清晰商业响应机制。`,heroPrimary:`查看产品`,heroSecondary:`发起询盘`,trustTitle:`服务重视一致性、认证能力与交付纪律的国际采购团队。`,metrics:[{value:`15+`,label:`年出口制造经验`},{value:`500K+`,label:`月产能规模`},{value:`40+`,label:`服务国家与地区`},{value:`24H`,label:`技术响应承诺`}],heroHighlights:[`OEM / ODM 项目`,`出口级质控`,`零售包装配套`],heroSideTitle:`制造要点`,featureEyebrow:`精选产品`,featureTitle:`面向 B2B 采购与出口项目整理的产品线`,featureBody:`我们的目录聚焦充电、连接与基础配件，更适合海外买家进行报价、打样、认证、包装和规模化交付。`,trustMarks:[`OEM / ODM`,`CE / RoHS / FCC`,`工厂直供`,`出口交付`,`零售包装`],factoryEyebrow:`工厂能力`,factoryTitle:`围绕稳定交付建立的工厂体系`,factoryBody:`生产、质检、包装与出货协同运转，让采购计划依赖流程和标准，而不是依赖运气。`,factoryPoints:[{title:`认证与合规准备`,body:`产品和流程可对接 CE、RoHS、FCC 等主要出口市场常见要求。`},{title:`OEM / ODM 协调`,body:`模具、Logo、包装、标签与样品确认在同一商业节奏中推进。`},{title:`交付节奏`,body:`排产、检验与发运协调减少不必要延误和批次波动。`}],valueEyebrow:`合作价值`,valueTitle:`面向长期项目协作建立的商业型制造伙伴`,valueBody:`我们把工程能力、生产纪律与出口协同结合在一起，服务的不只是一次性订单，而是长期合作项目。`,valueCards:[{title:`工程精度`,body:`从传输性能、充电安全到材料一致性，关键控制点贯穿方案到量产全流程。`},{title:`工厂透明`,body:`产能、交期与检验节点清晰可沟通，适合重视可预期性的采购团队。`},{title:`商业可靠`,body:`我们围绕持续补货、稳定项目与长期供货关系做优化。`}],certificateEyebrow:`质量标准`,certificateTitle:`面向国际市场的合规与制造信心`,certificateBody:`围绕全球买家关心的认证、测试要求和出口执行纪律进行准备与交付。`,procurementEyebrow:`开启合作`,procurementTitle:`获取报价、样品或自有品牌方案`,procurementBody:`告诉我们目标产品、数量区间、目标市场、认证要求和包装预期，我们会给出可执行的供货方向。`,fullName:`姓名`,companyName:`公司名称`,workEmail:`工作邮箱`,phone:`电话 / WhatsApp`,projectDetails:`项目需求`,formPlaceholderName:`例如：张先生`,formPlaceholderCompany:`例如：环球贸易有限公司`,formPlaceholderEmail:`name@company.com`,formPlaceholderPhone:`例如：+86 138 0000 0000`,formPlaceholderMessage:`请填写目标产品、数量区间、认证要求、包装要求或目标市场。`,formSubmit:`发送询盘`,formSuccess:`询盘已提交，我们会尽快联系您。`,formError:`提交失败，请稍后重试。`,productCenterEyebrow:`产品目录`,productCenterTitle:`为海外采购评估整理的产品中心`,productCenterBody:`采用更清晰的目录结构，方便买家快速浏览分类、确认规格表达，并直接进入询盘。`,filterAll:`全部产品`,categoryTitle:`分类导航`,categoryBody:`按主要产品方向浏览，并快速索取对应报价或技术资料。`,supportTitle:`项目支持`,supportItems:[`OEM 品牌化`,`零售包装`,`出口合规`,`样品验证`],requestPrice:`获取报价`,details:`立即询盘`,customTitle:`需要定制化项目？`,customBody:`我们支持结构、包装、Logo、说明书与目标市场要求的整体协调，适合长期产品项目合作。`,contactOem:`联系 OEM 团队`,factoryHeroEyebrow:`生产体系`,factoryHeroTitle:`从产线规划到出口发运的工业化执行能力`,factoryHeroBody:`乔天企业围绕可重复性、检验纪律与务实沟通组织制造，让全球采购团队更有把握推进合作。`,factoryStats:[{value:`12`,label:`条生产线`},{value:`50+`,label:`工程与质检人员`},{value:`98%`,label:`准时交付目标`},{value:`ISO`,label:`质量体系准备`}],galleryCaptions:[{title:`核心生产区域`,body:`围绕效率和一致性组织装配与测试流程。`},{title:`品质检验`,body:`通过过程与终检双重控制降低批次风险。`},{title:`包装与出货`,body:`让包装和发运节奏与品牌交付要求保持同步。`}],qualityTitle:`三层交付保障机制`,qualityCards:[{step:`01`,title:`来料控制`,body:`材料、连接器、芯片和包装物料在进入生产前完成基础检查。`},{step:`02`,title:`过程监控`,body:`组装、焊接与充电测试等关键环节做在线监控，避免缺陷继续流入后段。`},{step:`03`,title:`出货放行`,body:`通过终检与出货确认保持大货批次的一致性和可控性。`}],factoryCtaTitle:`用工厂型思路规划你的下一次采购项目`,factoryCtaBody:`我们可以协助评估产品匹配、排产安排和交付时间，帮助你更快推进合作。`,aboutEyebrow:`品牌故事`,aboutTitle:`为长期合作而建立的出口制造团队`,aboutBody:`乔天企业专注务实的制造能力建设，在产品、质量和交付三个维度维持稳定协作能力。`,timelineTitle:`发展节点`,timeline:[{year:`2009`,title:`从线材工程起步`,body:`公司从解决基础配件需求开始，逐步积累 3C 配件制造能力。`},{year:`2016`,title:`形成一体化制造体系`,body:`整合装配、质检与包装流程，形成更适合规模交付的体系。`},{year:`至今`,title:`服务全球采购项目`,body:`持续为品牌商、分销商与零售渠道提供稳定出口支持。`}],contactEyebrow:`联系我们`,contactTitle:`告诉我们你的需求，我们会给出可执行的供货方向`,contactBody:`无论是报价、样品、OEM 需求、目标市场要求还是产品匹配，都可以通过表单直接发起。`,responseTitle:`响应承诺`,responseBody:`大多数询盘会在 1 个工作日内获得回复。`,directChannels:`直接沟通`,hubTitle:`工厂与办公基地`,hubBody:`产品沟通、样品安排、量产与出口协同由同一套运营体系推进。`,privacyEyebrow:`隐私政策`,privacyTitle:`面向商业联系信息的正式处理方式`,privacyBody:`我们仅在支持沟通、报价、交付协同与服务改进所需范围内收集和使用业务信息。`,privacySections:[{title:`1. 我们接收的信息`,body:`当你联系我们时，我们可能会接收姓名、公司、邮箱、电话和询盘内容。`},{title:`2. 我们如何使用`,body:`这些信息用于回复询盘、准备报价、支持打样与推进合作。`},{title:`3. 保护措施`,body:`我们通过合理管理、访问限制与流程控制降低信息风险。`},{title:`4. 联系我们`,body:`如果你对数据处理有疑问，可通过网站中的联系方式与我们沟通。`}],footerBody:`面向进口商、分销商、零售商与全球采购团队的专业 3C 配件制造服务。`,footerNavTitle:`导航`,footerCapabilityTitle:`能力`,footerContactTitle:`联系`,footerCapabilityLinks:[`OEM / ODM`,`工厂生产`,`质量控制`,`出口交付`],footerRights:`© 2026 乔天企业。保留所有权利。`}},c=[{route:`home`,label:`home`},{route:`product-center`,label:`productCenter`},{route:`factory-strength`,label:`factoryStrength`},{route:`about`,label:`about`},{route:`contact`,label:`contact`},{route:`privacy`,label:`privacy`}],l={route:`home`,locale:`cn`,site:null,submitting:!1,mobileMenuOpen:!1,selectedCategoryId:``};function u(){let e=location.hash.replace(/^#\/?/,``)||`home`;return e===`product-center`||e===`factory-strength`||e===`about`||e===`contact`||e===`privacy`?e:`home`}function d(){return s[l.locale]}function f(e){return e?typeof e==`string`?e:e[l.locale]||e.en||e.cn||``:``}function p(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function m(e,t){return l.site?.images?.[e]||t}function h(e,t,n){return f(l.site?.sections?.[e]?.[t])||n}function g(e,t){return l.site?.brand?.[e]||t}function _(){let e=l.site?.stats?.filter(e=>e?.value&&f(e.label));return e?.length?e.map(e=>({value:e.value,label:f(e.label)})):d().metrics}function v(){let e=_().slice(0,3);return e.length?e.map(e=>e.label):d().heroHighlights}function y(){return l.locale===`cn`?`${g(`cn`,`乔天企业`)}围绕稳定交付、质量控制与出口协同服务全球采购项目。`:`${g(`en`,`Qiaotian Enterprise`)} supports global sourcing programs with stable delivery, quality control, and export coordination.`}function b(){let e=f(l.site?.contact?.address);return l.locale===`cn`?[l.site?.contact?.email?`邮箱：${l.site.contact.email}`:`邮箱与联系方式`,l.site?.contact?.phone?`电话：${l.site.contact.phone}`:`电话与即时沟通方式`,e?`地址：${e}`:`地址与来访信息`,`支持报价、打样、定制与批量交付沟通`]:[l.site?.contact?.email?`Email: ${l.site.contact.email}`:`Email and contact channel`,l.site?.contact?.phone?`Phone: ${l.site.contact.phone}`:`Phone and instant communication`,e?`Address: ${e}`:`Address and visiting information`,`Support for quotation, sampling, customization, and bulk delivery`]}function x(){return l.locale===`cn`?`支持产品匹配、报价、打样、品牌定制、包装协同与出口交付沟通。`:`Support for product matching, quotation, sampling, branding, packaging coordination, and export delivery.`}function S(){return(l.site?.products?.length?l.site.products:o).map((e,t)=>({...e,image:e.image||o[t%o.length].image}))}function C(){return f(l.site?.hero?.title)||d().heroTitle}function w(){return f(l.site?.hero?.body)||d().heroBody}function T(e){let t=l.site?.categories?.find(t=>t.id===e.categoryId||t.slug===e.categorySlug);if(t)return f(t.name)||t.id;let n=(e.tags||[]).join(` `).toLowerCase(),r=(e.categorySlug||``).toLowerCase();return r.includes(`screen`)||n.includes(`film`)?l.locale===`cn`?`屏幕保护`:`Screen Protection`:r.includes(`case`)||n.includes(`case`)?l.locale===`cn`?`保护壳`:`Protective Cases`:r.includes(`camera`)||n.includes(`camera`)?l.locale===`cn`?`镜头配件`:`Camera Accessories`:l.locale===`cn`?`配件方案`:`Accessory Program`}function E(e){let t=(l.site?.categories||[]).filter(e=>e.status!==`disabled`).sort((e,t)=>(e.sort||0)-(t.sort||0));return t.length?t:[...new Set(e.map(e=>T(e)))].map((e,t)=>({id:`fallback-${t}`,name:{cn:e,en:e}}))}function D(e){let t=new Set(e.map(e=>e.id));return e.filter(e=>!e.parentId||!t.has(e.parentId)).map(t=>{let n=e.filter(e=>e.parentId===t.id);return`
        <div class="category-group">
          <button class="category-chip category-chip--parent ${t.id===l.selectedCategoryId?`is-active`:``}" data-category-id="${p(t.id)}">
            ${p(f(t.name)||t.id)}
          </button>
          ${n.length?`
            <div class="category-children">
              ${n.map(e=>`
                    <button class="category-chip category-chip--child ${e.id===l.selectedCategoryId?`is-active`:``}" data-category-id="${p(e.id)}">
                      ${p(f(e.name)||e.id)}
                    </button>
                  `).join(``)}
            </div>
          `:``}
        </div>
      `}).join(``)}function O(e){return`
    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="site-brand" href="#/home">
          <span class="site-brand__en">${p(g(`en`,`Qiaotian Enterprise`))}</span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${c.map(t=>`
                <a class="site-nav__link ${t.route===e?`is-active`:``}" href="#/${t.route}">
                  ${d().nav[t.label]}
                </a>
              `).join(``)}
          <a class="site-nav__link" href="#customization">${d().nav.oem}</a>
        </nav>
        <div class="site-header__actions">
          <button id="lang-toggle" class="site-lang" type="button">${d().langToggle}</button>
          <button
            id="mobile-menu-toggle"
            class="site-menu-toggle"
            type="button"
            aria-expanded="${l.mobileMenuOpen?`true`:`false`}"
            aria-controls="mobile-site-nav"
            aria-label="${l.locale===`cn`?`打开菜单`:`Open menu`}"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div id="mobile-site-nav" class="mobile-nav ${l.mobileMenuOpen?`is-open`:``}">
        <div class="shell mobile-nav__inner">
          ${c.map(t=>`
                <a class="mobile-nav__link ${t.route===e?`is-active`:``}" href="#/${t.route}">
                  ${d().nav[t.label]}
                </a>
              `).join(``)}
          <a class="mobile-nav__link" href="#customization">${d().nav.oem}</a>
        </div>
      </div>
    </header>
  `}function k(){let e=l.site?.contact;return`
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="site-footer__brand-block">
          <div class="site-brand site-brand--footer">
            <span class="site-brand__en">${p(g(`en`,`Qiaotian Enterprise`))}</span>
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
  `}function A(){let e=S().slice(0,3),t=l.site?.contact,n=_(),r=v(),i=l.site?.home?.downloads||[],o=l.site?.home?.cases||[],s=l.site?.home?.testimonials||[],c=[{title:{cn:`演示目录样例（临时）`,en:`Demo Catalog Sample (Temporary)`},body:{cn:`仅用于前台版式预览，请在后台替换为正式产品目录。`,en:`For layout preview only. Replace with the approved product catalog in CMS.`},file:`/site-assets/demo-catalog.csv`}],u=[{title:{cn:`演示案例：屏幕保护产品方案`,en:`Demo Case: Screen Protection Program`},body:{cn:`临时版式示例，不代表真实客户项目；请替换为已授权案例。`,en:`Temporary layout sample, not a real customer project. Replace with an approved case.`},image:`/site-assets/product-3d-glass.png`},{title:{cn:`演示案例：品牌保护壳方案`,en:`Demo Case: Branded Protective Case`},body:{cn:`展示案例卡片样式的临时内容，请勿作为真实合作案例引用。`,en:`Temporary card preview. Do not present as a real customer engagement.`},image:`/site-assets/product-phone-case.png`}],h=[{quote:{cn:`演示评价文案：用于预览客户评价模块排版，不代表真实客户反馈。`,en:`Demo testimonial copy for layout preview only. This is not genuine customer feedback.`},author:{cn:`演示联系人`,en:`Demo Contact`},company:l.locale===`cn`?`演示内容，请替换`:`Demo content - replace before launch`}],g=i.length?i:c,b=o.length?o:u,x=s.length?s:h;a.innerHTML=`
    <div class="site-page">
      ${O(`home`)}
      <main>
        <section class="hero hero--home">
          <div class="hero__media">
            <img src="${m(`homeHero`,`/site-assets/office-1.jpg`)}" alt="Qiaotian manufacturing" />
          </div>
          <div class="hero__veil"></div>
          <div class="shell hero__content">
            <div class="hero__copy">
              <span class="eyebrow eyebrow--light">${d().heroEyebrow}</span>
              <h1>${p(C())}</h1>
              <p>${p(w())}</p>
              <div class="hero__highlights">
                ${r.map(e=>`<span>${p(e)}</span>`).join(``)}
              </div>
              <div class="hero__actions">
                <a class="button button--primary" href="#/product-center">${d().heroPrimary}</a>
                <a class="button button--secondary-light" href="#/contact">${d().heroSecondary}</a>
              </div>
            </div>
            <aside class="hero__panel">
              <span class="hero__panel-label">${p(y())}</span>
              <div class="hero__metrics">
                ${n.map(e=>`
                      <div class="hero__metric">
                        <strong>${p(e.value)}</strong>
                        <span>${p(e.label)}</span>
                      </div>
                    `).join(``)}
              </div>
              <div class="hero__panel-note">
                <strong>${d().heroSideTitle}</strong>
                <ul>
                  ${n.map(e=>`<li>${p(e.label)}</li>`).join(``)}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section class="trust-strip">
          <div class="shell trust-strip__inner">
            ${d().trustMarks.map(e=>`<span>${e}</span>`).join(``)}
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
            <div class="product-grid">
              ${e.map((e,t)=>`
                    <article class="product-card">
                      <div class="product-card__image">
                        <img src="${e.image}" alt="${p(f(e.name))}" />
                      </div>
                      <div class="product-card__body">
                        <span class="card-tag">${p(T(e))}</span>
                        <div class="product-card__index">0${t+1}</div>
                        <h3>${p(f(e.name))}</h3>
                        <p>${p(f(e.summary))}</p>
                        <div class="product-card__specs">
                          <span>${l.locale===`cn`?`支持打样`:`Sample Ready`}</span>
                          <span>${l.locale===`cn`?`支持私牌`:`Private Label`}</span>
                        </div>
                        <div class="product-card__foot">
                          <div class="pill-row">
                            ${(e.tags||[]).slice(0,2).map(e=>`<span class="pill">${p(e)}</span>`).join(``)}
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
              <img src="${m(`factoryGalleryMain`,`/site-assets/office-3.jpg`)}" alt="Factory strength" />
            </div>
            <div class="split-section__content">
              <span class="eyebrow">${d().factoryEyebrow}</span>
              <h2>${d().factoryTitle}</h2>
              <p>${d().factoryBody}</p>
              <div class="value-grid">
                ${d().factoryPoints.map(e=>`
                      <article class="value-card">
                        <span class="value-card__line"></span>
                        <h3>${e.title}</h3>
                        <p>${e.body}</p>
                      </article>
                    `).join(``)}
              </div>
            </div>
          </div>
        </section>

        <section class="section section--light">
          <div class="shell">
            <div class="section-head">
              <div>
                <span class="eyebrow">${d().certificateEyebrow}</span>
                <h2>${d().certificateTitle}</h2>
              </div>
              <p>${d().certificateBody}</p>
            </div>
            <div class="value-grid">
              ${(l.site?.certificates||[]).map(e=>`
                    <article class="value-card value-card--light certificate-card">
                      <span class="value-card__line"></span>
                      ${e.image?`<img src="${p(e.image)}" alt="${p(f(e.title))}" />`:``}
                      <h3>${p(f(e.title))}</h3>
                      <p>${p(e.issuer||``)}</p>
                    </article>
                  `).join(``)}
            </div>
          </div>
        </section>

        <section class="section section--slate home-customization" id="customization">
          <div class="shell">
            <div class="section-head">
              <div><span class="eyebrow">${l.locale===`cn`?`定制服务`:`Custom Programs`}</span><h2>${l.locale===`cn`?`从材质到包装，一站式支持品牌定制`:`Customize materials, branding, and packaging in one workflow`}</h2></div>
              <p>${l.locale===`cn`?`明确的定制边界帮助您更快确认需求、报价和打样。`:`A clear customization scope helps your team move faster from brief to quotation and sample.`}</p>
            </div>
            <div class="value-grid">
              ${(l.site?.home?.customization||[]).map(e=>`<article class="value-card"><span class="value-card__line"></span><h3>${p(f(e.title))}</h3><p>${p(f(e.body))}</p></article>`).join(``)}
            </div>
          </div>
        </section>

        <section class="section section--light home-media-section">
          <div class="shell">
            <div class="section-head"><div><span class="eyebrow">${l.locale===`cn`?`真实场景`:`Real Operations`}</span><h2>${l.locale===`cn`?`团队与客户合作现场`:`Our team and customer collaboration`}</h2></div><p>${l.locale===`cn`?`用真实生产与合作场景，展示我们对品质和交付的承诺。`:`Real production and collaboration moments that make our quality and delivery promise tangible.`}</p></div>
            <div class="home-photo-grid">${m(`homeTeam`,`/site-assets/team-1.jpg`)?`<figure><img src="${m(`homeTeam`,`/site-assets/team-1.jpg`)}" alt="Qiaotian team" /><figcaption>${l.locale===`cn`?`乔天团队合照`:`Qiaotian team`}</figcaption></figure>`:``}${l.site?.images?.homeCustomer?`<figure><img src="${p(l.site.images.homeCustomer)}" alt="Overseas customer collaboration" /><figcaption>${l.locale===`cn`?`海外客户合作现场`:`Overseas customer collaboration`}</figcaption></figure>`:``}</div>
          </div>
        </section>

        <section class="section section--slate home-downloads-section">
          <div class="shell"><div class="section-head"><div><span class="eyebrow">${l.locale===`cn`?`下载目录`:`Downloads`}</span><h2>${l.locale===`cn`?`把关键资料带回团队评估`:`Bring the right materials back to your sourcing team`}</h2></div><p>${l.locale===`cn`?`产品目录与 OEM/ODM 能力资料可直接下载。`:`Download our catalog and OEM/ODM capability deck for internal review.`}</p></div><div class="download-grid">${g.map(e=>`<a class="download-card" href="${p(e.file)}" download><span class="download-card__icon">${p(e.file.split(`.`).pop()?.toUpperCase()||`FILE`)}</span><div><h3>${p(f(e.title))}</h3><p>${p(f(e.body))}</p></div><span class="download-card__arrow">+</span></a>`).join(``)}</div></div>
        </section>

        <section class="section section--light home-cases-section">
          <div class="shell"><div class="section-head"><div><span class="eyebrow">${l.locale===`cn`?`案例展示`:`Case Studies`}</span><h2>${l.locale===`cn`?`为不同市场交付可复制的方案`:`Repeatable programs for different markets`}</h2></div><p>${l.locale===`cn`?`从品牌定制到零售包装，覆盖海外采购常见场景。`:`From private label to retail packaging, built around common overseas sourcing needs.`}</p></div><div class="case-grid">${b.map(e=>`<article class="case-card"><img src="${p(e.image)}" alt="${p(f(e.title))}" /><div><span class="eyebrow">${o.length?`Case`:l.locale===`cn`?`演示内容`:`Demo Content`}</span><h3>${p(f(e.title))}</h3><p>${p(f(e.body))}</p></div></article>`).join(``)}</div></div>
        </section>

        <section class="section section--dark home-video-section">
          <div class="shell video-layout"><div class="video-poster">${l.site?.home?.video?.url?`<video src="${p(l.site.home.video.url)}" poster="${p(l.site.home.video.poster||``)}" controls preload="metadata"></video>`:`<img src="${p(l.site?.home?.video?.poster||`/site-assets/office-3.jpg`)}" alt="Manufacturing" />`}</div><div><span class="eyebrow eyebrow--light">${l.locale===`cn`?`产品视频`:`Product Video`}</span><h2>${p(f(l.site?.home?.video?.title)||(l.locale===`cn`?`走进乔天制造现场`:`Inside Qiaotian Manufacturing`))}</h2><p>${p(f(l.site?.home?.video?.body))}</p></div></div>
        </section>

        <section class="section section--light home-testimonials-section">
          <div class="shell"><div class="section-head"><div><span class="eyebrow">${l.locale===`cn`?`客户评价`:`Customer Voice`}</span><h2>${l.locale===`cn`?`长期合作来自稳定的每一个细节`:`Long-term partnerships are built on consistent details`}</h2></div></div><div class="testimonial-grid">${x.map(e=>`<blockquote class="testimonial-card">${s.length?``:`<span class="eyebrow">${l.locale===`cn`?`演示内容，非真实客户评价`:`Demo only - not real customer feedback`}</span>`}<p>&ldquo;${p(f(e.quote))}&rdquo;</p><footer><strong>${p(f(e.author))}</strong><span>${p(e.company)}</span></footer></blockquote>`).join(``)}</div></div>
        </section>

        <section class="section section--slate">
          <div class="shell"><div class="section-head"><div><span class="eyebrow">FAQ</span><h2>${l.locale===`cn`?`下单前，先了解这些关键问题`:`Answers to common sourcing questions`}</h2></div><p>${l.locale===`cn`?`关于 MOQ、交期、打样、认证与售后的常见答案。`:`Quick answers on MOQ, lead time, samples, certifications, and after-sales.`}</p></div><div class="faq-list">${(l.site?.home?.faq||[]).map(e=>`<details class="faq-item"><summary>${p(f(e.question))}<span>+</span></summary><p>${p(f(e.answer))}</p></details>`).join(``)}</div></div>
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
              ${I()}
            </div>
          </div>
        </section>
      </main>
      ${k()}
    </div>
  `}function j(){let e=S(),t=E(e),n=new Set;if(l.selectedCategoryId){n.add(l.selectedCategoryId);let e=!0;for(;e;)e=!1,t.forEach(t=>{t.parentId&&n.has(t.parentId)&&!n.has(t.id)&&(n.add(t.id),e=!0)})}let r=l.selectedCategoryId?e.filter(e=>n.has(e.categoryId||``)):e;a.innerHTML=`
    <div class="site-page">
      ${O(`product-center`)}
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
                  <button class="category-chip category-chip--all ${l.selectedCategoryId?``:`is-active`}" data-category-id="">${d().filterAll}</button>
                  ${D(t)}
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
              <div class="catalog-grid">
                ${r.map(e=>`
                      <article class="catalog-card">
                        <div class="catalog-card__image">
                          <img src="${e.image}" alt="${p(f(e.name))}" />
                        </div>
                        <div class="catalog-card__body">
                          <span class="card-tag">${p(T(e))}</span>
                          <h3>${p(f(e.name))}</h3>
                          <p>${p(f(e.summary))}</p>
                          <div class="pill-row">
                            ${(e.tags||[]).slice(0,2).map(e=>`<span class="pill">${p(e)}</span>`).join(``)}
                          </div>
                          <div class="catalog-card__actions">
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
      ${k()}
    </div>
  `}function M(){let e=d().factoryStats;a.innerHTML=`
    <div class="site-page">
      ${O(`factory-strength`)}
      <main>
        <section class="page-hero page-hero--dark">
          <div class="hero__media">
            <img src="${m(`factoryHero`,`/site-assets/office-2.jpg`)}" alt="Factory floor" />
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
              <img src="${m(`factoryGalleryMain`,`/site-assets/office-3.jpg`)}" alt="Production line" />
              <div class="gallery-card__caption">
                <h3>${d().galleryCaptions[0].title}</h3>
                <p>${d().galleryCaptions[0].body}</p>
              </div>
            </article>
            <article class="gallery-card">
              <img src="${m(`factoryGalleryLab`,`/site-assets/team-1.jpg`)}" alt="Quality inspection" />
              <div class="gallery-card__caption">
                <h3>${d().galleryCaptions[1].title}</h3>
                <p>${d().galleryCaptions[1].body}</p>
              </div>
            </article>
            <article class="gallery-card">
              <img src="${m(`factoryGalleryQc`,`/site-assets/product-lens-film.jpg`)}" alt="Packing zone" />
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
      ${k()}
    </div>
  `}function N(){a.innerHTML=`
    <div class="site-page">
      ${O(`about`)}
      <main>
        <section class="page-hero page-hero--dark page-hero--about">
          <div class="hero__media">
            <img src="${m(`aboutHero`,`/site-assets/team-1.jpg`)}" alt="About Qiaotian" />
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
      ${k()}
    </div>
  `}function P(){let e=l.site?.contact,t=b();a.innerHTML=`
    <div class="site-page">
      ${O(`contact`)}
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
                <p>${p(h(`contact`,`heroBody`,d().contactBody))}</p>
              </div>
              <div class="contact-checklist">
                ${t.map(e=>`<span>${p(e)}</span>`).join(``)}
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
                <span>${l.locale===`cn`?`支持事项`:`What We Can Support`}</span>
                <p>${p(x())}</p>
              </div>
              <div class="contact-map">
                <img src="${m(`contactMap`,`/site-assets/office-2.jpg`)}" alt="Office and factory" />
              </div>
              <div class="contact-note">
                <h3>${p(g(`en`,`Qiaotian Enterprise`))}</h3>
                <p>${p(f(e?.address)||d().hubBody)}</p>
              </div>
            </div>
            <div class="inquiry-card inquiry-card--light">
              ${I()}
            </div>
          </div>
        </section>
      </main>
      ${k()}
    </div>
  `,R()}function F(){a.innerHTML=`
    <div class="site-page">
      ${O(`privacy`)}
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
      ${k()}
    </div>
  `}function I(){return`
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
  `}function L(){document.querySelectorAll(`[data-category-id]`).forEach(e=>{e.addEventListener(`click`,()=>{l.selectedCategoryId=e.dataset.categoryId||``,B()})}),document.querySelector(`#lang-toggle`)?.addEventListener(`click`,()=>{l.locale=l.locale===`cn`?`en`:`cn`,B()}),document.querySelector(`#mobile-menu-toggle`)?.addEventListener(`click`,()=>{l.mobileMenuOpen=!l.mobileMenuOpen,B()}),document.querySelectorAll(`.mobile-nav__link`).forEach(e=>{e.addEventListener(`click`,()=>{l.mobileMenuOpen=!1})})}function R(){document.querySelector(`#lead-form`)?.addEventListener(`submit`,async e=>{if(e.preventDefault(),l.submitting)return;let t=e.currentTarget;if(!t)return;let n=Object.fromEntries(new FormData(t).entries());l.submitting=!0,B();let i=document.querySelector(`#lead-form-feedback`);try{await r(n);let e=document.querySelector(`#lead-form`);i&&(i.textContent=d().formSuccess,i.className=`form-feedback is-success`),e?.reset()}catch(e){if(i){let t=e instanceof Error&&e.message?e.message:d().formError;i.textContent=`${d().formError} ${t}`,i.className=`form-feedback is-error`}}finally{l.submitting=!1;let e=document.querySelector(`#lead-form button[type="submit"]`);e&&(e.textContent=d().formSubmit)}})}async function z(){l.site=(await n()).site}function B(e){l.route=u(),e?.closeMobileMenu&&(l.mobileMenuOpen=!1),l.route===`product-center`?j():l.route===`factory-strength`?M():l.route===`about`?N():l.route===`contact`?P():l.route===`privacy`?F():A(),l.route===`home`&&(document.querySelector(`.home-downloads-section`)?.toggleAttribute(`hidden`,!1),document.querySelector(`.home-cases-section`)?.toggleAttribute(`hidden`,!1),document.querySelector(`.home-testimonials-section`)?.toggleAttribute(`hidden`,!1)),L();let t=document.querySelectorAll(`.section, .product-card, .case-card, .value-card, .download-card, .testimonial-card`);if(`IntersectionObserver`in window){let e=new IntersectionObserver(t=>t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))}),{threshold:.12});t.forEach(t=>{t.classList.add(`reveal`),e.observe(t)})}else t.forEach(e=>e.classList.add(`is-visible`));(l.route===`home`||l.route===`contact`)&&R()}async function V(){await z(),B()}window.addEventListener(`hashchange`,()=>B({closeMobileMenu:!0})),V().catch(e=>{console.error(e),a.innerHTML=`<pre>${p(e instanceof Error?e.message:String(e))}</pre>`});