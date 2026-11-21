import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
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
        <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 min-h-[68px] sm:min-h-[76px] flex items-center justify-between gap-2 sm:gap-4 w-full">

          {/* 2. Logo Area (Left) */}
          <div className="flex items-center justify-start shrink-0">
            <Link to="/" className="flex items-center cursor-pointer group">
              <img 
                src="/images/logo_transparent.png" 
                alt="JN Enterprise Logo" 
                className="h-6.5 sm:h-7.5 md:h-8 lg:h-9 w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[190px] lg:max-w-[210px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* 3. Navigation Links (Center - fluid flex-1 with clean spacing) */}
          <nav className="hidden md:flex items-center justify-center gap-3 lg:gap-6 xl:gap-8 flex-1 mx-2 lg:mx-4 z-10">
            {navLinks.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Link
                  key={page.name}
                  to={page.path}
                  className={`relative px-1.5 lg:px-2.5 py-1.5 text-xs lg:text-sm font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex items-center
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

          {/* 4. Action Buttons (Right - guaranteed to stay within navbar bounds) */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 z-20">
            {/* Theme Toggle Switch with "THEME" Label */}
            <button
              type="button"
              role="switch"
              aria-checked={dark}
              aria-label="Toggle light and dark theme"
              onClick={(e) => {
                e.currentTarget.blur();
                setDark(!dark);
              }}
              className="group flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none focus:outline-hidden active:scale-95"
            >
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-950/80 group-hover:text-amber-950 dark:text-stone-300 dark:group-hover:text-[#d4a373] transition-colors">
                THEME
              </span>
              <span
                className={`relative inline-flex h-6.5 w-11 sm:h-7 sm:w-12 shrink-0 items-center rounded-full p-0.5 sm:p-1 transition-colors duration-300 border shadow-inner
                  ${dark
                    ? 'bg-stone-800 border-stone-700'
                    : 'bg-stone-200/90 border-stone-300/80'}`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full shadow-md transition-transform duration-300 ease-out
                    ${dark
                      ? 'translate-x-5 bg-[#d4a373]'
                      : 'translate-x-0 bg-amber-950'}`}
                />
              </span>
            </button>

            {/* Mobile Sidebar Hamburger Button */}
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                setTimeout(() => setDrawerOpen(true), 150);
              }}
              className="flex md:hidden h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full bg-amber-950 text-white hover:bg-amber-900 border border-amber-950/20 dark:bg-stone-900 dark:text-[#d4a373] dark:hover:bg-amber-950 dark:border-stone-800 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              aria-label="Open sidebar"
            >
              <CiMenuBurger className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1} />
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
