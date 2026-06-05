export type StrapiMedia = {
  url?: string
}

export type SiteData = {
  brand?: { cn?: string; en?: string }
  hero?: { title?: { cn?: string; en?: string }; body?: { cn?: string; en?: string } }
  products?: Array<{
    id: string
    slug?: string
    name: { cn?: string; en?: string }
    summary: { cn?: string; en?: string }
    tags?: string[]
    image?: string
  }>
  stats?: Array<{ value: string; label: { cn?: string; en?: string } }>
  contact?: { phone?: string; email?: string; address?: { cn?: string; en?: string } }
  images?: Record<string, string>
  sections?: {
    factory?: { heroTitle?: { cn?: string; en?: string }; heroBody?: { cn?: string; en?: string } }
    about?: { heroTitle?: { cn?: string; en?: string }; heroBody?: { cn?: string; en?: string } }
    contact?: { heroTitle?: { cn?: string; en?: string }; heroBody?: { cn?: string; en?: string } }
    privacy?: { heroTitle?: { cn?: string; en?: string }; heroBody?: { cn?: string; en?: string } }
  }
}

export type InquiryPayload = {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

const cmsBase = ((import.meta.env.VITE_CMS_BASE as string | undefined) || '').replace(/\/$/, '')

async function cmsFetch<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${cmsBase}${path}`, options)
  if (!response.ok) throw new Error(`CMS request failed: ${path}`)
  return response.json() as Promise<T>
}

export async function loadSiteFromCms() {
  const result = await cmsFetch<{ brand?: SiteData['brand']; hero?: SiteData['hero']; products?: SiteData['products']; stats?: SiteData['stats']; contact?: SiteData['contact']; images?: SiteData['images']; sections?: SiteData['sections'] }>('/api/public/site')
  return { site: result }
}

export async function submitInquiryToCms(payload: InquiryPayload) {
  const response = await fetch(`${cmsBase}/api/public/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!response.ok) throw new Error('Failed to submit inquiry')
}
