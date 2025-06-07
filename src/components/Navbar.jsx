import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <h1 className="text-2xl font-bold text-amber-500 cursor-pointer">PasteApp</h1>
        </Link>
        <nav className="flex gap-6 text-lg font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-amber-500" : "hover:text-amber-500 transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive ? "text-amber-500" : "hover:text-amber-500 transition-colors"
            }
          >
            Pastes
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
