import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative bg-amber-950 dark:bg-stone-950 text-stone-200 py-14 md:py-20 mt-auto border-t border-amber-900/60 dark:border-stone-800 transition-colors overflow-hidden">
            
            {/* Faded Ambient Background Circles */}
            <div 
                className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-80 dark:opacity-60"
                style={{
                    background: 'radial-gradient(circle, rgba(217, 119, 6, 0.35) 0%, rgba(180, 83, 9, 0.15) 50%, transparent 70%)'
                }}
                aria-hidden="true"
            />
            <div 
                className="absolute top-1/2 -right-28 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full pointer-events-none opacity-75 dark:opacity-50"
                style={{
                    background: 'radial-gradient(circle, rgba(212, 163, 115, 0.32) 0%, rgba(197, 143, 94, 0.12) 50%, transparent 70%)'
                }}
                aria-hidden="true"
            />
            <div 
                className="absolute -bottom-36 left-1/3 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full pointer-events-none opacity-70 dark:opacity-40"
                style={{
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.10) 50%, transparent 72%)'
                }}
                aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                    
                    {/* 1. Brand Section */}
                    <div>
                        <h2 className="text-2xl font-extrabold text-white tracking-tight mb-4">
                            J.N. Enterprise
                        </h2>
                        <p className="text-sm text-stone-300 dark:text-stone-400 leading-relaxed mb-6">
                            Commercial paper printing and packaging solutions engineered for your company. We make your business look good on paper.
                        </p>
                    </div>

                    {/* 2. Navigation Links (Middle) */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="inline-flex items-center hover:text-amber-300 dark:hover:text-[#d4a373] transition-colors duration-300">Home</Link>
                            </li>
                            <li>
                                <Link to="/services" className="inline-flex items-center hover:text-amber-300 dark:hover:text-[#d4a373] transition-colors duration-300">Our Services</Link>
                            </li>
                            <li>
                                <Link to="/about" className="inline-flex items-center hover:text-amber-300 dark:hover:text-[#d4a373] transition-colors duration-300">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="inline-flex items-center hover:text-amber-300 dark:hover:text-[#d4a373] transition-colors duration-300">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Address & Contact (Right Side) */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
                            Contact Information
                        </h3>
                        <div className="space-y-4 text-sm">
                            <p className="flex items-start">
                                <span className="w-9 h-9 rounded-xl bg-amber-900/50 dark:bg-stone-900 border border-amber-800/50 dark:border-stone-800 flex items-center justify-center mr-3.5 shrink-0">
                                    <svg className="w-4 h-4 text-amber-400 dark:text-[#d4a373]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </span>
                                <span className="pt-0.5 leading-relaxed">C/145, First Floor, B G Tower,<br />Delhi Darwaja, Ahmedabad,<br />Gujarat, India</span>
                            </p>
                            <p className="flex items-center">
                                <span className="w-9 h-9 rounded-xl bg-amber-900/50 dark:bg-stone-900 border border-amber-800/50 dark:border-stone-800 flex items-center justify-center mr-3.5 shrink-0">
                                    <svg className="w-4 h-4 text-amber-400 dark:text-[#d4a373]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                </span>
                                <a href="https://www.jne.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 dark:hover:text-[#d4a373] transition-colors duration-300">www.jne.com</a>
                            </p>
                            <p className="flex items-center">
                                <span className="w-9 h-9 rounded-xl bg-amber-900/50 dark:bg-stone-900 border border-amber-800/50 dark:border-stone-800 flex items-center justify-center mr-3.5 shrink-0">
                                    <svg className="w-4 h-4 text-amber-400 dark:text-[#d4a373]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </span>
                                <a href="tel:+919879756061" className="hover:text-amber-300 dark:hover:text-[#d4a373] transition-colors duration-300">+91 98797 56061</a>
                            </p>
                        </div>
                    </div>

                </div>
                
                {/* Bottom Copyright */}
                <div className="mt-14 pt-8 border-t border-amber-900/60 dark:border-stone-800 text-sm text-center text-stone-400">
                    &copy; {new Date().getFullYear()} J.N. Enterprise. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
