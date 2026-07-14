import { useMemo, useState } from 'react'
import { Plus, X, Pencil, Trash2, Search, Eye, EyeOff, ArrowUp, ArrowDown, ExternalLink, Loader2 } from 'lucide-react'
import { useTable } from '../../hooks/useSupabaseData.js'
import FieldInput from './FieldInput.jsx'

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function emptyValues(fields) {
  const v = {}
  fields.forEach((f) => {
    v[f.name] = f.type === 'boolean' ? false : ''
  })
  return v
}

export default function SectionAdmin({ section }) {
  const { items, loading, add, update, remove, refresh, error } = useTable(section.table, {
    orderBy: section.orderField || 'created_at',
    ascending: section.orderAscending ?? false,
  })

  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(() => emptyValues(section.fields))
  const [saveError, setSaveError] = useState('')
  const [query, setQuery] = useState('')
  const [previewId, setPreviewId] = useState(null)
  const [confirmingId, setConfirmingId] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter((item) =>
      (section.searchFields || []).some((f) => String(item[f] || '').toLowerCase().includes(q))
    )
  }, [items, query, section.searchFields])

  const startEdit = (item) => {
    setEditingId(item.id)
    setForm({ ...emptyValues(section.fields), ...item })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyValues(section.fields))
    setSaveError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const firstRequired = section.fields.find((f) => f.required && !String(form[f.name] || '').trim())
    if (firstRequired) {
      setSaveError(`"${firstRequired.label}" is required.`)
      return
    }
    const payload = {}
    section.fields.forEach((f) => {
      payload[f.name] = form[f.name]
    })
    if (section.slugFrom && !editingId) {
      payload.slug = slugify(form[section.slugFrom]) || `${section.key}-${Date.now()}`
    }
    const result = editingId ? await update(editingId, payload) : await add(payload)
    if (result.error) setSaveError(result.error)
    else {
      setSaveError('')
      cancelEdit()
    }
  }

  const handleDelete = async (id) => {
    if (confirmingId !== id) {
      setConfirmingId(id)
      return
    }
    setConfirmingId(null)
    await remove(id)
  }

  const move = async (index, direction) => {
    const a = filtered[index]
    const b = filtered[index + direction]
    if (!a || !b) return
    const aOrder = a.sort_order ?? 0
    const bOrder = b.sort_order ?? 0
    await Promise.all([update(a.id, { sort_order: bOrder }), update(b.id, { sort_order: aOrder })])
    await refresh()
  }

  const reorderable = Boolean(section.orderField === 'sort_order' && !query.trim())

  return (
    <div>
      <div className="catalog-card p-5 sm:p-6 mb-8">
        <span className="catalog-hole" />
        <div className="pl-6">
          <h2 className="font-display text-lg font-medium mb-1">{editingId ? `Edit ${section.label.toLowerCase()}` : `Add to ${section.label}`}</h2>
          {section.note && <p className="text-[12.5px] text-ink-faint dark:text-bone-soft mb-4">{section.note}</p>}
          <form onSubmit={handleSubmit} className={`grid sm:grid-cols-2 gap-4 ${section.note ? '' : 'mt-4'}`}>
            {section.fields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' || field.type === 'boolean' || field.type === 'image' || field.type === 'file' ? 'sm:col-span-2' : ''}>
                <FieldInput
                  field={field}
                  value={form[field.name]}
                  onChange={(val) => setForm((f) => ({ ...f, [field.name]: val }))}
                />
              </div>
            ))}
            <div className="sm:col-span-2 flex items-center gap-2 pt-1 flex-wrap">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-paper dark:bg-bone dark:text-night text-[13px] font-medium hover:opacity-85 transition-opacity"
              >
                <Plus size={13} strokeWidth={2} />
                {editingId ? 'Update' : 'Add'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-line-light dark:border-line-dark text-[13px]"
                >
                  <X size={13} strokeWidth={2} />
                  Cancel
                </button>
              )}
              {saveError && <span className="text-[12.5px] text-burgundy dark:text-burgundy-light">{saveError}</span>}
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint dark:text-bone-soft" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${section.label.toLowerCase()}…`}
            className="w-full rounded-full border border-line-light dark:border-line-dark bg-transparent pl-8 pr-3 py-1.5 text-[12.5px] focus:border-brass dark:focus:border-brass-light outline-none transition-colors"
          />
        </div>
        <span className="text-[12px] text-ink-faint dark:text-bone-soft whitespace-nowrap">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {error && <p className="text-[12.5px] text-burgundy dark:text-burgundy-light mb-3">{error}</p>}

      {loading ? (
        <div className="flex items-center gap-2 text-ink-faint dark:text-bone-soft py-6">
          <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
          <span className="text-[13px]">Loading…</span>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-[13px] text-ink-faint dark:text-bone-soft">
          {items.length === 0 ? 'Nothing here yet — add your first one above.' : 'No results match your search.'}
        </p>
      ) : section.isImageGrid ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="rounded-[6px] border border-line-light dark:border-line-dark overflow-hidden">
              <img src={item.src} alt={item.caption} className="w-full aspect-[4/3] object-cover" />
              <div className="p-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-medium truncate">{item.caption}</p>
                  <p className="text-[11px] text-ink-faint dark:text-bone-soft mt-0.5">{item.category}</p>
                </div>
                <RowActions
                  item={item}
                  index={i}
                  total={filtered.length}
                  reorderable={reorderable}
                  onMove={move}
                  onEdit={() => startEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                  confirming={confirmingId === item.id}
                  onCancelConfirm={() => setConfirmingId(null)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((item, i) => (
            <li key={item.id} className="rounded-[6px] border border-line-light dark:border-line-dark p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {item.code && <p className="font-mono text-[10px] text-ink-faint dark:text-bone-soft">{item.code}</p>}
                  <p className="font-medium text-[14px] mt-0.5 truncate">{item[section.primary]}</p>
                  {section.secondary && item[section.secondary] && (
                    <p className="text-[13px] text-ink-soft dark:text-bone-soft mt-0.5">{item[section.secondary]}</p>
                  )}
                  {section.linkPreview && (
                    <a href={section.linkPreview(item)} className="inline-flex items-center gap-1 text-[12px] text-brass dark:text-brass-light mt-1">
                      View live <ExternalLink size={11} strokeWidth={2} />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPreviewId(previewId === item.id ? null : item.id)}
                    aria-label="Preview"
                    className="w-8 h-8 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center hover:border-brass dark:hover:border-brass-light transition-colors"
                  >
                    {previewId === item.id ? <EyeOff size={12.5} strokeWidth={1.75} /> : <Eye size={12.5} strokeWidth={1.75} />}
                  </button>
                  <RowActions
                    item={item}
                    index={i}
                    total={filtered.length}
                    reorderable={reorderable}
                    onMove={move}
                    onEdit={() => startEdit(item)}
                    onDelete={() => handleDelete(item.id)}
                    confirming={confirmingId === item.id}
                    onCancelConfirm={() => setConfirmingId(null)}
                  />
                </div>
              </div>

              {previewId === item.id && (
                <div className="mt-3 pt-3 border-t border-line-light dark:border-line-dark grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {section.fields.map((f) => (
                    <div key={f.name} className="text-[12.5px]">
                      <span className="text-ink-faint dark:text-bone-soft">{f.label}: </span>
                      {f.type === 'image' || f.type === 'file' ? (
                        item[f.name] ? (
                          <a href={item[f.name]} target="_blank" rel="noreferrer" className="text-brass dark:text-brass-light">
                            view file
                          </a>
                        ) : (
                          <span className="text-ink-faint dark:text-bone-soft">—</span>
                        )
                      ) : (
                        <span className="text-ink dark:text-bone">{String(item[f.name] ?? '') || '—'}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RowActions({ item, index, total, reorderable, onMove, onEdit, onDelete, confirming, onCancelConfirm }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {reorderable && (
        <>
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(index, -1)}
            aria-label="Move up"
            className="w-8 h-8 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center hover:border-brass dark:hover:border-brass-light transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowUp size={12.5} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove(index, 1)}
            aria-label="Move down"
            className="w-8 h-8 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center hover:border-brass dark:hover:border-brass-light transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowDown size={12.5} strokeWidth={1.75} />
          </button>
        </>
      )}
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit"
        className="w-8 h-8 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center hover:border-brass dark:hover:border-brass-light transition-colors"
      >
        <Pencil size={12.5} strokeWidth={1.75} />
      </button>
      {confirming ? (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onDelete}
            className="px-2.5 h-8 rounded-full bg-burgundy text-bone text-[11.5px] font-medium whitespace-nowrap"
          >
            Confirm delete
          </button>
          <button
            type="button"
            onClick={onCancelConfirm}
            aria-label="Cancel delete"
            className="w-8 h-8 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center"
          >
            <X size={12.5} strokeWidth={1.75} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete"
          className="w-8 h-8 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center hover:border-burgundy dark:hover:border-burgundy-light hover:text-burgundy dark:hover:text-burgundy-light transition-colors"
        >
          <Trash2 size={12.5} strokeWidth={1.75} />
        </button>
      )}
    </div>
  )
}
