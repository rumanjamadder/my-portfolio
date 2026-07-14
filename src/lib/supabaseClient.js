import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw — let the app render with a clear on-screen message instead
  // of a blank white page, since this is the most common first-setup issue.
  console.error(
    'Missing Supabase environment variables. Add VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_ANON_KEY to a .env file (see .env.example) and restart the dev server.'
  )
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
