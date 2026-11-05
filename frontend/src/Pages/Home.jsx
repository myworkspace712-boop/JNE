import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroCarousel from '../Components/HeroCarousel.jsx';

const Home = () => {
    const navigate = useNavigate();

    // Featured Products Data (Strictly 4 products: brochures, catalogues, flyers, and paper folders)
    const featuredProducts = [
        { 
            name: "Brochures", 
            description: "Available in multiple finishes, folds, and GSMs. Bulk orders starting from 500 units.",
            image: "/images/Brochure.jpg", 
            moq: "500 Units"
        },
        { 
            name: "Catalogues", 
            description: "Multi-page corporate catalogues with saddle-stitch or perfect binding for product lines.",
            image: "/images/Catalogue.jpg", 
            moq: "200 Units"
        },
        { 
            name: "Flyers", 
            description: "Vibrant promotional marketing flyers crafted with high-definition offset printing.",
            image: "/images/Flyers.jpg", 
            moq: "1,000 Units"
        },
        { 
            name: "Paper Folders", 
            description: "Executive presentation folders with inside pockets and business card slits for corporate meetings.",
            image: "/images/paper_folder.jpg", 
            moq: "500 Units"
        }
    ];

    const handleRequestQuote = (productName) => {
        navigate('/services', { state: { selectedProduct: productName } });
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-black font-sans text-stone-900 dark:text-stone-100 transition-colors duration-300">
            
            {/* 1. MINIMALIST MODERN HERO CAROUSEL */}
            <HeroCarousel />

            {/* LITHRONE MACHINE SECTION */}
            <section className="py-8 md:py-12 bg-[#faf8f5] dark:bg-black w-full overflow-hidden transition-colors">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center">
                        <div className="w-full max-w-xl md:max-w-2xl bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md border border-amber-950/10 dark:border-stone-800 transition-all duration-300">
                            <img 
                                src="/images/Machines/lithrone_4_color.jpg" 
                                alt="Lithrone 4-Colour Offset Machine" 
                                className="w-full h-auto max-h-[450px] object-contain rounded-2xl mx-auto"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/machines/lithrone_4_color.jpg";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. BULK PRODUCTS CATEGORY SECTION */}
            <section className="py-16 md:py-24 bg-white/80 dark:bg-stone-950/80 border-t border-b border-amber-950/10 dark:border-stone-800 w-full overflow-hidden transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Row */}
                    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-sm
                                        bg-stone-100 text-amber-950 border border-amber-950/20
                                        dark:bg-[#c58f5e]/15 dark:text-[#d4a373] dark:border-[#d4a373]/30">
                            <span>OUR SERVICES</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-amber-950 dark:text-[#d4a373] tracking-tight mb-6">
                            We Make Your Business Look Good On Paper
                        </h2>
                        <div className="flex justify-center">
                            <Link 
                                to="/services" 
                                className="group inline-flex items-center space-x-2 font-black text-xs sm:text-sm uppercase tracking-widest text-amber-950 hover:text-amber-800 dark:text-[#d4a373] dark:hover:text-[#c58f5e] transition-all cursor-pointer"
                            >
                                <span>VIEW FULL CATALOGUE</span>
                                <svg 
                                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1.5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Responsive Grid: 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {featuredProducts.map((product, index) => (
                            <div 
                                key={index} 
                                className="rounded-[1.5rem] p-5 shadow-sm hover:shadow-xl border flex flex-col group hover:-translate-y-1 transition-all duration-300
                                           bg-white border-amber-950/10 hover:border-amber-950/25
                                           dark:bg-stone-900 dark:border-stone-800 hover:dark:border-[#d4a373]/40"
                            >
                                {/* Image Container */}
                                <div className="w-full h-48 md:h-56 mb-5 overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 relative">
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { 
                                            e.target.onerror = null; 
                                            e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`; 
                                        }}
                                    />
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-lg md:text-xl font-extrabold text-amber-950 dark:text-white mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6 flex-1 pr-2">
                                        {product.description}
                                    </p>
                                    
                                    <button 
                                        onClick={() => handleRequestQuote(product.name)}
                                        className="w-full font-bold text-xs py-3.5 px-4 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer
                                                   bg-stone-50 hover:bg-amber-950 hover:text-white text-amber-950 border border-stone-200 hover:border-amber-950
                                                   dark:bg-stone-800 dark:hover:bg-[#c58f5e] dark:text-stone-200 dark:hover:text-black dark:border-stone-700"
                                    >
                                        <span>Your Print</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile-only View Catalog Link */}
                    <div className="mt-8 md:hidden flex justify-center">
                        <Link 
                            to="/services" 
                            className="group inline-flex items-center space-x-2 font-black text-xs sm:text-sm uppercase tracking-widest text-amber-950 hover:text-amber-800 dark:text-[#d4a373] dark:hover:text-[#c58f5e] transition-all cursor-pointer"
                        >
                            <span>VIEW FULL CATALOGUE</span>
                            <svg 
                                className="w-4 h-4 transform transition-transform group-hover:translate-x-1.5" 
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
