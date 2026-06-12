import type { Core } from '@strapi/strapi'

type PluginStoreDefaults = Record<string, Record<string, unknown>>

const ensurePluginStoreDefaults = async (
  strapi: Core.Strapi,
  pluginName: string,
  defaults: PluginStoreDefaults
) => {
  for (const [key, defaultValue] of Object.entries(defaults)) {
    const store = strapi.store({
      type: 'plugin',
      name: pluginName,
      key
    })

    const rawValue = await store.get({})
    const currentValue = rawValue && typeof rawValue === 'object' ? (rawValue as Record<string, unknown>) : {}
    const mergedValue = { ...defaultValue, ...currentValue }
    const missingKeys = Object.keys(defaultValue).filter(
      (itemKey) => !Object.prototype.hasOwnProperty.call(currentValue, itemKey)
    )

    if (missingKeys.length > 0) {
      await store.set({ value: mergedValue })
      strapi.log.info(
        `[self-heal] patched plugin store ${pluginName}.${key}: ${missingKeys.join(', ')}`
      )
    }
  }
}

const ensureUploadPluginStore = async (strapi: Core.Strapi) => {
  await ensurePluginStoreDefaults(strapi, 'upload', {
    settings: {
      sizeOptimization: true,
      responsiveDimensions: true,
      autoOrientation: false,
      aiMetadata: true
    },
    view_configuration: {
      pageSize: 24,
      sort: 'createdAt:DESC'
    }
  })
}

export const runBootstrapSelfHeal = async (strapi: Core.Strapi) => {
  await ensureUploadPluginStore(strapi)
}
