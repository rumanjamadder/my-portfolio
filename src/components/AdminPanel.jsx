import { useEffect, useState } from 'react'
import { Lock, ArrowLeft, LogOut, Loader2, AlertTriangle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { sections } from '../admin/sectionsConfig.js'
import SectionAdmin from './admin/SectionAdmin.jsx'
import SingletonAdmin from './admin/SingletonAdmin.jsx'

const inputClass =
  'w-full rounded-[4px] border border-line-light dark:border-line-dark bg-transparent px-3 py-2 text-[13.5px] focus:border-brass dark:focus:border-brass-light outline-none transition-colors'

function goHome(e) {
  e.preventDefault()
  window.location.hash = ''
}

// If Supabase env vars are missing, show a clear setup message instead of
// a confusing crash — this is the most likely state on a first run.
function NotConfigured() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <a href="#" onClick={goHome} className="inline-flex items-center gap-2 text-[13px] text-ink-soft dark:text-bone-soft hover:text-brass dark:hover:text-brass-light mb-8 transition-colors">
          <ArrowLeft size={14} strokeWidth={2} />
          Back to site
        </a>
        <div className="catalog-card p-7">
          <span className="catalog-hole" />
          <div className="pl-6">
            <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
              <AlertTriangle size={16} strokeWidth={1.75} className="text-burgundy dark:text-burgundy-light" />
            </div>
            <h1 className="font-display text-xl font-medium">Supabase isn't configured yet</h1>
            <p className="text-[13.5px] text-ink-soft dark:text-bone-soft mt-2 leading-relaxed">
              Add <code className="font-mono text-[12px] bg-paper-soft dark:bg-night-soft px-1 rounded">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-mono text-[12px] bg-paper-soft dark:bg-night-soft px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to a{' '}
              <code className="font-mono text-[12px] bg-paper-soft dark:bg-night-soft px-1 rounded">.env</code> file (see{' '}
              <code className="font-mono text-[12px] bg-paper-soft dark:bg-night-soft px-1 rounded">.env.example</code>), then restart the dev server or redeploy. See the README's "Connect your database" section for the full walkthrough.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPanel() {
  const [session, setSession] = useState(undefined) // undefined = checking, null = signed out
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [tab, setTab] = useState(sections[0].key)

  // supabase-js persists the session in localStorage by default, so once
  // signed in you stay signed in across reloads/visits until you sign out
  // or the token expires — no extra code needed for "persistent login".
  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (!isSupabaseConfigured) {
    return <NotConfigured />
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setSigningIn(true)
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSigningIn(false)
    if (error) setAuthError(error.message)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-faint dark:text-bone-soft gap-2">
        <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
        <span className="text-[13px]">Checking session…</span>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <a href="#" onClick={goHome} className="inline-flex items-center gap-2 text-[13px] text-ink-soft dark:text-bone-soft hover:text-brass dark:hover:text-brass-light mb-8 transition-colors">
            <ArrowLeft size={14} strokeWidth={2} />
            Back to site
          </a>
          <div className="catalog-card p-7">
            <span className="catalog-hole" />
            <div className="pl-6">
              <div className="w-10 h-10 rounded-full bg-paper-soft dark:bg-night-soft border border-line-light dark:border-line-dark flex items-center justify-center mb-4">
                <Lock size={15} strokeWidth={1.75} className="text-brass dark:text-brass-light" />
              </div>
              <h1 className="font-display text-xl font-medium">Admin sign in</h1>
              <p className="text-[13px] text-ink-soft dark:text-bone-soft mt-2">
                Sign in with the admin account you created in Supabase to manage every section of the site.
              </p>
              <form onSubmit={handleLogin} className="mt-5 space-y-3">
                <input
                  type="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={inputClass}
                />
                {authError && <p className="text-[12.5px] text-burgundy dark:text-burgundy-light">{authError}</p>}
                <button
                  type="submit"
                  disabled={signingIn}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-ink text-paper dark:bg-bone dark:text-night text-[13.5px] font-medium hover:opacity-85 transition-opacity disabled:opacity-60"
                >
                  {signingIn && <Loader2 size={14} className="animate-spin" />}
                  Sign in
                </button>
              </form>
              <p className="text-[11.5px] text-ink-faint dark:text-bone-soft mt-4 leading-relaxed">
                No account yet? Create one in your Supabase dashboard: Authentication → Users → Add user.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const activeSection = sections.find((s) => s.key === tab)

  return (
    <div className="min-h-screen">
      <header className="border-b border-line-light dark:border-line-dark sticky top-0 bg-paper/90 dark:bg-night/90 backdrop-blur-md z-10">
        <div className="mx-auto max-w-content px-5 md:px-8 py-4 flex items-center justify-between">
          <a href="#" onClick={goHome} className="inline-flex items-center gap-2 text-[13px] hover:text-brass dark:hover:text-brass-light transition-colors">
            <ArrowLeft size={14} strokeWidth={2} />
            Back to site
          </a>
          <div className="flex items-center gap-4">
            <p className="eyebrow hidden sm:block">Admin Panel</p>
            <button onClick={handleLogout} className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft dark:text-bone-soft hover:text-burgundy dark:hover:text-burgundy-light transition-colors">
              <LogOut size={13} strokeWidth={1.75} />
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-content px-5 md:px-8 flex gap-1 pb-3 overflow-x-auto">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setTab(s.key)}
              className={`px-4 py-2 rounded-full text-[13px] whitespace-nowrap transition-colors ${
                tab === s.key
                  ? 'bg-ink text-paper dark:bg-bone dark:text-night'
                  : 'border border-line-light dark:border-line-dark text-ink-soft dark:text-bone-soft hover:border-brass dark:hover:border-brass-light'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-content px-5 md:px-8 py-10">
        {activeSection.type === 'singleton' ? (
          <SingletonAdmin key={activeSection.key} section={activeSection} />
        ) : (
          <SectionAdmin key={activeSection.key} section={activeSection} />
        )}
      </main>
    </div>
  )
}
