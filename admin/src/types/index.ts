export type Role = 'super_admin' | 'editor' | 'sales'

export type Localized = {
  cn?: string
  en?: string
}

export type Inquiry = {
  id: string
  name: string
  company: string
  email: string
  phone: string
  message: string
  status: string
  createdAt: string
  updatedAt?: string
  notes?: string
}

export type ProductCategory = {
  id: string
  name: Localized
  description?: Localized
  sort?: number
  status?: 'enabled' | 'disabled'
}

export type Product = {
  id: string
  categoryId?: string
  name: Localized
  summary: Localized
  tags?: string[]
  image?: string
  status?: 'draft' | 'published'
}

export type CertificateItem = {
  id: string
  title: Localized
  issuer?: string
  image?: string
  sort?: number
}

export type UserInfo = {
  token: string
  username: string
  role: Role
}

export type UserItem = {
  username: string
  role: Role
}

export type UploadItem = {
  file: string
  url: string
}

export type AuditLog = {
  id: string
  action: string
  detail: string
  actor: string
  createdAt: string
}

export type SessionItem = {
  token: string
  username: string
  role: Role
  createdAt: number
}

export type SiteModel = {
  company: {
    brand: Localized
    phone: string
    email: string
    address: Localized
  }
  home: {
    heroTitle: Localized
    heroBody: Localized
    stats: Array<{ value: string; label: Localized }>
    images: Record<string, string>
  }
  factory: {
    heroTitle: Localized
    heroBody: Localized
    images: Record<string, string>
  }
  about: {
    heroTitle: Localized
    heroBody: Localized
    images: Record<string, string>
  }
  contact: {
    heroTitle: Localized
    heroBody: Localized
    phone: string
    email: string
    address: Localized
    mapImage?: string
  }
  privacy: {
    heroTitle: Localized
    heroBody: Localized
  }
  productCategories: ProductCategory[]
  products: Product[]
  certificates: CertificateItem[]
}
