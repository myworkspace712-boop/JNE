import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../Components/Hero.jsx';
import Partners from '../Components/Partners.jsx';
import Reviews from '../Components/Reviews.jsx';

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
            <section className="py-20 relative bg-stone-50 dark:bg-stone-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:16px_16px] border-t border-b border-stone-200 dark:border-stone-800 w-full overflow-hidden transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Row */}
                    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm
                                        bg-amber-950 text-white border border-amber-900
                                        dark:bg-stone-800 dark:text-[#d4a373] dark:border-stone-700">
                            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span>OUR SERVICES</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-amber-950 dark:text-stone-100 tracking-tight mb-6">
                            Your Brand, Styled on Paper
                        </h2>
                        <div className="flex justify-center">
                            <Link 
                                to="/services" 
                                className="group inline-flex items-center space-x-2 font-black text-xs sm:text-sm uppercase tracking-widest text-amber-950 hover:text-amber-800 dark:text-[#d4a373] dark:hover:text-amber-200 transition-all cursor-pointer"
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
                                onClick={() => handleRequestQuote(product.name)}
                                className="group bg-white dark:bg-stone-900 rounded-lg p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-200/80 dark:border-stone-800 border-t-4 border-t-amber-900 dark:border-t-[#d4a373] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                            >
                                <div>
                                    {/* Product Image */}
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded mb-6 transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => { 
                                            e.target.onerror = null; 
                                            e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`; 
                                        }}
                                    />
                                    
                                    {/* Product Content */}
                                    <h3 className="text-2xl font-bold text-amber-950 dark:text-white mb-3 group-hover:text-amber-800 dark:group-hover:text-[#d4a373] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile-only View Catalog Link */}
                    <div className="mt-8 md:hidden flex justify-center">
                        <Link 
                            to="/services" 
                            className="group inline-flex items-center space-x-2 font-black text-xs sm:text-sm uppercase tracking-widest text-amber-950 hover:text-amber-800 dark:text-[#d4a373] dark:hover:text-amber-200 transition-all cursor-pointer"
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
