import './App.css'
import {createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Destinations } from './Destinations/Destinations'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'

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
