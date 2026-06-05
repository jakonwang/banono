import { defineStore } from 'pinia'
import {
  changePassword,
  createCategory,
  createCertificate,
  createProduct,
  createUser,
  deleteCategory,
  deleteCertificate,
  deleteProduct,
  deleteSession,
  deleteUser,
  getAuditLogs,
  getCategories,
  getCertificates,
  getInquiries,
  getProducts,
  getSessions,
  getSiteModel,
  getUploads,
  getUsers,
  updateCategory,
  updateCertificate,
  updateInquiry,
  updateProduct,
  updateSiteSection,
  uploadAsset
} from '../api/content'
import type { AuditLog, CertificateItem, Inquiry, Product, ProductCategory, SessionItem, SiteModel, UploadItem, UserItem } from '../types'

export const useContentStore = defineStore('content', {
  state: () => ({
    siteModel: null as SiteModel | null,
    inquiries: [] as Inquiry[],
    categories: [] as ProductCategory[],
    products: [] as Product[],
    certificates: [] as CertificateItem[],
    uploads: [] as UploadItem[],
    users: [] as UserItem[],
    auditLogs: [] as AuditLog[],
    sessions: [] as SessionItem[]
  }),
  actions: {
    async loadDashboard() {
      const [siteModel, inquiries, categories, products, certificates, uploads] = await Promise.all([
        getSiteModel(),
        getInquiries(),
        getCategories(),
        getProducts(),
        getCertificates(),
        getUploads()
      ])
      this.siteModel = siteModel
      this.inquiries = inquiries
      this.categories = categories
      this.products = products
      this.certificates = certificates
      this.uploads = uploads
    },
    async loadSecurity() {
      const [users, auditLogs, sessions] = await Promise.all([getUsers(), getAuditLogs(), getSessions()])
      this.users = users
      this.auditLogs = auditLogs
      this.sessions = sessions
    },
    updateSiteSection,
    updateInquiry,
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    uploadAsset,
    createUser,
    deleteUser,
    changePassword,
    deleteSession
  }
})
