import './App.css'
import {createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Destinations } from './Destinations/Destinations'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer'
import { Main } from './Main/Main'
import { DestinationsShow } from './Destinations/DestinationsShow.jsx'
import axios from 'axios'
import { CreateNewDestination } from './createNewDestination/createNewDestination.jsx'
import { ImagesIndex } from './Images/ImagesIndex.jsx'

  const router = createBrowserRouter([
    {
      element: ( 
        <div className='layout'>
            <Header />
            <main className='main-content'>
            <Outlet />
            </main>
            <Footer/>
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
        }, 
        {
        path: '/CreateNewDestination', 
        element: <CreateNewDestination />
        }, 
        { 
          path: '/Images', 
          element: <ImagesIndex />
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
