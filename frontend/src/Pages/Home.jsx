import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../Components/Hero.jsx';
import Partners from '../Components/Partners.jsx';
import Reviews from '../Components/Reviews.jsx';

const Home = () => {
    const navigate = useNavigate();

    // Featured Products Data (6 products: Brochures, Catalogues, Flyers, Paper Folders, Rigid Box, Paper Bags)
    const featuredProducts = [
        { 
            name: "Brochures", 
            image: "/images/Brochure.jpg", 
            moq: "500 Units"
        },
        { 
            name: "Catalogues", 
            image: "/images/Catalogue.jpg", 
            moq: "200 Units"
        },
        { 
            name: "Flyers", 
            image: "/images/Flyers.jpg", 
            moq: "1,000 Units"
        },
        { 
            name: "Paper Folders", 
            image: "/images/paper_folder.jpg", 
            moq: "500 Units"
        },
        { 
            name: "Rigid Box", 
            image: "/images/Packaging/rigid_boxes.jpg", 
            moq: "500 Units"
        },
        { 
            name: "Paper Bags", 
            image: "/images/paper_bags.jpg", 
            moq: "1,000 Units"
        }
    ];

    const handleRequestQuote = (productName) => {
        navigate('/contact#your-order-card', { state: { selectedProduct: productName } });
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 transition-colors duration-300">
            
            {/* 1. HERO SECTION WITH IMAGE PLACE (NO CAROUSEL, NO GLOWING BORDER) */}
            <Hero />

            {/* PARTNERS & SISTER CONCERN SECTION */}
            <Partners />

            {/* CLIENT REVIEWS & TESTIMONIALS SECTION */}
            <Reviews />

            {/* 2. BULK PRODUCTS CATEGORY SECTION */}
            <section className="py-16 md:py-24 relative bg-stone-50 dark:bg-stone-950 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] dark:bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:20px_20px] w-full overflow-hidden transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Row */}
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5 shadow-sm
                                        bg-amber-950 text-white border border-amber-900
                                        dark:bg-stone-800 dark:text-[#d4a373] dark:border-stone-700">
                            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span>OUR SERVICES</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-amber-950 dark:text-stone-100 tracking-tight mb-7">
                            Your Brand, Styled on Paper
                        </h2>
                        <div className="flex justify-center">
                            <Link 
                                to="/services" 
                                className="group inline-flex items-center space-x-2.5 px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest bg-white dark:bg-stone-900 text-amber-950 dark:text-[#d4a373] border border-amber-950/15 dark:border-stone-800 shadow-sm hover:bg-amber-950 hover:text-white dark:hover:bg-[#d4a373] dark:hover:text-stone-950 transition-all duration-300 cursor-pointer"
                            >
                                <span>VIEW FULL CATALOGUE</span>
                                <svg 
                                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Responsive Grid: 2 cols (mobile) -> 3 cols (tablet) -> 6 cols (desktop) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5">
                        {featuredProducts.map((product, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleRequestQuote(product.name)}
                                className="group bg-white dark:bg-stone-900 rounded-2xl p-2.5 sm:p-3 shadow-[0_6px_20px_-8px_rgba(69,26,3,0.06)] border border-stone-200/80 dark:border-stone-800 hover:border-amber-900/50 dark:hover:border-[#d4a373]/50 hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(69,26,3,0.14)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                            >
                                <div>
                                    {/* Product Image */}
                                    <div className="relative w-full h-32 sm:h-36 md:h-40 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                            onError={(e) => { 
                                                e.target.onerror = null; 
                                                e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`; 
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Product Content */}
                                    <div className="px-1.5 pt-3 pb-1 text-center">
                                        <h3 className="text-xs sm:text-sm md:text-base font-bold text-amber-950 dark:text-white group-hover:text-amber-800 dark:group-hover:text-[#d4a373] transition-colors leading-snug line-clamp-2">
                                            {product.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile-only View Catalog Link */}
                    <div className="mt-10 md:hidden flex justify-center">
                        <Link 
                            to="/services" 
                            className="group inline-flex items-center space-x-2.5 px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest bg-white dark:bg-stone-900 text-amber-950 dark:text-[#d4a373] border border-amber-950/15 dark:border-stone-800 shadow-sm hover:bg-amber-950 hover:text-white dark:hover:bg-[#d4a373] dark:hover:text-stone-950 transition-all duration-300 cursor-pointer"
                        >
                            <span>VIEW FULL CATALOGUE</span>
                            <svg 
                                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                    
                </div>
            </section>

        </div>
    );
};

export default Home;
