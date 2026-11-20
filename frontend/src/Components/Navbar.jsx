import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    { name: 'Our Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      {/* 1. Base Header */}
      <header className="w-full bg-white/85 dark:bg-stone-950/85 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 sticky top-0 z-50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 min-h-[84px] flex items-center justify-between">

          {/* 2. Logo Area (Left) */}
          <Link to="/" className="flex items-center cursor-pointer group z-10 shrink-0">
            <img 
              src="/images/logo_transparent.png" 
              alt="JN Enterprise Logo" 
              className="h-8 sm:h-10 md:h-11 w-auto max-w-[170px] sm:max-w-[220px] md:max-w-none object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* 3. Navigation Links (Showcase after md size with underline from left) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 z-10">
            {navLinks.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Link
                  key={page.name}
                  to={page.path}
                  className={`relative py-2 text-sm lg:text-base font-bold tracking-wide uppercase transition-all duration-300 whitespace-nowrap
                    ${isActive
                      ? 'text-amber-950 dark:text-[#d4a373]'
                      : 'text-amber-950/80 hover:text-amber-950 dark:text-stone-300 dark:hover:text-[#d4a373]'}
                    hover:-translate-y-0.5
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-amber-950 dark:after:bg-[#d4a373]
                    after:transition-all after:duration-300 after:ease-out
                    ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {page.name}
                </Link>
              );
            })}
          </nav>

          {/* 4. Action Buttons (Right) */}
          <div className="relative flex items-center space-x-3 z-20 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                setDark(!dark);
              }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-amber-950 text-white hover:bg-amber-900 border border-amber-950/20 dark:bg-stone-900 dark:text-[#d4a373] dark:hover:bg-amber-950 dark:border-stone-800 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
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
              className="flex md:hidden w-11 h-11 items-center justify-center rounded-full bg-amber-950 text-white hover:bg-amber-900 border border-amber-950/20 dark:bg-stone-900 dark:text-[#d4a373] dark:hover:bg-amber-950 dark:border-stone-800 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              aria-label="Open sidebar"
            >
              <CiMenuBurger className="w-6 h-6" strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>

      {/* 5. Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ease-in-out ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setDrawerOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-80 md:w-96 bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden border-l border-amber-950/10 dark:border-stone-800 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-amber-950/10 dark:border-stone-800">
          <Link 
            to="/" 
            onClick={() => setDrawerOpen(false)}
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="/images/logo_transparent.png" 
              alt="JN Enterprise Logo" 
              className="h-7 sm:h-8 w-auto max-w-[160px] sm:max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-stone-400 hover:text-amber-950 hover:bg-stone-100 dark:hover:text-[#d4a373] dark:hover:bg-stone-900 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close menu"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-5 space-y-2.5">
          {navLinks.map((page) => {
            const isActive = location.pathname === page.path;
            return (
              <Link
                key={page.name}
                to={page.path}
                className={`px-4 py-3 rounded-2xl text-base font-bold uppercase tracking-wide transition-all duration-200
                  ${isActive
                    ? 'bg-amber-950 text-white shadow-sm dark:bg-stone-800 dark:text-[#d4a373]'
                    : 'text-amber-950/80 hover:text-amber-950 hover:bg-stone-100 dark:text-stone-300 dark:hover:text-[#d4a373] dark:hover:bg-stone-900'}
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
