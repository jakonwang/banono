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
  categories?: Array<{
    id: string
    parentId?: string
    slug?: string
    name?: { cn?: string; en?: string }
    description?: { cn?: string; en?: string }
    sort?: number
    status?: string
  }>
  certificates?: Array<{
    id: string
    title?: { cn?: string; en?: string }
    issuer?: string
    image?: string
    sort?: number
  }>
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
  const response = await fetch(`${cmsBase}${path}`, {
    cache: 'no-store',
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {})
    }
  })
  if (!response.ok) throw new Error(`CMS request failed: ${path}`)
  return response.json() as Promise<T>
}

export async function loadSiteFromCms() {
  const result = await cmsFetch<SiteData>('/api/public/site')
  return { site: result }
}

export async function submitInquiryToCms(payload: InquiryPayload) {
  const response = await fetch(`${cmsBase}/api/public/inquiry`, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!response.ok) {
    const contentType = response.headers.get('content-type') || ''
    let detail = ''

    try {
      if (contentType.includes('application/json')) {
        const data = await response.json()
        detail =
          data?.error?.message ||
          data?.message ||
          data?.data?.message ||
          JSON.stringify(data)
      } else {
        detail = (await response.text()).trim()
      }
    } catch {
      detail = ''
    }

    throw new Error(detail || `Failed to submit inquiry (${response.status})`)
  }
}
