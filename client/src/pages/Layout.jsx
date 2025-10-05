import { Outlet } from 'react-router-dom'
import Header from '../components/Header';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import FooterCom from '../components/Footer';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <ToastContainer />
      <FooterCom />
    </div>
  )
}

export default Layout
