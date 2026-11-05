import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-stone-200 text-xs py-8 border-t border-amber-900 mt-auto transition-colors duration-300 dark:bg-black dark:text-stone-400 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
        <p>© 2026 JN Enterprise Printing Industrial Hub. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-white dark:hover:text-[#d4a373] transition-colors">Home</Link>
          <Link to="/services" className="hover:text-white dark:hover:text-[#d4a373] transition-colors">Services</Link>
          <Link to="/about" className="hover:text-white dark:hover:text-[#d4a373] transition-colors">About Us</Link>
        </div>
      </div>
    </footer>
  );
}
