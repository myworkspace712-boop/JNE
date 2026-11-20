import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    // Category filter state
    const [activeCategory, setActiveCategory] = useState('All');
    // Hero machine image placed in underlap
    const heroImage = "/images/Machines/lithrone_4_color.jpg";

    const handleServiceClick = (productName) => {
        navigate('/contact#your-order-card', { state: { selectedProduct: productName } });
    };

    // Dedicated packaging items (Exclusively FBB, Rigid, and Corrugated Boxes)
    const packagingProducts = [
        {
            name: "FBB (Folding Box Board) Box",
            category: "Packaging",
            subType: "FBB",
            description: "High-grade virgin fiber paperboard ideal for pharmaceuticals, cosmetics, FMCG, and luxury retail folding cartons.",
            image: "/images/Packaging/FBB Boxes.jpg"
        },
        {
            name: "Rigid Box",
            category: "Packaging",
            subType: "Rigid",
            description: "Heavy-duty structural chipboard wrapped in custom printed art paper for luxury branding, gifts, and electronics.",
            image: "/images/Packaging/rigid_boxes.jpg"
        },
        {
            name: "Corrugated Box",
            category: "Packaging",
            subType: "Corrugated",
            description: "Multi-ply fluted cardboard boxes (3-ply, 5-ply, 7-ply) engineered for impact resistance and heavy-duty shipping.",
            image: "/images/Packaging/corrugated_box.jpeg"
        }
    ];

    // Dedicated diary items (Hard Bound and Spiral Diaries)
    const diaryProducts = [
        {
            name: "Hard Bound Diary",
            category: "Diaries",
            description: "Premium case-bound diary with rigid hardcover, gold or debossed foil stamping, ribbon bookmark, and archival paper.",
            image: "/images/Diaries/hard_bound.jpg"
        },
        {
            name: "Spiral Diary",
            category: "Diaries",
            description: "Durable metal wire-bound / spiral planner and notebook, lays flat 360 degrees with custom printed cover.",
            image: "/images/Diaries/spiral.jpg"
        }
    ];

    // Dedicated calendar items (Wall and Table / Desk Calendars)
    const calendarProducts = [
        {
            name: "Wall Calendar",
            category: "Calendars",
            description: "High-visibility custom printed wall calendars with tin mounting or wire-o loop binding. Ideal for year-long brand recall.",
            image: "/images/Calendars/wall.jpg"
        },
        {
            name: "Table Calendar",
            category: "Calendars",
            description: "Executive triangular tent stand desk calendars with thick rigid cardboard base and premium matte/gloss multi-leaf sheets.",
            image: "/images/Calendars/table.jpg"
        }
    ];

    // Dedicated Office Stationery item
    const officeStationeryProducts = [
        { 
            name: "Office Stationery (Letter Head, Envelope, Business Cards, Id Card)", 
            category: "Office Stationery", 
            image: "/images/Office_Stationery/together.jpg", 
            description: "Complete corporate stationery suite including premium custom letterheads, branded envelopes, visiting business cards, and executive staff ID cards." 
        }
    ];

    // Dedicated Boards and Display Signage items (Sign Boards, Flex Banner, Standee, Vinyl, Foam Board)
    const boardProducts = [
        {
            name: "Sign Boards",
            category: "Boards",
            description: "Durable high-impact acrylic, ACP, LED, and metal sign boards for storefronts, directional guidance, and brand displays.",
            image: "/images/Boards/sign_b.jpg"
        },
        {
            name: "Flex Banner",
            category: "Boards",
            description: "High-contrast weatherproof flex vinyl banners for large-scale outdoor advertising, exhibitions, and promotional backdrops.",
            image: "/images/Boards/flex_b.jpg"
        },
        {
            name: "Standee",
            category: "Boards",
            description: "Lightweight, portable roll-up aluminum standees designed for trade fairs, retail showrooms, conferences, and event branding.",
            image: "/images/Boards/standee.jpg"
        },
        {
            name: "Vinyl",
            category: "Boards",
            description: "High-grade self-adhesive custom vinyl graphics and prints for indoor/outdoor signage, window graphics, and commercial displays.",
            image: "/images/Boards/vinyl_b.jpg"
        },
        {
            name: "Foam Board",
            category: "Boards",
            description: "Lightweight, rigid foam board sheets delivering clean, vibrant printing for exhibitions, point-of-sale displays, and presentations.",
            image: "/images/Boards/foam_b.jpg"
        }
    ];

    // Standard product catalog
    const standardProducts = [
        { name: "Brochures", category: "Marketing", image: "/images/Brochure.jpg" },
        { name: "Catalogues", category: "Marketing", image: "/images/Catalogue.jpg" },
        { name: "Flyers", category: "Marketing", image: "/images/Flyer.png" },
        { name: "Wall Calendar", category: "Calendars", image: "/images/Calendars/wall.jpg", description: "High-visibility custom printed wall calendars with tin mounting or wire-o loop binding. Ideal for year-long brand recall." },
        { name: "Table Calendar", category: "Calendars", image: "/images/Calendars/table.jpg", description: "Executive triangular tent stand desk calendars with thick rigid cardboard base and premium matte/gloss multi-leaf sheets." },
        { name: "Hard Bound Diary", category: "Diaries", image: "/images/Diaries/hard_bound.jpg", description: "Premium case-bound diary with rigid hardcover, gold or debossed foil stamping, and archival paper." },
        { name: "Spiral Diary", category: "Diaries", image: "/images/Diaries/spiral.jpg", description: "Durable metal wire-bound / spiral notebook, lays completely flat with custom printed cover." },
        { name: "Paper Folders", category: "Stationery", image: "/images/paper_folder.jpg", description: "Custom presentation paper folders with inside pockets and business card slits." },
        { name: "Office Stationery (Letter Head, Envelope, Business Cards, Id Card)", category: "Office Stationery", image: "/images/Office_Stationery/together.jpg", description: "Complete corporate stationery suite including premium custom letterheads, branded envelopes, visiting business cards, and executive staff ID cards." },
        { name: "Corrugated Box", category: "Packaging", image: "/images/Packaging/corrugated_box.jpeg", description: "Multi-ply fluted cardboard boxes (3-ply, 5-ply, 7-ply) engineered for impact resistance and heavy-duty shipping." },
        { name: "FBB (Folding Box Board) Box", category: "Packaging", image: "/images/Packaging/FBB Boxes.jpg", description: "High-grade virgin fiber paperboard ideal for pharmaceuticals, cosmetics, FMCG, and luxury retail folding cartons." },
        { name: "Rigid Box", category: "Packaging", image: "/images/Packaging/rigid_boxes.jpg", description: "Heavy-duty structural chipboard wrapped in custom printed art paper for luxury branding, gifts, and electronics." },
        { name: "Paper Bags", category: "Retail", image: "/images/paper_bags.jpg" },
        { name: "Barcode Sticker Rolls", category: "Others", image: "/images/barcode_sr.jpg", description: "Precision thermal barcode labels and custom self-adhesive sticker rolls matching industrial scanning grids." },
        { name: "Stickers", category: "Others", image: "/images/stickers.jpg", description: "High-grade custom adhesive stickers, product labels, die-cut decals, and promotional stickers." },
        { name: "Sign Boards", category: "Boards", image: "/images/Boards/sign_b.jpg", description: "Durable high-impact acrylic, ACP, LED, and metal sign boards for storefronts, directional guidance, and brand displays." },
        { name: "Flex Banner", category: "Boards", image: "/images/Boards/flex_b.jpg", description: "High-contrast weatherproof flex vinyl banners for large-scale outdoor advertising, exhibitions, and promotional backdrops." },
        { name: "Standee", category: "Boards", image: "/images/Boards/standee.jpg", description: "Lightweight, portable roll-up aluminum standees designed for trade fairs, retail showrooms, conferences, and event branding." },
        { name: "Vinyl", category: "Boards", image: "/images/Boards/vinyl_b.jpg", description: "High-grade self-adhesive custom vinyl graphics and prints for indoor/outdoor signage, window graphics, and commercial displays." },
        { name: "Foam Board", category: "Boards", image: "/images/Boards/foam_b.jpg", description: "Lightweight, rigid foam board sheets delivering clean, vibrant printing for exhibitions, point-of-sale displays, and presentations." },
        { name: "Gift Articles", category: "Corporate", image: "/images/gift_articles.jpg" },
        { name: "Trophies", category: "Corporate", image: "/images/trophies.jpg" }
    ];

    // Filter products based on selected category
    const getDisplayedProducts = () => {
        if (activeCategory === 'Packaging') {
            return packagingProducts;
        }

        if (activeCategory === 'Diaries') {
            return diaryProducts;
        }

        if (activeCategory === 'Calendars') {
            return calendarProducts;
        }

        if (activeCategory === 'Boards') {
            return boardProducts;
        }

        if (activeCategory === 'Others') {
            return standardProducts.filter(p => 
                !['Packaging', 'Diaries', 'Calendars', 'Boards'].includes(p.category)
            );
        }

        return standardProducts;
    };

    const displayedProducts = getDisplayedProducts();

    const categories = [
        { id: 'All', label: 'All Services' },
        { id: 'Packaging', label: 'Packaging' },
        { id: 'Diaries', label: 'Diaries' },
        { id: 'Calendars', label: 'Calendars' },
        { id: 'Boards', label: 'Boards' },
        { id: 'Others', label: 'Others' }
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 relative w-full overflow-x-hidden transition-colors duration-300">
            
            {/* 1. Our Services Hero Section - Image End-to-End of Screen */}
            <div className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[480px] md:min-h-[520px] bg-amber-900 dark:bg-stone-900 border-b border-amber-900/40 dark:border-stone-800 flex flex-col justify-end">
                
                {/* Underlapping Image / Placeholder Layer (End-to-End) */}
                <div className="absolute inset-0 z-0 bg-amber-900 dark:bg-stone-900">
                    {heroImage ? (
                        <img 
                            src={heroImage} 
                            alt="Komori Lithrone 4-Colour Offset Machine" 
                            className="w-full h-full object-cover object-center transform scale-105"
                            onError={(e) => {
                                if (!e.currentTarget.src.includes('/machines/')) {
                                    e.currentTarget.src = '/machines/lithrone_4_color.jpg';
                                } else {
                                    e.currentTarget.style.display = 'none';
                                }
                            }}
                        />
                    ) : (
                        <div className="w-full h-full border-2 border-dashed border-white/20 dark:border-stone-600/80 flex flex-col items-center justify-center p-6 text-center bg-amber-900/30 dark:bg-[#1a1715]/90">
                            <div className="flex flex-col items-center justify-center text-amber-200/60 dark:text-stone-300 pointer-events-none">
                                <svg className="w-14 h-14 mb-3 stroke-[1.5] dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className="text-sm font-extrabold uppercase tracking-wider text-white/90 dark:text-white">Hero Underlap Image Space</span>
                                <span className="text-xs text-amber-200/70 dark:text-stone-300 mt-1 font-medium">Image will underlap the text content here</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Gradient Overlay for Text Readability & Contrast */}
                <div 
                    className="absolute inset-0 z-10 bg-gradient-to-t from-amber-900/80 via-amber-900/45 to-transparent dark:from-stone-900/85 dark:via-stone-900/40 dark:to-transparent pointer-events-none" 
                    aria-hidden="true"
                />
                <div 
                    className="absolute inset-0 z-10 bg-gradient-to-r from-amber-900/75 via-amber-900/30 to-transparent dark:from-stone-900/70 dark:via-stone-900/25 dark:to-transparent hidden sm:block pointer-events-none" 
                    aria-hidden="true"
                />

                {/* Text Above Image (Layered On Top, Aligned to Grid) */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 text-left">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5 shadow-sm
                                        bg-white/10 text-white border border-white/20 backdrop-blur-md dark:bg-stone-800/95 dark:border-stone-600 dark:text-stone-100">
                            <span className="h-2 w-2 rounded-full bg-amber-400 dark:bg-[#d4a373] animate-pulse"></span>
                            <span>COMMERCIAL &amp; INDUSTRIAL PRINTING</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white dark:text-white tracking-tight mb-4 drop-shadow-xl">
                            OUR SERVICES
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-amber-100 dark:text-stone-200 leading-relaxed font-medium drop-shadow-lg max-w-2xl">
                            Making your business undeniably good on paper. Discover our capabilities in commercial offset printing, premium rigid packaging, corporate stationery, and much more.
                        </p>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
                {/* Category Filter Tabs - Pill Dock */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm max-w-fit mx-auto mb-12">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? 'bg-amber-950 text-white shadow-sm dark:bg-stone-800 dark:text-[#d4a373]'
                                        : 'text-stone-700 hover:text-amber-950 hover:bg-amber-50/70 dark:text-stone-300 dark:hover:text-[#d4a373] dark:hover:bg-stone-800/70'
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Responsive Service Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
                    {displayedProducts.map((product, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleServiceClick(product.name)}
                            className="group bg-white dark:bg-stone-900 rounded-3xl p-3 shadow-[0_8px_28px_-10px_rgba(69,26,3,0.06)] hover:shadow-[0_20px_44px_-12px_rgba(69,26,3,0.16)] transition-all duration-300 flex flex-col border border-stone-200/80 dark:border-stone-800 hover:border-amber-900/50 dark:hover:border-[#d4a373]/50 overflow-hidden hover:-translate-y-1.5 cursor-pointer"
                        >
                            {/* Service Image Card */}
                            <div className="h-48 sm:h-52 w-full rounded-2xl bg-stone-100 dark:bg-stone-950 overflow-hidden flex items-center justify-center relative">
                                <img 
                                    src={product.image || "https://via.placeholder.com/400x300?text=J.N.+Enterprise"} 
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
                                    }}
                                />
                            </div>

                            {/* Service Content Name */}
                            <div className="px-3 pt-4 pb-2.5 flex-1 flex flex-col justify-center text-center">
                                <h3 className="text-base sm:text-lg font-bold text-amber-950 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-[#d4a373] transition-colors">
                                    {product.name.includes(" (") && product.name.startsWith("Office Stationery") ? (
                                        <>
                                            <span className="block">{product.name.split(" (")[0]}</span>
                                            <span className="block text-xs sm:text-sm font-semibold text-amber-800/85 dark:text-stone-400 mt-1 tracking-tight">
                                                ({product.name.split(" (")[1]}
                                            </span>
                                        </>
                                    ) : (
                                        product.name
                                    )}
                                </h3>

                                {/* Quick link on parent Box Packaging card to explore sub-types */}
                                {product.isParentBox && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveCategory('Packaging');
                                        }}
                                        className="mt-2 inline-flex items-center justify-center text-xs font-bold text-amber-800 hover:text-amber-950 dark:text-[#d4a373] dark:hover:text-white transition-colors cursor-pointer"
                                    >
                                        View FBB, Rigid & Corrugated Boxes →
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Call-to-Action - Warm Lighter Amber in Light, Refined Stone in Dark Mode */}
                <div className="mt-16 sm:mt-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 dark:from-stone-800 dark:via-stone-800/95 dark:to-stone-900 text-white dark:text-stone-100 rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_50px_-15px_rgba(69,26,3,0.25)] border border-amber-700/60 dark:border-stone-700 text-left relative overflow-hidden">
                    
                    {/* Water-faded packaging_1 background watermark */}
                    <div 
                        className="absolute inset-0 pointer-events-none select-none overflow-hidden" 
                        aria-hidden="true"
                    >
                        <img 
                            src="/images/packaging_1.jpg" 
                            alt="" 
                            className="w-full h-full object-cover object-right sm:object-center opacity-25 dark:opacity-15"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/85 via-amber-900/60 to-amber-900/15 dark:from-stone-800/85 dark:via-stone-800/60 dark:to-stone-800/15" />
                    </div>

                    <div className="max-w-2xl relative z-10">
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-white/10 text-white border border-white/20 backdrop-blur-sm dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300">
                            <span>Ready to Print</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black mb-3 text-white dark:text-stone-100">
                            Looking for Custom Packaging or Commercial Printing?
                        </h2>
                        <p className="text-white/90 dark:text-stone-300 text-sm sm:text-base mb-7 leading-relaxed">
                            Connect directly with us for quality printing, and on-time delivery.
                        </p>
                        <Link
                            to="/contact#your-order-card"
                            className="group inline-flex items-center justify-center font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer active:scale-95 shadow-lg
                                       bg-amber-950 hover:bg-amber-900 text-white border border-amber-800/80 shadow-amber-950/40
                                       dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-[#d4a373] dark:border dark:border-stone-700 dark:shadow-black/40"
                        >
                            <span className="inline-flex items-center space-x-2.5 transition-transform duration-300 group-hover:scale-105 origin-center">
                                <span>ORDER</span>
                                <svg 
                                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
