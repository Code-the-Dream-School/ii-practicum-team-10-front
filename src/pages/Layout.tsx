import React from "react"
import { Outlet } from "react-router-dom"
import HomeNavbar from "../components/home/home_navbar/HomeNavbar"
import FooterComponent from "../components/home/footer_section/FooterSection"
import Navbar from "../components/user/navbar/Navbar"
import useAuth from "../hooks/useAuth"

const Layout: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <header>
        {user ? <Navbar/> : <HomeNavbar />}
      </header>
      <article className="mb-auto">
        <div className="relative left-[50%] translate-x-[-50%] w-full">
          <Outlet />
        </div>
      </article>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  )
}

export default Layout