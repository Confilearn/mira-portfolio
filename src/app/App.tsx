import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { LenisProvider } from '@/animations/LenisProvider'
import { router } from '@/app/router'

function App() {
  return (
    <HelmetProvider>
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </HelmetProvider>
  )
}

export default App
