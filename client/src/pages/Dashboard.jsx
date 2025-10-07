import { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react'
import {HiUser,HiArrowRight} from 'react-icons/hi'
const Dashboard = () => {
   const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);  
  return (
    <div>
      <Sidebar >
        <SidebarItems className='w-full md:w-56 min-h-screen'>
          <SidebarItemGroup>
                 <SidebarItem as={Link} to='/dashboard?tab=profile'
                active={tab === 'profile'}
                icon={HiUser}
                label='user'
                labelColor='dark'
              >
                Profile
              </SidebarItem>
              <SidebarItem
                icon={HiArrowRight}
                className='cursor-pointer'
              >
                Signout
              </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  )
}

export default Dashboard
