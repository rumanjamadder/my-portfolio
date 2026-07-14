import { useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme.js'
import LoadingScreen from './components/LoadingScreen.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Gallery from './components/Gallery.jsx'
import ResearchInterests from './components/ResearchInterests.jsx'
import Blog from './components/Blog.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import BlogPost from './components/BlogPost.jsx'
import SiteSettingsHead from './components/SiteSettingsHead.jsx'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (hash === '#/admin') {
    return (
      <>
        <SiteSettingsHead />
        <AdminPanel />
      </>
    )
  }

  if (hash.startsWith('#/blog/')) {
    const slug = hash.replace('#/blog/', '')
    return (
      <>
        <SiteSettingsHead />
        <BlogPost slug={slug} theme={theme} toggleTheme={toggleTheme} />
      </>
    )
  }

  return (
    <div className="relative grain">
      <SiteSettingsHead />
      <LoadingScreen />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Gallery />
        <ResearchInterests />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
