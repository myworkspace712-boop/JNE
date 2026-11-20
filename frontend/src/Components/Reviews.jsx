import React from 'react';
import { MdStar, MdFormatQuote, MdVerified, MdCheckCircle } from 'react-icons/md';

const REVIEWS = [
  {
    name: "Rajesh Mehta",
    designation: "VP of Supply Chain",
    company: "Apex Pharmaceuticals Ltd.",
    category: "Pharma Packaging",
    rating: 5,
    quote: "J.N. Enterprise has managed our high-volume FBB folding cartons and pharmaceutical inserts for over two years. Their registration accuracy and batch-to-batch color consistency meet our strict compliance standards every single run.",
    projectScope: "50,000+ Units Quarterly"
  },
  {
    name: "Ananya Sharma",
    designation: "Head of Brand Experience",
    company: "Lumina Luxury Retail",
    category: "Rigid Packaging",
    rating: 5,
    quote: "We needed bespoke rigid presentation boxes with gold debossed foil stamping on tight festive deadlines. JNE produced flawless sample mockups, executed mass production seamlessly, and delivered two days ahead of schedule.",
    projectScope: "Festive Rigid Box Collection"
  },
  {
    name: "Vikram Singhania",
    designation: "Director of Operations",
    company: "Technova Enterprise Solutions",
    category: "Corporate Media",
    rating: 5,
    quote: "From our case-bound corporate diaries and desk calendars to multi-page annual catalogues, their offset quality is unmatched. Having in-house prepress and post-press finishing under one roof makes coordination effortless.",
    projectScope: "Corporate Stationery & Catalogues"
  }
];

export default function Reviews() {
  return (
    <section className="py-16 md:py-24 bg-stone-50 dark:bg-stone-950 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5 shadow-xs
                          bg-amber-950 text-white border border-amber-900
                          dark:bg-stone-800 dark:text-[#d4a373] dark:border-stone-700">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span>CLIENT TESTIMONIALS</span>
          </div>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Discover why corporate enterprises, retail brands, and manufacturers trust J.N. Enterprise for industrial offset printing and bespoke packaging.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {REVIEWS.map((review, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-stone-900 rounded-3xl p-7 sm:p-8 border border-stone-200/80 dark:border-stone-800 hover:border-amber-900/40 dark:hover:border-[#d4a373]/50 shadow-[0_10px_35px_-15px_rgba(69,26,3,0.07)] hover:shadow-[0_22px_48px_-12px_rgba(69,26,3,0.15)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden"
            >
              {/* Quote Watermark Icon */}
              <div className="absolute top-5 right-5 text-stone-200/80 dark:text-stone-800 group-hover:text-amber-200/60 dark:group-hover:text-amber-900/30 transition-colors pointer-events-none">
                <MdFormatQuote className="text-5xl" />
              </div>

              <div>
                {/* Star Rating */}
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-stone-800/80 border border-amber-200/60 dark:border-stone-700/80 text-amber-600 dark:text-[#d4a373] mb-5 relative z-10 w-fit">
                  {[...Array(review.rating)].map((_, i) => (
                    <MdStar key={i} className="text-base" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 italic relative z-10">
                  "{review.quote}"
                </p>
              </div>

              {/* Author & Verification Card Footer */}
              <div className="mt-2 pt-5 border-t border-stone-100 dark:border-stone-800/80 relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm sm:text-base text-amber-950 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-[#d4a373] transition-colors">
                    {review.name}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-400">
                    <MdVerified className="text-sm text-amber-700 dark:text-[#d4a373]" />
                    <span>Verified</span>
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {review.designation}, <span className="font-medium text-stone-700 dark:text-stone-300">{review.company}</span>
                </p>
                <div className="mt-2.5 text-[11px] font-medium text-stone-600 dark:text-stone-400">
                  📦 Scope: {review.projectScope}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Metric Stats Bar */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 text-white shadow-[0_20px_50px_-15px_rgba(69,26,3,0.35)] border border-amber-800/60 dark:border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x md:divide-amber-800/40 dark:md:divide-stone-800">
          <div className="md:px-4">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">4.9 / 5.0</div>
            <div className="text-xs sm:text-sm text-amber-200/90 dark:text-[#d4a373] font-medium">Average Client Rating</div>
          </div>
          <div className="md:px-4">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">150+</div>
            <div className="text-xs sm:text-sm text-amber-200/90 dark:text-[#d4a373] font-medium">Enterprise Clients</div>
          </div>
          <div className="md:px-4">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">99.2%</div>
            <div className="text-xs sm:text-sm text-amber-200/90 dark:text-[#d4a373] font-medium">On-Time Bulk Dispatch</div>
          </div>
          <div className="md:px-4">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">25+ Yrs</div>
            <div className="text-xs sm:text-sm text-amber-200/90 dark:text-[#d4a373] font-medium">Press Excellence (Est. 1998)</div>
          </div>
        </div>

      </div>
    </section>
  );
}

