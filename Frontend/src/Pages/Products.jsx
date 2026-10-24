import React, { useState } from 'react';

const Products = () => {
    // Local state to track items added to the cart
    const [cart, setCart] = useState([]);
    // State to handle the opening/closing of the cart sidebar
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Product list with Brochure and Business Card images active
    const products = [
        { name: "Brochures", image: "/Images/Brochure.jpg" },
        { name: "Catalogues", image: "" },
        { name: "Flyers", image: "" },
        { name: "Calendars", image: "" },
        { name: "Diary", image: "" },
        { name: "Folders", image: "" },
        { name: "Business Card", image: "/Images/Business Card.jpg" },
        { name: "Letter Head", image: "" },
        { name: "Envelopes", image: "" },
        { name: "Bar code", image: "" },
        { name: "Sticker Roll", image: "" },
        { name: "Packing Box", image: "" },
        { name: "Paper Bag", image: "" },
        { name: "Annual Reports", image: "" },
        { name: "Corporate Invitation", image: "" },
        { name: "Standee", image: "" },
        { name: "Flex Banner Vinyl", image: "" },
        { name: "Corporate Gift Articles", image: "" }
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
            
            {/* Clickable Floating Cart Counter */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="fixed top-4 right-4 sm:top-8 sm:right-8 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold z-40 hover:bg-indigo-700 transition-colors focus:outline-none cursor-pointer"
            >
                🛒 Cart: {cart.length} items
            </button>

            {/* Cart Slide-out Sidebar Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Dark background overlay */}
                    <div 
                        className="fixed inset-0 bg-black/50 transition-opacity"
                        onClick={() => setIsCartOpen(false)}
                    ></div>
                    
                    {/* Sidebar Panel */}
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform overflow-y-auto z-10">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                            <button 
                                onClick={() => setIsCartOpen(false)} 
                                className="text-gray-500 hover:text-gray-800 text-3xl font-semibold focus:outline-none cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto">
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
                            ) : (
                                <ul className="space-y-6">
                                    {cart.map((item, index) => (
                                        <li key={index} className="flex items-center justify-between border-b pb-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
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
                                                <span className="font-medium text-gray-800">{item.name}</span>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveFromCart(index)}
                                                className="text-red-500 text-sm font-medium hover:text-red-700 hover:underline cursor-pointer"
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
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Our Products</h1>
                    <p className="text-lg italic text-gray-600">"Design is a behavior not a Department....."</p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {/* Product Image Card */}
                            <div className="h-48 w-full bg-gray-100 overflow-hidden flex items-center justify-center">
                                <img 
                                    src={product.image || "https://via.placeholder.com/400x300?text=J.N.+Enterprise"} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=J.N.+Enterprise";
                                    }}
                                />
                            </div>

                            {/* Product Title & Add to Cart Button */}
                            <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">{product.name}</h3>
                                
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-auto w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
