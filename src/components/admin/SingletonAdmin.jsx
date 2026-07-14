import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useSingleRow } from '../../hooks/useSupabaseData.js'
import FieldInput from './FieldInput.jsx'

export default function SingletonAdmin({ section }) {
  const { data, loading, update } = useSingleRow(section.table)
  const [form, setForm] = useState(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (data && !form) setForm(data)
  }, [data, form])

  if (loading || !form) {
    return (
      <div className="flex items-center gap-2 text-ink-faint dark:text-bone-soft py-6">
        <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
        <span className="text-[13px]">Loading…</span>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {}
    section.fields.forEach((f) => {
      payload[f.name] = form[f.name]
    })
    const result = await update(payload)
    if (result.error) setError(result.error)
    else {
      setError('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="catalog-card p-5 sm:p-6">
      <span className="catalog-hole" />
      <div className="pl-6">
        <h2 className="font-display text-lg font-medium mb-1">{section.label}</h2>
        {section.note && <p className="text-[12.5px] text-ink-faint dark:text-bone-soft mb-4">{section.note}</p>}
        <form onSubmit={handleSubmit} className={`grid sm:grid-cols-2 gap-4 ${section.note ? '' : 'mt-4'}`}>
          {section.fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' || field.type === 'boolean' ? 'sm:col-span-2' : ''}>
              <FieldInput
                field={field}
                value={form[field.name]}
                onChange={(val) => setForm((f) => ({ ...f, [field.name]: val }))}
              />
            </div>
          ))}
          <div className="sm:col-span-2 flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-ink text-paper dark:bg-bone dark:text-night text-[13px] font-medium hover:opacity-85 transition-opacity"
            >
              Save changes
            </button>
            {saved && <span className="text-[12.5px] text-brass dark:text-brass-light">Saved — live on the site now.</span>}
            {error && <span className="text-[12.5px] text-burgundy dark:text-burgundy-light">{error}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
