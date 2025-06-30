import './App.css'
import {createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Destinations } from './Destinations/Destinations'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer'
import { Main } from './Main/Main.tsx'
import { DestinationsShow } from './Destinations/DestinationsShow.jsx'
import axios from 'axios'
import { CreateNewDestination } from './CreateNewDestination/CreateNewDestination.jsx'
import { ImagesIndex } from './Images/ImagesIndex.jsx'
import { Login } from './LoginPage/LoginPage.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { SignUp } from './NewAccount/NewAccount.tsx'
import { AccountPage } from './Account/AccountPage.tsx'

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
        path: '/New Post', 
        element: <CreateNewDestination />
        }, 
        { 
          path: '/Images', 
          element: <ImagesIndex />
        }, 
        { 
          path: '/Login', 
          element: <Login />
        }, 
        { 
          path: '/Signup', 
          element: <SignUp />
        }, 
        { 
          path: '/account', 
          element: <AccountPage/>
        }

      ]
    }
  ])
function App() { 
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
