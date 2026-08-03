import { useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { LenisProvider } from '@/animations/LenisProvider'
import { router } from '@/app/router'
import { Loader } from '@/components/Loader'
import { LOADER_DEV_CONFIG } from '@/constants/loader'

/** Skips the loader outright in `npm run dev` when disabled — always full-length in production. */
const SHOW_LOADER = !import.meta.env.DEV || LOADER_DEV_CONFIG.enabled

function App() {
  const [loaderDone, setLoaderDone] = useState(!SHOW_LOADER)

  return (
    <HelmetProvider>
      {!loaderDone && <Loader onFinished={() => setLoaderDone(true)} />}
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </HelmetProvider>
  )
}

export default App
