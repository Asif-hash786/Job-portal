import React from 'react'
import { RouterProvider } from 'react-router-dom'
import appRouter from './lib/Routes'
import { Toaster } from './components/ui/toast'
const App = () => {
  return (
    <div>
      <Toaster/>
      <RouterProvider router={appRouter}/>
    </div>
  )
}
export default App