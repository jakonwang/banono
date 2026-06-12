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

  const uploadPlugin = strapi.plugin('upload')
  const uploadService = uploadPlugin?.service('upload') as
    | {
        getSettings?: () => Promise<Record<string, unknown> | null>
        setSettings?: (value: Record<string, unknown>) => Promise<void>
        getConfiguration?: () => Promise<Record<string, unknown> | null>
        setConfiguration?: (value: Record<string, unknown>) => Promise<void>
      }
    | undefined

  const expectedSettings = {
    sizeOptimization: true,
    responsiveDimensions: true,
    autoOrientation: false,
    aiMetadata: true
  }

  const expectedConfiguration = {
    pageSize: 24,
    sort: 'createdAt:DESC'
  }

  if (uploadService?.getSettings && uploadService?.setSettings) {
    const currentSettings = (await uploadService.getSettings()) || {}
    const missingSettings = Object.keys(expectedSettings).filter(
      (key) => !Object.prototype.hasOwnProperty.call(currentSettings, key)
    )

    if (missingSettings.length > 0) {
      await uploadService.setSettings({ ...expectedSettings, ...currentSettings })
      strapi.log.info(
        `[self-heal] patched upload service settings: ${missingSettings.join(', ')}`
      )
    }
  }

  if (uploadService?.getConfiguration && uploadService?.setConfiguration) {
    const currentConfiguration = (await uploadService.getConfiguration()) || {}
    const missingConfiguration = Object.keys(expectedConfiguration).filter(
      (key) => !Object.prototype.hasOwnProperty.call(currentConfiguration, key)
    )

    if (missingConfiguration.length > 0) {
      await uploadService.setConfiguration({ ...expectedConfiguration, ...currentConfiguration })
      strapi.log.info(
        `[self-heal] patched upload service configuration: ${missingConfiguration.join(', ')}`
      )
    }
  }
}

export const runBootstrapSelfHeal = async (strapi: Core.Strapi) => {
  await ensureUploadPluginStore(strapi)
}
