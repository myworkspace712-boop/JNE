import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-stone-100 font-sans flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
