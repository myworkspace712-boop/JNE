import { useState } from 'react';

export default function BulkOrder() {
    const [submitStatus, setSubmitStatus] = useState('');

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('Sending to Admin...');

        const inquiryData = {
            Requested_Product: e.target.Requested_Product.value,
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
                e.target.reset(); 
            } else {
                setSubmitStatus('Failed to send. Please check backend connection.');
            }
        } catch (error) {
            console.error(error);
            setSubmitStatus('Error: Cannot connect to server.');
        }
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-black py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors">
            <div className="max-w-3xl w-full bg-white dark:bg-stone-950 rounded-[2.5rem] shadow-xl border border-amber-950/10 dark:border-stone-800 p-8 md:p-12 text-stone-900 dark:text-stone-100">
                
                <div className="text-center mb-10">
                    <span className="text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 inline-block
                                     bg-stone-100 text-amber-950 border border-amber-950/20
                                     dark:bg-[#c58f5e]/15 dark:text-[#d4a373] dark:border-[#d4a373]/30">
                        Direct to Admin
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-amber-950 dark:text-[#d4a373] tracking-tight mb-4">
                        Request Bulk Quote
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400">
                        Submit your specifications for a custom commercial printing quote.
                    </p>
                </div>

                <form className="text-left space-y-6" onSubmit={handleInquirySubmit}>
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
                                defaultValue=""
                            >
                                <option value="" disabled>Select Product...</option>
                                <option value="4-Colour Offset Printing">4-Colour Offset Printing</option>
                                <option value="FBB (Folding Box Board) Box">FBB (Folding Box Board) Box</option>
                                <option value="Rigid Box">Rigid Box</option>
                                <option value="Corrugated Box">Corrugated Box</option>
                                <option value="Box Packaging">Box Packaging (General)</option>
                                <option value="Premium Brochures">Premium Brochures</option>
                                <option value="Business Cards">Business Cards</option>
                                <option value="Product Catalogues">Product Catalogues</option>
                                <option value="Custom Calendars">Custom Calendars</option>
                                <option value="Custom Diaries">Custom Diaries</option>
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
                            placeholder="Paper GSM, lamination, specific dimensions..." 
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
                        <p className={`text-center font-bold text-sm mt-4 ${submitStatus.includes('Error') || submitStatus.includes('Failed') ? 'text-red-600' : 'text-amber-950 dark:text-[#d4a373]'}`}>
                            {submitStatus}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
