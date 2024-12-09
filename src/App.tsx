import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from '@/routes/routes'
import { AutoCompleteProvider } from '@/context/AutoCompleteContext'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AutoCompleteProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Routes>
        </Suspense>
      </AutoCompleteProvider>
    </BrowserRouter>
  )
}

export default App
