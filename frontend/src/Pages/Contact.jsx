import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MdLocationOn, 
  MdPhone, 
  MdEmail, 
  MdCheckCircle
} from 'react-icons/md';

export default function Contact() {
    const location = useLocation();
    const [selectedProductForm, setSelectedProductForm] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (location.state?.selectedProduct) {
            setSelectedProductForm(location.state.selectedProduct);
        }

        if (location.state?.selectedProduct || location.hash === '#your-order-card') {
            const scrollToOrder = () => {
                const target = document.getElementById('your-order-card');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };

            scrollToOrder();
            const t1 = setTimeout(scrollToOrder, 80);
            const t2 = setTimeout(scrollToOrder, 200);
            const t3 = setTimeout(scrollToOrder, 500);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        }
    }, [location.state, location.hash]);

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('Sending to Admin...');

        const form = e.target;
        const inquiryData = {
            Requested_Product: selectedProductForm || form.Requested_Product.value,
            Target_Quantity: form.Target_Quantity.value,
            Client_Email: form.Client_Email.value,
            Delivery_Destination: form.Delivery_Destination.value,
            Additional_Specifications: form.Additional_Specifications.value,
        };

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${baseUrl}/api/request-quote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inquiryData)
            });
            
            if (response.ok) {
                setSubmitStatus('Inquiry Sent Successfully! Our team will contact you shortly.');
                setSelectedProductForm('');
                form.reset(); 
            } else {
                setSubmitStatus('Failed to send. Please check backend connection.');
            }
        } catch (error) {
            console.error('Error sending quote inquiry:', error);
            setSubmitStatus('Error: Cannot connect to server. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactDetails = [
        {
            icon: MdLocationOn,
            title: "Our Press Facility",
            detail: "C/145, First Floor, B G Tower, Delhi Darwaja, Ahmedabad, Gujarat, India",
            actionText: "Get Directions",
            actionUrl: "https://maps.google.com/?q=Delhi+Darwaja+Ahmedabad",
            iconBg: "bg-amber-50 text-amber-950 dark:bg-stone-800 dark:text-[#d4a373]"
        },
        {
            icon: MdPhone,
            title: "Phone & WhatsApp",
            detail: "+91 98797 56061",
            subdetail: "B2B queries response",
            actionText: "Call Us Now",
            actionUrl: "tel:+919879756061",
            iconBg: "bg-amber-50 text-amber-950 dark:bg-stone-800 dark:text-[#d4a373]"
        },
        {
            icon: MdEmail,
            title: "Web & Inquiries",
            detail: "www.jne.com",
            subdetail: "Commercial quote inquiries",
            iconBg: "bg-amber-50 text-amber-950 dark:bg-stone-800 dark:text-[#d4a373]"
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors">
            
            {/* Contact Us Hero Section - Image End-to-End of Screen */}
            <section className="relative w-full overflow-hidden min-h-[360px] sm:min-h-[420px] bg-amber-900 dark:bg-stone-900 border-b border-amber-900/40 dark:border-stone-800 flex items-center justify-start py-14 sm:py-20 text-left transition-colors">
                
                {/* Background Layer: Contact Image (End-to-End of Screen) */}
                <div className="absolute inset-0 z-0 bg-amber-900 dark:bg-stone-900">
                    <img 
                        src="/images/contact.jpg" 
                        alt="Contact J.N. Enterprise" 
                        className="w-full h-full object-cover object-center transform scale-105"
                        onError={(e) => {
                            if (!e.currentTarget.src.includes('4_colour')) {
                                e.currentTarget.src = '/machines/4_colour.jpg';
                            } else {
                                e.currentTarget.style.display = 'none';
                            }
                        }}
                    />
                </div>

                {/* Gradient Overlay for Text Contrast & Brand Theme - Lightened Shading */}
                <div 
                    className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-amber-900/75 via-amber-900/40 to-transparent dark:from-stone-900/80 dark:via-stone-900/35 dark:to-transparent" 
                    aria-hidden="true"
                />
                <div 
                    className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-amber-900/70 via-amber-900/25 to-transparent dark:from-stone-900/65 dark:via-stone-900/20 dark:to-transparent" 
                    aria-hidden="true"
                />

                {/* Hero Content - Placed on the left side, aligned to 7xl page grid */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    <div className="max-w-2xl text-left">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 shadow-xs">
                            <span className="h-2 w-2 rounded-full bg-amber-400 dark:bg-[#d4a373] animate-pulse"></span>
                            <span>GET IN TOUCH</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white dark:text-stone-100 tracking-tight mb-4 drop-shadow-md">
                            Contact Us
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-amber-100 dark:text-stone-200 leading-relaxed font-medium drop-shadow-sm">
                            Get in touch with our team for general business inquiries, vendor partnerships, or to schedule a visit to our facility.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto py-12 sm:py-20 px-4 sm:px-6 lg:px-8">

                {/* 2. Contact Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {contactDetails.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div 
                                key={idx}
                                className="group bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-7 sm:p-8 shadow-[0_10px_35px_-15px_rgba(69,26,3,0.07)] hover:shadow-[0_20px_45px_-12px_rgba(69,26,3,0.15)] hover:border-amber-900/50 dark:hover:border-[#d4a373]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl transition-transform duration-300 group-hover:scale-105 shadow-xs ${item.iconBg}`}>
                                        <Icon />
                                    </div>
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-[#d4a373] mb-1.5">
                                        {item.title}
                                    </h2>
                                    <p className="text-base font-bold text-stone-800 dark:text-stone-100 leading-snug">
                                        {item.detail}
                                    </p>
                                    {item.subdetail && (
                                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5">
                                            {item.subdetail}
                                        </p>
                                    )}
                                </div>
                                {item.actionUrl && (
                                    <a 
                                        href={item.actionUrl} 
                                        target={item.actionUrl.startsWith('http') ? '_blank' : '_self'} 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider mt-5 transition-colors
                                                   text-amber-950 hover:text-amber-800 dark:text-[#d4a373] dark:hover:text-white"
                                    >
                                        <span>{item.actionText}</span>
                                        <span>→</span>
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 3. The "Your Order" Card / Custom Inquiry Form */}
                <div 
                    id="your-order-card" 
                    className="max-w-4xl mx-auto rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(69,26,3,0.12)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border overflow-hidden scroll-mt-24 transition-colors
                               bg-white border-stone-200/90 text-stone-800
                               dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100"
                >
                    {/* Entire line from end-to-end of that section */}
                    <div className="w-full bg-amber-950 text-white dark:bg-stone-800 dark:text-stone-100 px-8 md:px-12 py-6 sm:py-7 text-left border-b border-amber-900/40 dark:border-stone-700">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white dark:text-stone-100">
                            Your Order
                        </h2>
                    </div>

                    <div className="p-8 md:p-12">
                        <form className="text-left space-y-6 max-w-3xl mx-auto" onSubmit={handleInquirySubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">
                                    Select Product
                                </label>
                                <select 
                                    name="Requested_Product" 
                                    required
                                    className="w-full border rounded-2xl px-4 py-3.5 outline-none transition-all
                                               border-stone-300 bg-stone-50/80 focus:bg-white focus:border-amber-950 focus:ring-4 focus:ring-amber-950/10 text-stone-900
                                               dark:border-stone-800 dark:bg-stone-950 dark:focus:bg-black dark:focus:border-[#d4a373] dark:focus:ring-4 dark:focus:ring-[#d4a373]/15 dark:text-stone-100" 
                                    value={selectedProductForm}
                                    onChange={(e) => setSelectedProductForm(e.target.value)}
                                >
                                    <option value="" disabled>Select Product...</option>
                                    {selectedProductForm && ![
                                        "Brochures", "Catalogues", "Flyers", "Wall Calendar", "Table Calendar",
                                        "Hard Bound Diary", "Spiral Diary", "Paper Folders",
                                        "Office Stationery (Letter Head, Envelope, Business Cards, Id Card)",
                                        "Corrugated Box", "FBB (Folding Box Board) Box", "Rigid Box",
                                        "Paper Bags", "Bar code Sticker Rolls", "Sign Boards",
                                        "Flex Banner", "Standee", "Vinyl", "Foam Board",
                                        "Gift Articles", "Trophies"
                                    ].includes(selectedProductForm) && (
                                        <option value={selectedProductForm}>{selectedProductForm}</option>
                                    )}
                                    <option value="Brochures">Brochures</option>
                                    <option value="Catalogues">Catalogues</option>
                                    <option value="Flyers">Flyers</option>
                                    <option value="Wall Calendar">Wall Calendar</option>
                                    <option value="Table Calendar">Table Calendar</option>
                                    <option value="Hard Bound Diary">Hard Bound Diary</option>
                                    <option value="Spiral Diary">Spiral Diary</option>
                                    <option value="Paper Folders">Paper Folders</option>
                                    <option value="Office Stationery (Letter Head, Envelope, Business Cards, Id Card)">Office Stationery (Letter Head, Envelope, Business Cards, Id Card)</option>
                                    <option value="Corrugated Box">Corrugated Box</option>
                                    <option value="FBB (Folding Box Board) Box">FBB (Folding Box Board) Box</option>
                                    <option value="Rigid Box">Rigid Box</option>
                                    <option value="Paper Bags">Paper Bags</option>
                                    <option value="Bar code Sticker Rolls">Bar code Sticker Rolls</option>
                                    <option value="Sign Boards">Sign Boards</option>
                                    <option value="Flex Banner">Flex Banner</option>
                                    <option value="Standee">Standee</option>
                                    <option value="Vinyl">Vinyl</option>
                                    <option value="Foam Board">Foam Board</option>
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
                                    className="w-full border rounded-2xl px-4 py-3.5 outline-none transition-all
                                               border-stone-300 bg-stone-50/80 focus:bg-white focus:border-amber-950 focus:ring-4 focus:ring-amber-950/10 text-stone-900
                                               dark:border-stone-800 dark:bg-stone-950 dark:focus:bg-black dark:focus:border-[#d4a373] dark:focus:ring-4 dark:focus:ring-[#d4a373]/15 dark:text-stone-100" 
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
                                    className="w-full border rounded-2xl px-4 py-3.5 outline-none transition-all
                                               border-stone-300 bg-stone-50/80 focus:bg-white focus:border-amber-950 focus:ring-4 focus:ring-amber-950/10 text-stone-900
                                               dark:border-stone-800 dark:bg-stone-950 dark:focus:bg-black dark:focus:border-[#d4a373] dark:focus:ring-4 dark:focus:ring-[#d4a373]/15 dark:text-stone-100" 
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
                                    className="w-full border rounded-2xl px-4 py-3.5 outline-none transition-all
                                               border-stone-300 bg-stone-50/80 focus:bg-white focus:border-amber-950 focus:ring-4 focus:ring-amber-950/10 text-stone-900
                                               dark:border-stone-800 dark:bg-stone-950 dark:focus:bg-black dark:focus:border-[#d4a373] dark:focus:ring-4 dark:focus:ring-[#d4a373]/15 dark:text-stone-100" 
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
                                className="w-full border rounded-2xl px-4 py-3.5 outline-none resize-none transition-all
                                           border-stone-300 bg-stone-50/80 focus:bg-white focus:border-amber-950 focus:ring-4 focus:ring-amber-950/10 text-stone-900
                                           dark:border-stone-800 dark:bg-stone-950 dark:focus:bg-black dark:focus:border-[#d4a373] dark:focus:ring-4 dark:focus:ring-[#d4a373]/15 dark:text-stone-100"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center
                                       bg-gradient-to-b from-amber-50/70 via-stone-50 to-stone-50 hover:from-amber-100/80 hover:via-stone-100 hover:to-stone-100 text-amber-950 border border-stone-200/80 shadow-amber-950/5
                                       dark:from-stone-900/60 dark:via-stone-950 dark:to-stone-950 dark:hover:from-stone-800 dark:hover:via-stone-900 dark:hover:to-stone-900 dark:text-[#d4a373] dark:border-stone-800/80"
                        >
                            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                        </button>

                        {submitStatus && (
                            <div className="p-4 rounded-2xl text-center text-sm font-bold animate-fade-in flex items-center justify-center space-x-2
                                            bg-amber-50 text-amber-950 border border-amber-200
                                            dark:bg-stone-950 dark:text-[#d4a373] dark:border-stone-800">
                                <MdCheckCircle className="text-lg text-amber-700 dark:text-[#d4a373]" />
                                <span>{submitStatus}</span>
                            </div>
                        )}
                    </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
