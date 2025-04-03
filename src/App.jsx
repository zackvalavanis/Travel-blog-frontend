import './App.css'
import {createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Destinations } from './Destinations/Destinations'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer'
import { Main } from './Main/Main'
import { DestinationsShow } from './Destinations/DestinationsShow.jsx'
import axios from 'axios'

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
        }, 
        { 
          path: '/destinations/:id', 
          element: <DestinationsShow />, 
          loader: ({params}) => axios.get(`http://localhost:3000/destinations/${params.id}.json`).then((response) => response.data)
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
