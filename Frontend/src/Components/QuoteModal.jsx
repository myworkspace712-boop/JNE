import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function QuoteModal({ selectedProduct, setSelectedProduct, setNotification }) {
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', quantity: 100 });

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          quantity: quoteForm.quantity,
          product: selectedProduct
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification(data.message || `Quote submitted for ${selectedProduct}!`);
        setSelectedProduct(null);
        setQuoteForm({ name: '', email: '', quantity: 100 });
      } else {
        setNotification(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setNotification('Server error. Please try again later.');
    }

    setTimeout(() => setNotification(''), 6000);
  };
  
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-amber-950/10 dark:border-stone-800 transition-all transform scale-100">
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-6 right-6 text-stone-400 hover:text-amber-950 dark:hover:text-[#d4a373] p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 transition-all cursor-pointer"
        >
          <FaTimes className="text-lg" />
        </button>
        <h3 className="text-2xl font-black text-amber-950 dark:text-[#d4a373] mb-1">Configure Quote</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
          Product Line: <span className="text-amber-950 dark:text-[#d4a373] font-bold">{selectedProduct}</span>
        </p>

        <form onSubmit={handleQuoteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-stone-600 dark:text-stone-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={quoteForm.name}
              onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-amber-950 dark:focus:border-[#d4a373] text-sm text-stone-900 dark:text-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-stone-600 dark:text-stone-300 mb-1">
              Corporate Email Address
            </label>
            <input
              type="email"
              required
              value={quoteForm.email}
              onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-amber-950 dark:focus:border-[#d4a373] text-sm text-stone-900 dark:text-white"
              placeholder="purchasing@company.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-stone-600 dark:text-stone-300 mb-1">
              Estimated Unit Target Count
            </label>
            <input
              type="number"
              min="1"
              required
              value={quoteForm.quantity}
              onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-amber-950 dark:focus:border-[#d4a373] text-sm text-stone-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm mt-4 cursor-pointer
                       bg-amber-950 hover:bg-amber-900 text-white
                       dark:bg-[#c58f5e] dark:hover:bg-[#b88050] dark:text-black dark:border-[#c58f5e]"
          >
            Submit Estimate Request
          </button>
        </form>
      </div>
    </div>
  );
}
