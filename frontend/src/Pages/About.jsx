import React from 'react';
import { MdPrecisionManufacturing, MdCheckCircle } from 'react-icons/md';

export default function About() {
  const machinery = [
    'Four colour 20" x 28" Heidelberg Alcolour Offset Machine',
    'Four colour 19" x 25" Heidelberg Alcolour Offset Machine',
    'Two colour 23" x 36" Heidelberg Offset Machine',
    'Autoprint Baby Offset Machine',
    'Screen Printing Production Unit',
    'Precision Barcode Label Facility',
    'In-house Computerized Graphic Designing Unit',
    'Complete Post-Press & Finishing Systems',
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      
      {/* 1. Hero Header - Full Width End-to-End */}
      <section className="relative w-full overflow-hidden min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-start py-16 sm:py-24 text-left transition-colors border-b border-amber-900/40 dark:border-stone-800">
        
        {/* Background Layer: Komori Lithrone Machine Image (End-to-End of Screen) */}
        <div className="absolute inset-0 z-0 bg-amber-900 dark:bg-stone-900">
          <img 
            src="/images/Machines/lithrone_4_color.jpg" 
            alt="Komori Lithrone 4-Colour Offset Machine" 
            className="w-full h-full object-cover object-center transform scale-105"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Gradient Overlays for Left-Aligned Text Contrast & Machine Visibility - Balanced Warm Shade */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-amber-900/80 via-amber-900/40 to-transparent dark:from-stone-900/80 dark:via-stone-900/40 dark:to-transparent" 
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-amber-900/85 via-amber-900/50 to-transparent dark:from-stone-900/85 dark:via-stone-900/50 dark:to-transparent" 
          aria-hidden="true"
        />

        {/* Hero Content - Placed Towards Left Side */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-amber-400 dark:bg-[#d4a373] animate-pulse"></span>
              <span>Corporate Profile &amp; Heritage</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-3 drop-shadow-md">
              About Us
            </h1>

            <p className="mt-2 text-xl sm:text-2xl font-bold italic text-amber-300 dark:text-[#d4a373] tracking-wide drop-shadow-sm">
              "Printing Your Ideas, Creating Your Identity"
            </p>

            <p className="mt-4 text-base sm:text-lg text-amber-100/90 dark:text-stone-300 leading-relaxed font-medium drop-shadow-sm">
              Serving corporate clientele with precision offset printing, bespoke packaging, and reliable end-to-end execution since 1998.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Brochure Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200/80 dark:border-stone-800 p-7 sm:p-10 md:p-12 shadow-[0_15px_45px_-15px_rgba(69,26,3,0.08)] space-y-5">
          
          {/* Paragraph 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50/90 dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-800 border-l-4 border-l-amber-900 dark:border-l-[#d4a373]">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              We are JN Group establish from 1998 in the name of JN Enterprise. It brings us immense pleasure to introduce our self as amongs the top notch in the printing &amp; packaging industry over the decade and a half. We have another sister concern in the name of Yatharth Enterprise. Also we are associated with Krishna Graphics and The Pixel Press to fulfill all your needs from one stop destination.
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50/90 dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-800 border-l-4 border-l-amber-900 dark:border-l-[#d4a373]">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              Printing is a demanding profession that requires a high level of dedication, commitment and endless pursuance to perfection. Quality and perfection goes hand in hand with our name.
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50/90 dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-800 border-l-4 border-l-amber-900 dark:border-l-[#d4a373]">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              Our work area is spreaded over approx. 3500 sq.ft. area in which, we have various kinds of machineries and man power. Machineries to name a few are Four colour 20" x 28" Hedalbaurg Alcolour Offset Machine, Four colour 19" x 25" Hedalbaurg Alcolour Offset Machine, two colour 23" x 36" Hedalbaurg Machine, Autoprint Baby offset and Screen printing unit as well. We have Barcode Label Facility also. We do have Designing unit too as well. To be precise we have everything in house.
            </p>
          </div>

          {/* Paragraph 4 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50/90 dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-800 border-l-4 border-l-amber-900 dark:border-l-[#d4a373]">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              We believe in understanding our clientele's needs and raising our performance standards to meet this requirement. You can rest assured that our quality and services will in no way lag behind the needs of your business. We have a wide range of services which can cater to every one of your printing needs.
            </p>
          </div>

          {/* Prominent Brochure Closing Note */}
          <div className="mt-8 p-6 rounded-2xl bg-amber-50/80 dark:bg-stone-950 border border-amber-900/15 dark:border-[#d4a373]/25 text-center">
            <p className="text-base sm:text-lg font-bold text-amber-950 dark:text-[#d4a373] italic">
              "Hope you will find us competent enough to supply and fulfill your printing and it's related requirement."
            </p>
          </div>

        </div>
      </section>

      {/* 3. In-House Machinery & Technical Setup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200/80 dark:border-stone-800 p-7 sm:p-10 md:p-12 shadow-[0_15px_45px_-15px_rgba(69,26,3,0.08)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-950 border border-amber-950/10 dark:bg-stone-800 dark:text-[#d4a373] dark:border-stone-700">
              <MdPrecisionManufacturing className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-stone-100">
                In-House Machinery &amp; Technical Setup
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Complete self-reliant production infrastructure housed under our 3,500 sq. ft. facility.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {machinery.map((machine, index) => (
              <div 
                key={index}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 hover:border-amber-900/40 dark:hover:border-[#d4a373]/40 transition-all duration-200"
              >
                <MdCheckCircle className="w-5 h-5 text-amber-700 dark:text-[#d4a373] shrink-0" />
                <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                  {machine}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
