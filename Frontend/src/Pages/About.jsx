import React from 'react';
import { 
  MdBusiness, 
  MdPrecisionManufacturing, 
  MdVerified, 
  MdBrowseGallery, 
  MdOutlineHandshake, 
  MdOutlineLocationOn,
  MdCheckCircle
} from 'react-icons/md';

export default function About() {
  const highlights = [
    {
      label: 'Established',
      value: '1998',
      desc: 'Founded as JN Enterprise with over a decade and a half of packaging mastery.',
      icon: MdBusiness,
    },
    {
      label: 'Sister Concern',
      value: 'Yatharth Enterprise',
      desc: 'Extending specialized capacity and manufacturing capabilities.',
      icon: MdVerified,
    },
    {
      label: 'Strategic Associates',
      value: 'Sai Print Art & Krishna Graphics',
      desc: 'United to fulfill diverse printing & finishing needs from one stop.',
      icon: MdOutlineHandshake,
    },
    {
      label: 'Facility Footprint',
      value: 'Approx. 3,500 Sq. Ft.',
      desc: 'Integrated in-house manufacturing, prepress, and warehouse work area.',
      icon: MdOutlineLocationOn,
    },
  ];

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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/70 via-amber-50/40 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-900 py-16 sm:py-24 border-b border-amber-200/50 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/10 dark:bg-orange-500/10 text-amber-900 dark:text-orange-400 border border-amber-300/40 dark:border-orange-500/30 text-xs sm:text-sm font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
            <MdBrowseGallery className="w-4 h-4 text-amber-700 dark:text-orange-400" />
            Corporate Profile & Heritage
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 dark:text-stone-100 tracking-tight leading-tight">
            About Us
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-semibold italic text-amber-700 dark:text-orange-400 tracking-wide max-w-3xl mx-auto">
            "Finest Creative And Printing Solution....."
          </p>

          <p className="mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Serving corporate clientele with precision offset printing, bespoke packaging, and reliable end-to-end execution since 1998.
          </p>

        </div>
      </section>

      {/* 2. Core Brochure Narrative & Facility Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white/90 dark:bg-stone-800/90 backdrop-blur-md rounded-2xl border border-amber-200/60 dark:border-stone-700/80 p-8 sm:p-12 shadow-xl shadow-amber-950/5 space-y-6">
          
          {/* Facility / Brochure Hero Image */}
          <div className="overflow-hidden rounded-xl border border-amber-200/60 dark:border-stone-700 shadow-md">
            <img 
              src="/Images/Brochure.jpg" 
              alt="J. N. Enterprise Facility & Production Infrastructure" 
              className="w-full h-64 sm:h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-500 ease-out"
              onError={(e) => {
                // Graceful fallback if custom image is not found
                e.currentTarget.src = '/Images/Brochure.jpg';
              }}
            />
          </div>

          {/* Paragraph 1 */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/60 dark:bg-stone-750/50 border border-amber-100 dark:border-stone-700">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              We are JN Group establish from 1998 in the name of JN Enterprise. It brings us immense pleasure to introduce our self as amongs the top notch in the printing &amp; packaging industry over the decade and a half. We have another sister concern in the name of Yatharth Enterprise. Also we are associate with Sai Print Art and Krishna Graphics to fulfill all your needs from one stop destination.
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/60 dark:bg-stone-750/50 border border-amber-100 dark:border-stone-700">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              Printing is a demanding profession that requires a high level of dedication, commitment and endless pursuance to perfection. Quality and perfection goes hand in hand with our name.
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/60 dark:bg-stone-750/50 border border-amber-100 dark:border-stone-700">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              Our work area is spreaded over approx. 3500 sq.ft. area in which, we have various kinds of machineries and man power. Machineries to name a few are Four colour 20" x 28" Hedalbaurg Alcolour Offset Machine, Four colour 19" x 25" Hedalbaurg Alcolour Offset Machine, two colour 23" x 36" Hedalbaurg Machine, Autoprint Baby offset and Screen printing unit as well. We have Barcode Label Facility also. We do have Designing unit too as well. To be precise we have everything in house.
            </p>
          </div>

          {/* Paragraph 4 */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/60 dark:bg-stone-750/50 border border-amber-100 dark:border-stone-700">
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              We believe in understanding our clientele's needs and raising our performance standards to meet this requirement. You can rest assured that our quality and services will in no way lag behind the needs of your business. We have a wide range of services which can cater to every one of your printing needs.
            </p>
          </div>

          {/* Prominent Brochure Closing Note */}
          <div className="mt-8 pt-6 border-t border-amber-200/60 dark:border-stone-700 text-center">
            <p className="text-base sm:text-lg font-bold text-amber-900 dark:text-orange-400 italic">
              "Hope you will find us competent enough to supply and fulfill your printing and it's related requirement."
            </p>
          </div>

        </div>
      </section>

      {/* 3. Infrastructure Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-700 dark:text-orange-400 font-bold text-sm tracking-widest uppercase">
            Operational Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Infrastructure &amp; Capabilities
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2">
            A look into our multi-unit production strength, sister concerns, and in-house press setups.
          </p>
        </div>

        {/* 4-Card Infrastructure Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 p-6 shadow-sm hover:shadow-lg hover:border-amber-300/80 dark:hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-stone-700 text-amber-800 dark:text-orange-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {item.label}
                </span>
                <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mt-1 mb-2">
                  {item.value}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* In-House Machinery & Equipment Roster */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 p-8 sm:p-10 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-stone-700 text-amber-800 dark:text-orange-400">
              <MdPrecisionManufacturing className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
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
                className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-750 border border-stone-100 dark:border-stone-700"
              >
                <MdCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
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