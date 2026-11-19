import React from 'react';
import { 
  MdBusiness, 
  MdColorLens, 
  MdPrint 
} from 'react-icons/md';

const PARTNERS = [
  {
    name: "Yatharth Enterprise",
    role: "Sister Concern",
    desc: "Extended manufacturing capacity & specialized industrial packaging solutions.",
    icon: MdBusiness,
    tag: "Group Concern"
  },
  {
    name: "Krishna Graphics",
    role: "Pre-Press Partner",
    desc: "In-house computerized graphic design, CTP processing, and prepress calibration.",
    icon: MdColorLens,
    tag: "Design & CTP"
  },
  {
    name: "The Pexel Press",
    role: "Strategic Print Associate",
    desc: "Commercial printing and specialty packaging production partner delivering high-turnaround execution.",
    icon: MdPrint,
    tag: "Print Partner"
  }
];

export default function Partners() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-amber-50 via-stone-50 to-amber-100/50 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-950 border-t border-b border-amber-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-xs
                          bg-amber-950 text-white border border-amber-900
                          dark:bg-stone-800 dark:text-[#d4a373] dark:border-stone-700">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span>OUR STRATEGIC ALLIANCES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-950 dark:text-stone-100 tracking-tight mb-3">
            Our Partners &amp; Sister Concern
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            United in manufacturing strength, state-of-the-art Japanese &amp; German press technology, and dedicated prepress studios to deliver seamless end-to-end solutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PARTNERS.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div 
                key={index}
                className="group bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-7 border border-amber-950/10 dark:border-stone-800 hover:border-amber-900/50 dark:hover:border-[#d4a373]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Top Bar with Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                                  bg-amber-50 text-amber-950 group-hover:bg-amber-950 group-hover:text-white
                                  dark:bg-stone-800 dark:text-[#d4a373] dark:group-hover:bg-[#d4a373] dark:group-hover:text-black">
                    <Icon className="text-2xl" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border
                                   bg-stone-50 text-amber-950 border-amber-950/15
                                   dark:bg-stone-950 dark:text-[#d4a373] dark:border-stone-800">
                    {partner.tag}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg sm:text-xl font-bold text-amber-950 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-[#d4a373] transition-colors mb-1">
                  {partner.name}
                </h3>
                <span className="text-xs font-semibold text-amber-800 dark:text-[#d4a373] block mb-3">
                  {partner.role}
                </span>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {partner.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

