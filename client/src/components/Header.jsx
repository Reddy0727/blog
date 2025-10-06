import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

function Header() {
    const pathname = useLocation().pathname;
    const {currentUser} = useSelector((state)=>state.user)
    const {theme} = useSelector((state)=>state.theme)
    const dispatch = useDispatch()
  return (
    <Navbar className="border-b-1 p-4" fluid rounded>
        <Link to='/' className="self-center flex justify-between items-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span 
                className="px-2 py-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-lg text-white"
            >
                Blog
            </span> 
        </Link>
        <form>
            <div className="flex gap-2 items-center border-1 py-1.5 px-4 border-slate-300 rounded-full">
              <AiOutlineSearch  className="text-1.5xl bg-red"/>
              <input type="text" placeholder="search...." className="border-none outline-none bg-transparent" />
            </div>
        </form>
        <Button className="w-12 h-10 lg:hidden inline" color="gray"><AiOutlineSearch /></Button>
        <div className='flex gap-2 md:order-2'>
            <Button color="blue" onClick={()=>dispatch(toggleTheme())}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
            {currentUser ? 
               (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="user avatar"
                      img={currentUser.data.profilePicture}
                      rounded
                    
                    />
                  }
                >
                  <DropdownHeader>
                    <span className="block text-sm">@{currentUser.data.username}</span>
                    <span className="block text-sm">{currentUser.data.email}</span>
                  </DropdownHeader>
                  <Link to='/dashboard?tab=profile'>
                    <DropdownItem>
                      Profile
                    </DropdownItem>
                  </Link>
                  <DropdownDivider />
                  <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
               ) 
               : (
                 <Link to='/signin'>
                    <Button color="blue" outline>
                        Sign In
                    </Button>
                  </Link>
               )
            }
          
        </div>
        <NavbarToggle />
        <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about" active={pathname === "/about"}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/projects" active={pathname === "/projects"}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header
