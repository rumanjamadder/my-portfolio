import { useState } from 'react'
import { Loader2, Upload } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient.js'
import { getAccent } from '../../data/accents.js'

const inputClass =
  'w-full rounded-[4px] border border-line-light dark:border-line-dark bg-transparent px-3 py-2 text-[13.5px] focus:border-brass dark:focus:border-brass-light outline-none transition-colors'
const labelClass = 'block text-[11px] uppercase tracking-wide text-ink-faint dark:text-bone-soft mb-1.5'

async function uploadFile(file, bucket) {
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  const { error } = await supabase.storage.from(bucket).upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export default function FieldInput({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const url = await uploadFile(file, field.bucket)
      onChange(url)
    } catch (err) {
      setUploadError(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  if (field.type === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-[13.5px] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-brass"
        />
        {field.label}
      </label>
    )
  }

  if (field.type === 'select') {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          <option value="" disabled>
            Choose…
          </option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (field.type === 'colorSwatch') {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <div className="flex gap-2">
          {field.options.map((opt) => {
            const accent = getAccent(opt)
            return (
              <button
                type="button"
                key={opt}
                onClick={() => onChange(opt)}
                aria-label={opt}
                className={`w-8 h-8 rounded-full ${accent.bar} ${
                  value === opt ? 'ring-2 ring-offset-2 ring-ink dark:ring-bone ring-offset-paper dark:ring-offset-night' : ''
                }`}
              />
            )
          })}
        </div>
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <textarea
          rows={field.rows || 3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>
    )
  }

  if (field.type === 'date') {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <input type="date" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      </div>
    )
  }

  if (field.type === 'image' || field.type === 'file') {
    const isImage = field.type === 'image'
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] border border-line-light dark:border-line-dark text-[12.5px] cursor-pointer hover:border-brass dark:hover:border-brass-light transition-colors">
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} strokeWidth={1.75} />}
            {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
            <input
              type="file"
              accept={field.accept || 'image/*'}
              onChange={handleUpload}
              className="hidden"
            />
          </label>
          {value && isImage && (
            <img src={value} alt="" className="w-14 h-14 rounded-[4px] object-cover border border-line-light dark:border-line-dark" />
          )}
          {value && !isImage && (
            <a href={value} target="_blank" rel="noreferrer" className="text-[12px] text-brass dark:text-brass-light truncate max-w-[180px]">
              View current file
            </a>
          )}
        </div>
        {uploadError && <p className="text-[12px] text-burgundy dark:text-burgundy-light mt-1">{uploadError}</p>}
      </div>
    )
  }

  // default: text
  return (
    <div>
      <label className={labelClass}>{field.label}</label>
      <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </div>
  )
}
