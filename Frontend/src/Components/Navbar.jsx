import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import { MdLightMode, MdDarkMode, MdClose } from 'react-icons/md';
import { CiMenuBurger } from 'react-icons/ci';
import { useTheme } from './ThemeContext.jsx';

export default function Navbar() {
  const location = useLocation();
  const { dark, setDark } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close sidebar when the route changes
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Login / Sign Up', path: '/auth' }
  ];

  return (
    <>
      {/* 1. Base Styling: Solid white background, sticky, subtle shadow */}
      <header className="w-full bg-stone-100 dark:bg-stone-900 shadow-sm border-b border-amber-900 dark:border-orange-300 sticky top-0 z-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-[90px] flex items-center justify-between">

          {/* 2. Logo Area (Left) */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group z-10 shrink-0">
            <div className="bg-amber-900 text-white p-3 rounded-xl shadow-md group-hover:bg-amber-800 transition-colors">
              <FaPrint className="text-2xl" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-black tracking-tight text-amber-950 dark:text-orange-300 block leading-none">JN Enterprise</span>
            </div>
          </Link>

          {/* 3. Desktop Navigation Links (Center) */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-10 z-10">
            {navLinks.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Link
                  key={page.name}
                  to={page.path}
                  className={`relative py-2 text-base font-bold tracking-wide uppercase transition-all duration-300
                    text-amber-900 hover:text-amber-950 dark:text-stone-300 hover:-translate-y-1
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-amber-900 dark:after:bg-zinc-200
                    after:transition-all after:duration-300
                    ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {page.name}
                </Link>
              );
            })}
          </nav>

          {/* 4. Action Buttons (Right) */}
          <div className="relative flex items-center space-x-4 z-20 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                setDark(!dark), 200
              }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-amber-950 text-white hover:bg-amber-900 dark:bg-stone-200 dark:text-amber-950 dark:hover:bg-stone-300 transition-all duration-300 cursor-pointer shadow-sm border border-yellow-200 dark:border-stone-300 active:scale-90"
              aria-label="Toggle theme"
            >
              {dark ? <MdLightMode className="w-5 h-5" /> : <MdDarkMode className="w-5 h-5" />}
            </button>

            {/* Mobile Sidebar Hamburger Button */}
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                setTimeout(() => setDrawerOpen(true), 150);
              }}
              className="flex lg:hidden w-11 h-11 items-center justify-center rounded-full bg-amber-950 text-white hover:bg-amber-900 dark:bg-stone-200 dark:text-amber-950 dark:hover:bg-stone-300 transition-all duration-300 cursor-pointer shadow-sm border border-yellow-200 dark:border-stone-300 active:scale-90"
              aria-label="Open sidebar"
            >
              <CiMenuBurger className="w-6 h-6" strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>

      {/* 5. Mobile Sidebar Drawer */}
      {/* Backdrop: closes sidebar on click */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ease-in-out ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Sidebar: opens from the right side, matches Navbar theme */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-80 md:w-96 bg-white dark:bg-stone-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-stone-800">
          <span className="font-black text-amber-950 dark:text-orange-300">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-slate-400 hover:text-amber-900 dark:hover:text-orange-300 transition-colors cursor-pointer"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-6 space-y-6">
          {navLinks.map((page) => {
            const isActive = location.pathname === page.path;
            return (
              <Link
                key={page.name}
                to={page.path}
                className={`text-lg font-bold uppercase tracking-wide transition-colors duration-200
                  ${isActive ? 'text-amber-950 dark:text-orange-300' : 'text-amber-900 dark:text-stone-300 opacity-80 hover:opacity-100 dark:hover:text-white'}
                `}
              >
                {page.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}