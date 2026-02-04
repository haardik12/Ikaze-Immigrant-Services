import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import AboutUs from './components/AboutUs.jsx'
import Blog from './components/Blog.jsx'
import Services from './components/Services.jsx'
import ContactUs from './components/ContactUs.jsx'
import Donate from './components/Donate.jsx'
import Login from './components/Admins/Login.jsx'
import Admin from './components/Admins/Admin.jsx'
import Description from './components/Description/Description.jsx'
import DashBoard from './components/Admin components/Functions/Dashboard.jsx'
import AddBlogs from './components/Admin components/Functions/AddBlogs.jsx'
import EditBlogs from './components/Admin components/Functions/EditBlogs.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import 'quill/dist/quill.snow.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },


      { path: 'about', element: <AboutUs /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <Description /> },
      { path: 'programs', element: <Services /> },
      { path: 'join-us', element: <ContactUs /> },
      { path: 'donate', element: <Donate /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DashBoard /> },
          { path: 'dashboard', element: <DashBoard /> },
          { path: 'add-blogs', element: <AddBlogs /> },
          { path: 'edit-blogs', element: <EditBlogs /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
