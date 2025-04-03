import './App.css'
import {createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Destinations } from './Destinations/Destinations'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer'
import { Main } from './Main/Main'

  const router = createBrowserRouter([
    {
      element: ( 
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
      ), 
      children: [
        { 
          path: '/', 
          element: <Main/>
        }, 
        { 
          path: '/destinations', 
          element: <Destinations/>
        }
      ]
    }
  ])
function App() { 
  return (
    <RouterProvider router={router} />
  )
}

export default App
