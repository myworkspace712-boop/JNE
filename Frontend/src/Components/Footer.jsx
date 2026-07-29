import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
        <p>© 2026 JN Enterprise Printing Industrial Hub. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
        </div>
      </div>
    </footer>
  );
}