import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

const routes = createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[
      {path:'/',element:<Home />},
      {path:'/dashboard',element:<Dashboard />},
      {path:'/projects',element:<Projects />},
      {path:'/about',element:<About />},
      {path:'/signin',element:<Signin />},
      {path:'/signup',element:<Signup />},
      {path:'*',element:<h1>404 Not Found</h1>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
          <RouterProvider router={routes} />
      </Provider>
    </PersistGate>
  </StrictMode>,
)
