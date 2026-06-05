from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile


OUTPUT_FILE = "企业站需求采集表.docx"


SECTIONS = [
    (
        "1. 项目基础信息 / Project Basics",
        [
            ("项目名称", "Project Name"),
            ("公司中文名", "Company Name (CN)"),
            ("公司英文名", "Company Name (EN)"),
            ("公司简称", "Company Short Name"),
            ("所属行业", "Industry"),
            ("主要业务", "Core Business"),
            ("品牌定位一句话", "One-line Brand Positioning"),
            ("网站主要目标", "Primary Website Goal"),
            ("目标客户类型", "Target Customer Type"),
            ("主要服务地区", "Primary Service Regions"),
            ("预计上线时间", "Target Launch Date"),
        ],
    ),
    (
        "2. 网站建设目标 / Website Goals",
        [
            ("本次建站首要目标", "Top Priority of This Website"),
            ("品牌展示 / 获客转化 / 招商合作 / 产品介绍 / 海外拓展", "Branding / Lead Gen / Partnership / Product Intro / Global Expansion"),
            ("希望用户进入网站后完成的动作", "Desired User Action"),
            ("提交表单 / 电话咨询 / 邮件联系 / 下载资料 / 预约演示 / WhatsApp / 微信", "Form / Call / Email / Download / Demo / WhatsApp / WeChat"),
            ("本次一期重点页面", "Priority Pages for Phase 1"),
            ("暂不纳入一期的页面或功能", "Out-of-scope Pages or Features for Phase 1"),
        ],
    ),
    (
        "3. 多语言需求 / Bilingual Requirements",
        [
            ("是否需要中英文双语", "Need Chinese and English"),
            ("默认语言", "Default Language"),
            ("是否支持语言切换", "Language Switch Required"),
            ("中文内容是否已准备", "Chinese Content Ready"),
            ("英文内容是否已准备", "English Content Ready"),
            ("英文内容来源", "English Content Source"),
            ("人工提供 / 先机翻后校对 / 需要协助撰写", "Manual / Machine Translation Then Review / Need Writing Support"),
            ("中英文是否完全对应", "Are CN and EN Fully Mirrored"),
            ("是否存在仅中文页面或仅英文页面", "CN-only or EN-only Pages"),
            ("多语言 SEO 是否需要独立配置", "Separate SEO per Language"),
        ],
    ),
    (
        "4. 品牌与视觉信息 / Brand & Visual Direction",
        [
            ("Logo 是否已有", "Logo Ready"),
            ("品牌标准色", "Primary Brand Color"),
            ("辅助色", "Secondary Colors"),
            ("字体偏好", "Preferred Fonts"),
            ("是否已有 VI / 品牌规范", "Existing Brand Guidelines"),
            ("网站风格关键词", "Website Style Keywords"),
            ("稳重 / 科技 / 国际化 / 高端 / 极简 / 工业 / 专业", "Trustworthy / Tech / International / Premium / Minimal / Industrial / Professional"),
            ("喜欢的参考网站 1", "Reference Website 1"),
            ("喜欢的参考网站 2", "Reference Website 2"),
            ("喜欢的参考网站 3", "Reference Website 3"),
            ("不喜欢的风格", "Disliked Styles"),
            ("是否有必须参考的页面或截图", "Mandatory Reference Pages or Screenshots"),
            ("是否要求完全贴合现有品牌形象", "Must Match Existing Brand Strictly"),
        ],
    ),
    (
        "5. 栏目结构需求 / Site Structure",
        [
            ("首页", "Home"),
            ("关于我们", "About Us"),
            ("产品中心", "Products"),
            ("服务介绍", "Services"),
            ("解决方案", "Solutions"),
            ("应用场景", "Use Cases"),
            ("成功案例", "Case Studies"),
            ("客户列表", "Clients"),
            ("新闻中心", "News"),
            ("行业洞察 / 博客", "Insights / Blog"),
            ("下载中心", "Downloads"),
            ("FAQ", "FAQ"),
            ("联系我们", "Contact Us"),
            ("招聘页面", "Careers"),
            ("隐私政策", "Privacy Policy"),
            ("服务条款", "Terms of Service"),
            ("其他栏目", "Other Sections"),
        ],
    ),
    (
        "6. 页面内容准备情况 / Page Content Readiness",
        [
            ("首页 Banner 标题", "Homepage Banner Title"),
            ("首页 Banner 副标题", "Homepage Banner Subtitle"),
            ("首页 Banner 按钮文案", "Homepage CTA Copy"),
            ("首页核心卖点", "Homepage Key Selling Points"),
            ("首页是否需要视频 / 动效", "Need Video / Motion on Homepage"),
            ("首页是否需要客户 Logo 墙", "Need Client Logo Wall"),
            ("首页是否需要案例摘要", "Need Case Summary"),
            ("首页是否需要表单入口", "Need Form Entry on Homepage"),
            ("公司介绍", "Company Introduction"),
            ("公司历程", "Company Milestones"),
            ("团队介绍", "Team Introduction"),
            ("企业文化", "Company Culture"),
            ("资质荣誉", "Certificates and Awards"),
            ("办公环境图片", "Office Photos"),
            ("产品或服务数量", "Number of Products or Services"),
            ("每个产品是否需要独立详情页", "Need Detail Page per Product"),
            ("产品字段是否需要名称 / 简介 / 图片 / 参数 / 应用 / FAQ / 下载资料", "Product Fields Required"),
            ("是否需要产品分类", "Need Product Categories"),
            ("解决方案是否按行业或场景分类", "Solutions by Industry or Use Case"),
            ("每个方案是否需要详情页", "Need Detail Page per Solution"),
            ("案例数量", "Number of Case Studies"),
            ("案例是否需要详情页", "Need Detail Page per Case"),
            ("案例字段是否需要客户名称 / 行业 / 背景 / 挑战 / 方案 / 成果 / 图片", "Case Study Fields Required"),
            ("是否允许匿名客户案例", "Allow Anonymous Client Cases"),
            ("新闻是否需要列表和详情页", "Need News List and Detail Page"),
            ("是否需要分类 / 标签 / 置顶 / 发布时间 / 作者", "Need Category / Tags / Pin / Date / Author"),
            ("联系人", "Contact Person"),
            ("电话", "Phone"),
            ("邮箱", "Email"),
            ("公司地址", "Company Address"),
            ("地图定位", "Map Location"),
            ("是否显示表单 / WhatsApp / 微信二维码 / 社媒链接", "Show Form / WhatsApp / WeChat QR / Social Links"),
        ],
    ),
    (
        "7. 素材清单 / Asset Checklist",
        [
            ("Logo 源文件", "Logo Source File"),
            ("品牌手册", "Brand Book"),
            ("公司介绍文案", "Company Introduction Copy"),
            ("产品文案", "Product Copy"),
            ("解决方案文案", "Solution Copy"),
            ("案例文案", "Case Study Copy"),
            ("新闻文章", "News Articles"),
            ("团队照片", "Team Photos"),
            ("办公环境照片", "Office Photos"),
            ("产品图片", "Product Images"),
            ("宣传视频", "Promo Videos"),
            ("客户 Logo", "Client Logos"),
            ("资质证书", "Certificates"),
            ("白皮书 / PDF 资料", "Whitepapers / PDF Materials"),
            ("联系信息", "Contact Details"),
            ("社媒链接", "Social Media Links"),
        ],
    ),
    (
        "8. 功能需求采集 / Feature Requirements",
        [
            ("中英文切换", "Language Switch"),
            ("页面 SEO 设置", "Page-level SEO"),
            ("每页独立标题 / 描述 / 关键词", "Per-page Title / Description / Keywords"),
            ("sitemap", "Sitemap"),
            ("robots", "Robots"),
            ("联系表单", "Contact Form"),
            ("留资表单", "Lead Form"),
            ("文件下载", "File Download"),
            ("资料下载前留资", "Lead Capture Before Download"),
            ("邮件通知", "Email Notification"),
            ("表单防垃圾验证", "Anti-spam Protection"),
            ("管理员后台", "Admin Backend"),
            ("图片上传", "Image Upload"),
            ("文件上传", "File Upload"),
            ("新闻发布", "News Publishing"),
            ("案例发布", "Case Publishing"),
            ("产品发布", "Product Publishing"),
            ("富文本编辑", "Rich Text Editor"),
            ("草稿 / 发布状态", "Draft / Published Status"),
            ("是否需要搜索功能", "Need Search"),
            ("是否需要站内弹窗", "Need Site Popup"),
            ("是否需要在线客服", "Need Online Chat"),
            ("是否需要数据统计", "Need Analytics"),
            ("GA4 / 百度统计 / Meta Pixel / LinkedIn", "GA4 / Baidu / Meta Pixel / LinkedIn"),
            ("是否需要埋点事件追踪", "Need Event Tracking"),
        ],
    ),
    (
        "9. 后台管理需求 / Admin Requirements",
        [
            ("管理员登录", "Admin Login"),
            ("角色权限", "Roles and Permissions"),
            ("首页内容管理", "Homepage Content Management"),
            ("关于我们管理", "About Us Management"),
            ("产品管理", "Product Management"),
            ("服务管理", "Service Management"),
            ("解决方案管理", "Solution Management"),
            ("案例管理", "Case Study Management"),
            ("新闻管理", "News Management"),
            ("下载中心管理", "Download Center Management"),
            ("联系表单管理", "Contact Form Management"),
            ("SEO 管理", "SEO Management"),
            ("多语言内容分别维护", "Separate Content per Language"),
            ("媒体库管理", "Media Library"),
            ("系统设置", "System Settings"),
            ("联系方式统一配置", "Global Contact Settings"),
            ("页脚信息配置", "Footer Settings"),
            ("社媒链接配置", "Social Links Settings"),
            ("是否需要操作日志", "Need Operation Logs"),
        ],
    ),
    (
        "10. 表单与线索收集需求 / Forms & Lead Collection",
        [
            ("需要哪些表单", "Required Forms"),
            ("联系我们 / 预约演示 / 获取报价 / 下载资料", "Contact / Demo / Quote / Download"),
            ("每个表单字段", "Fields per Form"),
            ("是否必填姓名 / 公司名 / 电话 / 邮箱 / 国家地区 / 留言", "Required Name / Company / Phone / Email / Country / Message"),
            ("表单提交后动作", "Post-submit Action"),
            ("成功提示 / 邮件通知 / 跳转页面 / CRM", "Success Message / Email / Redirect / CRM"),
            ("线索通知接收邮箱", "Lead Notification Email"),
            ("是否要同步企业微信 / 钉钉 / CRM", "Sync to WeCom / DingTalk / CRM"),
        ],
    ),
    (
        "11. SEO 与营销需求 / SEO & Marketing",
        [
            ("是否重视 Google SEO", "Google SEO Priority"),
            ("是否重视百度 SEO", "Baidu SEO Priority"),
            ("是否需要多语言独立 URL，例如 /zh /en", "Separate URLs per Language"),
            ("是否需要博客 / 洞察用于 SEO", "Need Blog / Insights for SEO"),
            ("目标关键词", "Target Keywords"),
            ("竞品网站", "Competitor Websites"),
            ("是否需要 Open Graph", "Need Open Graph"),
            ("是否需要结构化数据", "Need Structured Data"),
            ("是否需要落地页支持广告投放", "Need Landing Pages for Ads"),
        ],
    ),
    (
        "12. 技术与部署环境 / Tech & Deployment",
        [
            ("当前开发环境", "Current Dev Environment"),
            ("Windows 本地开发是否需要一键启动", "Need One-click Startup on Windows"),
            ("线上部署环境", "Production Environment"),
            ("Linux 发行版", "Linux Distribution"),
            ("Web 服务器", "Web Server"),
            ("Nginx / Apache", "Nginx / Apache"),
            ("是否已有域名", "Domain Ready"),
            ("域名列表", "Domain List"),
            ("是否已有 SSL 证书", "SSL Ready"),
            ("是否已有服务器", "Server Ready"),
            ("是否已有数据库", "Database Ready"),
            ("MySQL / PostgreSQL", "MySQL / PostgreSQL"),
            ("是否需要对象存储", "Need Object Storage"),
            ("是否需要 CDN", "Need CDN"),
            ("是否需要邮件服务", "Need Email Service"),
            ("SMTP / 企业邮箱 / 第三方邮件服务", "SMTP / Enterprise Mail / Third-party Mail"),
            ("是否需要 Docker 部署", "Need Docker Deployment"),
            ("是否需要日志监控", "Need Logging / Monitoring"),
        ],
    ),
    (
        "13. 合规与法务需求 / Compliance & Legal",
        [
            ("是否需要隐私政策", "Need Privacy Policy"),
            ("是否需要服务条款", "Need Terms of Service"),
            ("是否需要 Cookie 提示", "Need Cookie Notice"),
            ("是否涉及 GDPR", "GDPR Applicable"),
            ("是否需要备案号展示", "Need ICP Filing Display"),
            ("是否需要版权声明", "Need Copyright Notice"),
            ("是否需要数据留存说明", "Need Data Retention Note"),
            ("是否有行业特殊合规要求", "Industry-specific Compliance Requirements"),
        ],
    ),
    (
        "14. 维护与运营方式 / Maintenance & Operations",
        [
            ("后续由谁维护内容", "Who Maintains Content"),
            ("是否需要后台操作简单", "Need Simple Backend UX"),
            ("是否需要培训文档", "Need Training Docs"),
            ("是否需要部署文档", "Need Deployment Docs"),
            ("是否需要内容录入说明", "Need Content Entry Guide"),
            ("是否需要后续功能扩展预留", "Need Future Extensibility"),
        ],
    ),
    (
        "15. 验收标准 / Acceptance Criteria",
        [
            ("你认为什么叫可以上线", "Definition of Ready to Launch"),
            ("必须完成的页面", "Mandatory Pages"),
            ("必须完成的功能", "Mandatory Features"),
            ("可延后功能", "Deferred Features"),
            ("是否需要移动端适配", "Need Mobile Responsiveness"),
            ("是否需要主流浏览器兼容", "Need Mainstream Browser Compatibility"),
            ("是否需要性能优化基础指标", "Need Baseline Performance Targets"),
        ],
    ),
    (
        "16. 其他特别要求 / Additional Requirements",
        [
            ("必须保留的内容", "Content That Must Stay"),
            ("不能出现的设计风格", "Design Styles to Avoid"),
            ("特别关注的竞争对手", "Key Competitors to Watch"),
            ("是否有领导指定要求", "Executive-specific Requirements"),
            ("其他补充说明", "Other Notes"),
        ],
    ),
]


