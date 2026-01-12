import React, { useState, useMemo, useEffect } from 'react'
import { useFlickr } from '../hooks/useFlickr'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { supabase } from '../supabaseClient'
import PhotoGrid from '../components/PhotoGrid'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import {
  Loader2, History, Moon, Sun,
  Calendar, Tag, User, LogIn, LogOut
} from 'lucide-react'

const PHOTOS_PER_PAGE = 4

export default function Home() {
  /* ================= AUTH ================= */
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

    return () => subscription.unsubscribe()
  }, [])

  /* ================= STATE ================= */
  const [search, setSearch] = useState('nature')
  const { photos, loading, error } = useFlickr(search)

  const historyKey = user ? `history_${user.id}` : 'history_guest'
  const darkKey = user ? `dark_${user.id}` : 'dark_guest'

  const [history, setHistory] = useLocalStorage(historyKey, [])
  const [dark, setDark] = useLocalStorage(darkKey, false)

  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ author: '', tag: '', date: '' })

  // 🔑 FLAG CRITIC (REZOLVĂ BUG-UL)
  const [isProfileLoaded, setIsProfileLoaded] = useState(false)

  /* ================= LOAD PROFIL ================= */
  useEffect(() => {
    if (!user) return

    const loadProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setDark(data.dark_mode)
        setHistory(data.search_history || [])
      } else {
        setDark(false)
        setHistory([])
      }

      // 🔓 abia ACUM avem voie să salvăm
      setIsProfileLoaded(true)
    }

    loadProfile()
  }, [user])

  /* ================= SAVE PROFIL ================= */
  useEffect(() => {
    if (!user || !isProfileLoaded) return

    const timer = setTimeout(() => {
      supabase.from('profiles').upsert({
        id: user.id,
        dark_mode: dark,
        search_history: history,
        updated_at: new Date()
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [dark, history, user, isProfileLoaded])

  /* ================= SEARCH ================= */
  const handleSearch = (term) => {
    if (!term.trim()) return

    setSearch(term)
    setCurrentPage(1)

    const newHistory = [
      term,
      ...history.filter(t => t !== term)
    ].slice(0, 10)

    setHistory(newHistory)
  }

  /* ================= LOGIN / LOGOUT ================= */
  const handleAuth = async () => {
    if (user) {
      await supabase.auth.signOut()
      localStorage.removeItem(historyKey)
      localStorage.removeItem(darkKey)
      window.location.reload()
    } else {
      const email = prompt('Email pentru Magic Link:')
      if (email) await supabase.auth.signInWithOtp({ email })
    }
  }

  /* ================= FILTERE ================= */
  const filteredPhotos = useMemo(() => {
    return photos.filter(p => {
      const matchAuthor = p.author.toLowerCase().includes(filters.author.toLowerCase())
      const matchTag = p.tags.toLowerCase().includes(filters.tag.toLowerCase())
      const matchDate = filters.date ? p.published.startsWith(filters.date) : true
      return matchAuthor && matchTag && matchDate
    })
  }, [photos, filters])

  const currentPhotos = filteredPhotos.slice(
    (currentPage - 1) * PHOTOS_PER_PAGE,
    currentPage * PHOTOS_PER_PAGE
  )

  /* ================= UI ================= */
  return (
    <div className={dark ? 'dark bg-gray-950 text-white min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-blue-600 dark:text-blue-400 uppercase italic">
              FlickrSearch
            </h1>
            {user && (
              <p className="text-[10px] opacity-50 mt-1">
                {user.email}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAuth}
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-bold text-sm flex gap-2"
            >
              {user ? <LogOut size={16} /> : <LogIn size={16} />}
              {user ? 'Logout' : 'Login'}
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="p-2.5 rounded-full bg-white dark:bg-gray-800 border"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        {/* HISTORY */}
        <div className="flex gap-3 my-8 overflow-x-auto">
          <History size={18} className="text-gray-400" />
          {history.map((tag, i) => (
            <button
              key={i}
              onClick={() => handleSearch(tag)}
              className="px-4 py-1.5 bg-white dark:bg-gray-800 border rounded-full text-xs font-bold"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* FILTERE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <input
            placeholder="Author"
            className="p-2 rounded"
            value={filters.author}
            onChange={e => setFilters({ ...filters, author: e.target.value })}
          />
          <input
            placeholder="Tag"
            className="p-2 rounded"
            value={filters.tag}
            onChange={e => setFilters({ ...filters, tag: e.target.value })}
          />
          <input
            type="date"
            className="p-2 rounded"
            value={filters.date}
            onChange={e => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <PhotoGrid photos={currentPhotos} />
            <Pagination
              currentPage={currentPage}
              totalPhotos={filteredPhotos.length}
              photosPerPage={PHOTOS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  )
}
