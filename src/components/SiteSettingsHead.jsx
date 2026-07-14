import { useEffect } from 'react'
import { useSingleRow } from '../hooks/useSupabaseData.js'

/**
 * Renders nothing. Just keeps document.title and the meta description tag
 * in sync with the "Website Settings" admin section, so those are editable
 * without ever touching index.html or any visible layout.
 */
export default function SiteSettingsHead() {
  const { data: settings } = useSingleRow('site_settings')

  useEffect(() => {
    if (settings?.site_title) {
      document.title = settings.site_title
    }
    if (settings?.meta_description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', settings.meta_description)
    }
  }, [settings])

  return null
}