def paragraph(text: str, *, bold: bool = False, size: int | None = None, center: bool = False) -> str:
    props = []
    if bold or size:
        run_props = []
        if bold:
            run_props.append("<w:b/>")
        if size:
            run_props.append(f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>')
        props.append(f"<w:rPr>{''.join(run_props)}</w:rPr>")
    ppr = "<w:pPr><w:jc w:val=\"center\"/></w:pPr>" if center else ""
    return (
        "<w:p>"
        f"{ppr}"
        "<w:r>"
        f"{''.join(props)}"
        f"<w:t xml:space=\"preserve\">{escape(text)}</w:t>"
        "</w:r>"
        "</w:p>"
    )


def table_cell(text: str, width: int) -> str:
    return (
        "<w:tc>"
        f"<w:tcPr><w:tcW w:w=\"{width}\" w:type=\"dxa\"/></w:tcPr>"
        f"{paragraph(text)}"
        "</w:tc>"
    )


def section_table(fields: list[tuple[str, str]]) -> str:
    rows = [
        "<w:tr>"
        f"{table_cell('中文字段', 3800)}"
        f"{table_cell('English Field', 3800)}"
        f"{table_cell('填写内容 / Notes', 7600)}"
        "</w:tr>"
    ]
    for zh, en in fields:
        rows.append(
            "<w:tr>"
            f"{table_cell(zh, 3800)}"
            f"{table_cell(en, 3800)}"
            f"{table_cell('______________________________________________', 7600)}"
            "</w:tr>"
        )
    return (
        "<w:tbl>"
        "<w:tblPr>"
        "<w:tblW w:w=\"15200\" w:type=\"dxa\"/>"
        "<w:tblBorders>"
        "<w:top w:val=\"single\" w:sz=\"8\" w:space=\"0\" w:color=\"auto\"/>"
        "<w:left w:val=\"single\" w:sz=\"8\" w:space=\"0\" w:color=\"auto\"/>"
        "<w:bottom w:val=\"single\" w:sz=\"8\" w:space=\"0\" w:color=\"auto\"/>"
        "<w:right w:val=\"single\" w:sz=\"8\" w:space=\"0\" w:color=\"auto\"/>"
        "<w:insideH w:val=\"single\" w:sz=\"6\" w:space=\"0\" w:color=\"auto\"/>"
        "<w:insideV w:val=\"single\" w:sz=\"6\" w:space=\"0\" w:color=\"auto\"/>"
        "</w:tblBorders>"
        "</w:tblPr>"
        "<w:tblGrid>"
        "<w:gridCol w:w=\"3800\"/>"
        "<w:gridCol w:w=\"3800\"/>"
        "<w:gridCol w:w=\"7600\"/>"
        "</w:tblGrid>"
        f"{''.join(rows)}"
        "</w:tbl>"
    )


def build_document_xml() -> str:
    parts = [
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
        "<w:document xmlns:wpc=\"http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas\" "
        "xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" "
        "xmlns:o=\"urn:schemas-microsoft-com:office:office\" "
        "xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" "
        "xmlns:m=\"http://schemas.openxmlformats.org/officeDocument/2006/math\" "
        "xmlns:v=\"urn:schemas-microsoft-com:vml\" "
        "xmlns:wp14=\"http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing\" "
        "xmlns:wp=\"http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing\" "
        "xmlns:w10=\"urn:schemas-microsoft-com:office:word\" "
        "xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\" "
        "xmlns:w14=\"http://schemas.microsoft.com/office/word/2010/wordml\" "
        "xmlns:wpg=\"http://schemas.microsoft.com/office/word/2010/wordprocessingGroup\" "
        "xmlns:wpi=\"http://schemas.microsoft.com/office/word/2010/wordprocessingInk\" "
        "xmlns:wne=\"http://schemas.microsoft.com/office/word/2006/wordml\" "
        "xmlns:wps=\"http://schemas.microsoft.com/office/word/2010/wordprocessingShape\" "
        "mc:Ignorable=\"w14 wp14\">",
        "<w:body>",
        paragraph(
            "中英文 ToB 企业站需求采集表 / Bilingual ToB Corporate Website Requirement Intake Form",
            bold=True,
            size=32,
            center=True,
        ),
        paragraph(
            "用途 / Purpose: 供客户、老板或内部项目负责人填写，用于网站规划、页面梳理、功能确认和开发上线前需求收集。",
            size=22,
        ),
        paragraph(
            "填写建议 / Notes: 如暂时没有完整资料，可先填写已有信息；空缺项后续可补充。该文档同时适用于 Windows 开发环境与 Linux 部署场景下的项目交付准备。",
            size=22,
        ),
    ]

    for title, fields in SECTIONS:
        parts.append(paragraph(""))
        parts.append(paragraph(title, bold=True, size=26))
        parts.append(section_table(fields))

    parts.append(
        "<w:sectPr>"
        "<w:pgSz w:w=\"11906\" w:h=\"16838\"/>"
        "<w:pgMar w:top=\"1440\" w:right=\"1080\" w:bottom=\"1440\" w:left=\"1080\" w:header=\"708\" w:footer=\"708\" w:gutter=\"0\"/>"
        "</w:sectPr>"
    )
    parts.append("</w:body></w:document>")
    return "".join(parts)


def content_types_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>"""


def rels_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>"""


def app_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
 xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
</Properties>"""


def core_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcmitype="http://purl.org/dc/dcmitype/"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>企业站需求采集表</dc:title>
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
</cp:coreProperties>"""


def word_rels_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>"""


def generate_docx(output_path: Path) -> None:
    with ZipFile(output_path, "w", ZIP_DEFLATED) as archive:
        archive.writestr("[Content_Types].xml", content_types_xml())
        archive.writestr("_rels/.rels", rels_xml())
        archive.writestr("docProps/app.xml", app_xml())
        archive.writestr("docProps/core.xml", core_xml())
        archive.writestr("word/document.xml", build_document_xml())
        archive.writestr("word/_rels/document.xml.rels", word_rels_xml())


def main() -> None:
    output_path = Path(__file__).resolve().parent / OUTPUT_FILE
    generate_docx(output_path)
    print(f"Generated: {output_path}")


if __name__ == "__main__":
    main()
