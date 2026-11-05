import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Products = () => {
    const location = useLocation();
    // Local state to track items added to the cart
    const [cart, setCart] = useState([]);
    // State to handle the opening/closing of the cart sidebar
    const [isCartOpen, setIsCartOpen] = useState(false);
    // Category filter state
    const [activeCategory, setActiveCategory] = useState('All');
    // Bulk Quote Form state
    const [submitStatus, setSubmitStatus] = useState('');
    const [selectedProductForm, setSelectedProductForm] = useState('');

    useEffect(() => {
        if (location.state?.selectedProduct) {
            setSelectedProductForm(location.state.selectedProduct);
            const target = document.getElementById('export-quote-section');
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.state]);

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('Sending to Admin...');

        const inquiryData = {
            Requested_Product: selectedProductForm || e.target.Requested_Product.value,
            Target_Quantity: e.target.Target_Quantity.value,
            Client_Email: e.target.Client_Email.value,
            Delivery_Destination: e.target.Delivery_Destination.value,
            Additional_Specifications: e.target.Additional_Specifications.value,
        };

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${baseUrl}/api/request-quote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inquiryData)
            });
            
            if (response.ok) {
                setSubmitStatus('Inquiry Sent Successfully!');
                setSelectedProductForm('');
                e.target.reset(); 
            } else {
                setSubmitStatus('Failed to send. Please check the backend connection.');
            }
        } catch (error) {
            console.error(error);
            setSubmitStatus('Error: Cannot connect to server.');
        }
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
            name: "Office Stationery", 
            category: "Office Stationery", 
            image: "/images/Office_Stationery/together.jpg", 
            description: "Complete corporate stationery suite including premium custom letterheads, branded envelopes, visiting business cards, and executive staff ID cards." 
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
        { name: "Office Stationery", category: "Office Stationery", image: "/images/Office_Stationery/together.jpg", description: "Complete corporate stationery suite including premium custom letterheads, branded envelopes, visiting business cards, and executive staff ID cards." },
        { name: "Corrugated Box", category: "Packaging", image: "/images/Packaging/corrugated_box.jpeg", description: "Multi-ply fluted cardboard boxes (3-ply, 5-ply, 7-ply) engineered for impact resistance and heavy-duty shipping." },
        { name: "FBB (Folding Box Board) Box", category: "Packaging", image: "/images/Packaging/FBB Boxes.jpg", description: "High-grade virgin fiber paperboard ideal for pharmaceuticals, cosmetics, FMCG, and luxury retail folding cartons." },
        { name: "Rigid Box", category: "Packaging", image: "/images/Packaging/rigid_boxes.jpg", description: "Heavy-duty structural chipboard wrapped in custom printed art paper for luxury branding, gifts, and electronics." },
        { name: "Paper Bags", category: "Retail", image: "/images/paper_bags.jpg" },
        { name: "Bar code & Sticker Roll", category: "Stationery", image: "" },
        { name: "Annual Reports", category: "Corporate", image: "" },
        { name: "Corporate Invitation", category: "Marketing", image: "" },
        { name: "Standee", category: "Corporate", image: "" },
        { name: "Flex Banner Vinyl", category: "Corporate", image: "" },
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

        return standardProducts;
    };

    const displayedProducts = getDisplayedProducts();

    const categories = [
        { id: 'All', label: 'All Services' },
        { id: 'Packaging', label: 'Packaging' },
        { id: 'Diaries', label: 'Diaries' },
        { id: 'Calendars', label: 'Calendars' }
    ];

    // Function that ONLY adds to the cart array
    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Function to remove a specific item from the cart
    const handleRemoveFromCart = (indexToRemove) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-black py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative w-full overflow-x-hidden transition-colors">
            
            {/* Clickable Floating Cart Counter */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-5 right-5 sm:bottom-auto sm:top-8 sm:right-8 px-4 py-2.5 sm:py-2 rounded-full shadow-xl font-semibold text-sm sm:text-base z-40 transition-all focus:outline-none cursor-pointer flex items-center space-x-2 active:scale-95
                           bg-amber-950 hover:bg-amber-900 text-white border border-amber-950/20
                           dark:bg-[#c58f5e] dark:hover:bg-[#b88050] dark:text-black dark:border-[#c58f5e] dark:shadow-[0_0_20px_rgba(212,163,115,0.3)]"
            >
                <span>🛒 Cart: {cart.length}</span>
                <span className="hidden sm:inline">items</span>
            </button>

            {/* Cart Slide-out Sidebar Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Dark background overlay */}
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                        onClick={() => setIsCartOpen(false)}
                    ></div>
                    
                    {/* Sidebar Panel */}
                    <div className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-black text-stone-900 dark:text-stone-100 h-full shadow-2xl flex flex-col transform transition-transform overflow-y-auto z-10 border-l border-amber-950/10 dark:border-stone-800">
                        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
                            <h2 className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-[#d4a373]">Your Cart</h2>
                            <button 
                                onClick={() => setIsCartOpen(false)} 
                                className="text-stone-400 hover:text-amber-950 dark:hover:text-[#d4a373] text-3xl font-semibold focus:outline-none cursor-pointer p-1"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                            {cart.length === 0 ? (
                                <p className="text-stone-500 dark:text-stone-400 text-center mt-10">Your cart is empty.</p>
                            ) : (
                                <ul className="space-y-4 sm:space-y-6">
                                    {cart.map((item, index) => (
                                        <li key={index} className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 gap-3">
                                            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                                                <div className="h-12 w-12 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img 
                                                        src={item.image || "https://via.placeholder.com/150?text=J.N.+Enterprise"} 
                                                        alt={item.name} 
                                                        className="h-full w-full object-cover" 
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = "https://via.placeholder.com/150?text=J.N.+Enterprise";
                                                        }}
                                                    />
                                                </div>
                                                <span className="font-medium text-stone-800 dark:text-stone-200 text-sm sm:text-base truncate">{item.name}</span>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveFromCart(index)}
                                                className="text-red-600 hover:text-red-700 dark:text-red-400 text-xs sm:text-sm font-medium hover:underline cursor-pointer flex-shrink-0"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header & Tagline */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-sm
                                    bg-stone-100 text-amber-950 border border-amber-950/20
                                    dark:bg-[#c58f5e]/15 dark:text-[#d4a373] dark:border-[#d4a373]/30">
                        <span>📦 Bulk Ordering</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 dark:text-[#d4a373] mb-2 sm:mb-3 tracking-tight">
                        SERVICES
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg italic text-stone-600 dark:text-stone-400 px-4 max-w-2xl mx-auto mb-6">
                        "Design is a behavior not a Department....."
                    </p>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                    activeCategory === cat.id
                                        ? 'bg-amber-950 text-white shadow-md scale-105 border border-amber-950 dark:bg-[#c58f5e] dark:text-black dark:border-[#c58f5e]'
                                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:border-stone-800'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Responsive Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {displayedProducts.map((product, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-stone-200 hover:border-amber-950/30 overflow-hidden hover:-translate-y-1
                                       dark:bg-stone-900 dark:border-stone-800 hover:dark:border-[#d4a373]/40"
                        >
                            {/* Product Image Card */}
                            <div className="h-44 sm:h-48 lg:h-52 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden flex items-center justify-center relative">
                                <img 
                                    src={product.image || "https://via.placeholder.com/400x300?text=J.N.+Enterprise"} 
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
                                    }}
                                />
                            </div>

                            {/* Product Title & Details */}
                            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center">
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-amber-950 dark:text-white mb-2">
                                        {product.name}
                                    </h3>
                                    
                                    {product.description && (
                                        <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                                            {product.description}
                                        </p>
                                    )}

                                    {/* Quick link on parent Box Packaging card to explore sub-types */}
                                    {product.isParentBox && (
                                        <button
                                            onClick={() => {
                                                setActiveCategory('Packaging');
                                            }}
                                            className="mb-4 inline-flex items-center text-xs font-bold text-amber-900 hover:text-amber-950 dark:text-[#d4a373] dark:hover:text-amber-200 transition-colors cursor-pointer"
                                        >
                                            View FBB, Rigid & Corrugated Boxes →
                                        </button>
                                    )}
                                </div>
                                
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="w-full font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors cursor-pointer active:scale-95 mt-auto
                                               bg-amber-950 hover:bg-amber-900 text-white
                                               dark:bg-[#c58f5e] dark:hover:bg-[#b88050] dark:text-black"
                                >
                                    Your Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* The Bulk Order Request Card / Inquiry Form */}
                <div id="export-quote-section" className="max-w-4xl mx-auto rounded-[2.5rem] shadow-xl border p-8 md:p-12 mt-20 mb-8 scroll-mt-24
                                                        bg-white border-amber-950/10 text-amber-950
                                                        dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-black text-amber-950 dark:text-[#d4a373] tracking-tight mb-4">
                            Your Order
                        </h2>
                        <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
                            Submit your desired quantity, specifications, and destination for a custom commercial quotation.
                        </p>
                    </div>

                    <form className="text-left space-y-6 max-w-3xl mx-auto" onSubmit={handleInquirySubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">
                                    Select Product
                                </label>
                                <select 
                                    name="Requested_Product" 
                                    required
                                    className="w-full border rounded-xl px-4 py-3.5 outline-none transition-colors
                                               border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-950 text-stone-900
                                               dark:border-stone-700 dark:bg-stone-900 dark:focus:bg-black dark:focus:border-[#d4a373] dark:text-white" 
                                    value={selectedProductForm}
                                    onChange={(e) => setSelectedProductForm(e.target.value)}
                                >
                                    <option value="" disabled>Select Product...</option>
                                    <option value="Brochures">Brochures</option>
                                    <option value="Catalogues">Catalogues</option>
                                    <option value="Flyers">Flyers</option>
                                    <option value="Wall Calendar">Wall Calendar</option>
                                    <option value="Table Calendar">Table Calendar</option>
                                    <option value="Hard Bound Diary">Hard Bound Diary</option>
                                    <option value="Spiral Diary">Spiral Diary</option>
                                    <option value="Paper Folders">Paper Folders</option>
                                    <option value="Office Stationery">Office Stationery</option>
                                    <option value="Corrugated Box">Corrugated Box</option>
                                    <option value="FBB (Folding Box Board) Box">FBB (Folding Box Board) Box</option>
                                    <option value="Rigid Box">Rigid Box</option>
                                    <option value="Paper Bags">Paper Bags</option>
                                    <option value="Bar code & Sticker Roll">Bar code & Sticker Roll</option>
                                    <option value="Annual Reports">Annual Reports</option>
                                    <option value="Corporate Invitation">Corporate Invitation</option>
                                    <option value="Standee">Standee</option>
                                    <option value="Flex Banner Vinyl">Flex Banner Vinyl</option>
                                    <option value="Gift Articles">Gift Articles</option>
                                    <option value="Trophies">Trophies</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">
                                    Target Quantity
                                </label>
                                <input 
                                    type="text" 
                                    name="Target_Quantity"
                                    required
                                    placeholder="e.g. 1,000 units" 
                                    className="w-full border rounded-xl px-4 py-3.5 outline-none transition-colors
                                               border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-950 text-stone-900
                                               dark:border-stone-700 dark:bg-stone-900 dark:focus:bg-black dark:focus:border-[#d4a373] dark:text-white" 
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">
                                    Client Email
                                </label>
                                <input 
                                    type="email" 
                                    name="Client_Email"
                                    required
                                    placeholder="company@domain.com" 
                                    className="w-full border rounded-xl px-4 py-3.5 outline-none transition-colors
                                               border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-950 text-stone-900
                                               dark:border-stone-700 dark:bg-stone-900 dark:focus:bg-black dark:focus:border-[#d4a373] dark:text-white" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">
                                    Delivery Location
                                </label>
                                <input 
                                    type="text" 
                                    name="Delivery_Destination"
                                    required
                                    placeholder="City or Port" 
                                    className="w-full border rounded-xl px-4 py-3.5 outline-none transition-colors
                                               border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-950 text-stone-900
                                               dark:border-stone-700 dark:bg-stone-900 dark:focus:bg-black dark:focus:border-[#d4a373] dark:text-white" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">
                                Additional Specifications
                            </label>
                            <textarea 
                                rows="4" 
                                name="Additional_Specifications"
                                placeholder="Paper GSM, surface lamination, dimensions, or custom box finish requirements..." 
                                className="w-full border rounded-xl px-4 py-3.5 outline-none resize-none transition-colors
                                           border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-950 text-stone-900
                                           dark:border-stone-700 dark:bg-stone-900 dark:focus:bg-black dark:focus:border-[#d4a373] dark:text-white"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={submitStatus === 'Sending to Admin...'}
                            className="w-full font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed
                                       bg-amber-950 hover:bg-amber-900 text-white border border-amber-950/20
                                       dark:bg-[#c58f5e] dark:hover:bg-[#b88050] dark:text-black dark:border-[#c58f5e] dark:shadow-[0_0_20px_rgba(212,163,115,0.3)]"
                        >
                            {submitStatus === 'Sending to Admin...' ? 'Processing...' : 'Submit Inquiry'}
                        </button>

                        {submitStatus && (
                            <p className="text-center text-sm font-bold text-amber-950 dark:text-[#d4a373] mt-4 animate-fade-in">
                                {submitStatus}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Products;
