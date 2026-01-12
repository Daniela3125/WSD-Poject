import { useEffect, useState } from 'react'
import { fetchPhotos } from '../services/flickrApi'

export function useFlickr(search) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!search) return
    let ignore = false
    setLoading(true)
    setError(null)

    fetchPhotos(search)
      .then((data) => {
        if (!ignore) setPhotos(data)
      })
      .catch((err) => {
        // Constrângere: Gestionare rate limits
        if (err.message.includes('429')) {
          setError('Flickr rate limit reached. Too many requests, please wait.')
        } else {
          setError('Could not connect to Flickr. Please try again.')
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => { ignore = true }
  }, [search])

  return { photos, loading, error }
}