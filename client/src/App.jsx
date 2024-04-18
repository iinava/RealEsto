import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './pages/HomePage/Hero';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { Layout, RequireAuth } from '../Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Listpage from './pages/PropertyList/Listpage';
import SinglePage from './pages/PropertyList/SinglePage';
import ProfilePage from './pages/Profile/ProfilePage';
import { ProfileLoader, listloader, singlepageLoader } from './lib/loders';
import UpdateProfile from './pages/Profile/UpdateProfile';
import AddPost from './pages/Addpost/AddPost';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<Hero/>
        },
        {
          path:"/list",
          element:<Listpage/>,
          loader:listloader
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlepageLoader,
        },
       
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Registration/>
        }
      ]
    },{
      path: "/",
      element: <RequireAuth />,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader:ProfileLoader
        },
        {
          path:"/update",
          element:<UpdateProfile/>
        },
        {
          path:"/addpost",
          element:<AddPost/>
        },
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;

