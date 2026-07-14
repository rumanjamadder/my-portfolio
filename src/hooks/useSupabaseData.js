import { useCallback, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'

/**
 * Reads a table for every visitor (public, no login needed) and exposes
 * add/update/remove for the admin panel (writes only succeed when logged
 * in — enforced server-side by Supabase Row Level Security policies).
 */
export function useTable(table, { orderBy = 'created_at', ascending = false } = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      setError('Supabase is not configured yet.')
      return
    }
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending })
    if (fetchError) setError(fetchError.message)
    else {
      setItems(data || [])
      setError(null)
    }
    setLoading(false)
  }, [table, orderBy, ascending])

  useEffect(() => {
    refresh()
  }, [refresh])

  const add = useCallback(
    async (row) => {
      const { error: insertError } = await supabase.from(table).insert(row)
      if (insertError) return { error: insertError.message }
      await refresh()
      return { error: null }
    },
    [table, refresh]
  )

  const update = useCallback(
    async (id, patch) => {
      const { error: updateError } = await supabase.from(table).update(patch).eq('id', id)
      if (updateError) return { error: updateError.message }
      await refresh()
      return { error: null }
    },
    [table, refresh]
  )

  const remove = useCallback(
    async (id) => {
      const { error: deleteError } = await supabase.from(table).delete().eq('id', id)
      if (deleteError) return { error: deleteError.message }
      await refresh()
      return { error: null }
    },
    [table, refresh]
  )

  return { items, loading, error, add, update, remove, refresh }
}

/**
 * Reads/writes a single-row "settings-style" table (hero, about, contact,
 * site_settings — anything with exactly one row, id fixed to 1).
 */
export function useSingleRow(table) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      setError('Supabase is not configured yet.')
      return
    }
    setLoading(true)
    const { data: row, error: fetchError } = await supabase.from(table).select('*').eq('id', 1).single()
    if (fetchError) setError(fetchError.message)
    else {
      setData(row)
      setError(null)
    }
    setLoading(false)
  }, [table])

  useEffect(() => {
    refresh()
  }, [refresh])

  const update = useCallback(
    async (patch) => {
      const { error: updateError } = await supabase.from(table).update(patch).eq('id', 1)
      if (updateError) return { error: updateError.message }
      await refresh()
      return { error: null }
    },
    [table, refresh]
  )

  return { data, loading, error, update, refresh }
}
