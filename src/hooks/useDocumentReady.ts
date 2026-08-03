import { useEffect, useState } from 'react'

/**
 * True once the document has finished loading (`readyState === 'complete'`) —
 * by which point the Hero's eagerly-loaded, high-priority image has resolved.
 * Below-the-fold `loading="lazy"` images don't block this, since the browser
 * only fetches them once they near the viewport.
 */
export function useDocumentReady() {
  const [ready, setReady] = useState(() => document.readyState === 'complete')

  useEffect(() => {
    if (ready) return

    function handleLoad() {
      setReady(true)
    }

    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [ready])

  return ready
}
