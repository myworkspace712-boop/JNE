import { useEffect, useState } from "react";
import { MdSearch, MdChevronLeft, MdChevronRight } from "react-icons/md";

// Placeholder images for JN Enterprise Printing
const SLIDES = [
  { img: "https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=1200", alt: "Offset Printing" },
  { img: "https://images.unsplash.com/photo-1617325247661-6750050bc6a6?q=80&w=1200", alt: "Digital Printing" },
  { img: "https://images.unsplash.com/photo-1598425237654-4c05c490a6ea?q=80&w=1200", alt: "Packaging Box" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeSlide = (nextIndexOrUpdater) => {
    setCurrent(nextIndexOrUpdater);
    setIsTransitioning(true);
  };

  // Carousel timer logic derived from previous Hero.jsx
  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, current]);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-yellow-50 via-amber-50 to-yellow-100 dark:from-stone-800 dark:via-stone-900 dark:to-stone-950 min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Centered Headline */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h1 className="font-extrabold text-amber-950 dark:text-orange-300 text-4xl sm:text-5xl leading-tight tracking-tight">
            High-Definition Precision Printing <br className="hidden sm:inline" />
            <span className="text-amber-600 dark:text-stone-200">For Your Corporate Identity</span>
          </h1>
        </div>

        {/* Smaller, Centered Carousel */}
        <div className="relative w-full max-w-4xl h-[350px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
          
          {/* Fading Border Overlay */}
          <div 
            className="absolute inset-0 rounded-3xl border border-amber-800 dark:border-stone-800 pointer-events-none z-30" 
            style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)' }} 
          />

          {/* Images */}
          {SLIDES.map((s, i) => (
            <img
              key={i}
              src={s.img}
              alt={s.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
                          ${i === current ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          {/* 3-Fold Shading: Darker at bottom, transparent at top */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />

          {/* Prev Button */}
          <button
            onClick={() => changeSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full
                       bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30
                       flex items-center justify-center text-white
                       transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <MdChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => changeSlide((p) => (p + 1) % SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full
                       bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30
                       flex items-center justify-center text-white
                       transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <MdChevronRight className="w-8 h-8" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => changeSlide(i)}
                className={`rounded-full transition-all duration-300 ease-in-out cursor-pointer
                ${i === current ? (isTransitioning ? "w-8 h-2 bg-yellow-50" : "w-2 h-2 bg-yellow-50") : "w-2 h-2 bg-yellow-50/50 hover:bg-yellow-50/80"}`}
              />
            ))}
          </div>
        </div>

        {/* Floating Action Card */}
        <div className="relative z-30 mt-8 bg-[#290f02] dark:bg-stone-900/90 backdrop-blur-xl border border-yellow-50/20 dark:border-stone-600 rounded-3xl p-6 shadow-xl w-[90%] sm:w-[500px] flex flex-col items-center text-center transition-transform hover:-translate-y-1">
          <h3 className="font-bold text-orange-100 dark:text-stone-200 text-lg sm:text-xl mb-1">
            Start Your Print Project
          </h3>
          <p className="text-orange-300 dark:text-stone-200 text-sm mb-5">
            Search our catalog of 18 premium products to get a quote.
          </p>
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="w-full flex items-center p-1 rounded-full border border-yellow-50/30 dark:border-stone-500 bg-transparent hover:bg-black/20 dark:hover:bg-black/40 focus-within:border-yellow-50/60 dark:focus-within:border-stone-400/60 focus-within:shadow-[0_0_15px_rgba(254,252,232,0.25)] dark:focus-within:shadow-[0_0_15px_rgba(168,162,158,0.25)] transition-all duration-300"
          >
            <div className="flex items-center gap-2 px-3 py-2 flex-1 min-w-0">
              <MdSearch className="w-5 h-5 text-white/70 shrink-0" />
              <input
                type="text"
                placeholder="Search Business Cards, Flyers..."
                className="bg-transparent border-none outline-none text-sm placeholder:text-white/70 w-full min-w-0 text-white"
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.currentTarget.blur();
              }}
              className="rounded-full bg-orange-100 hover:bg-orange-100/90 dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-950 text-amber-950
                         transition-all duration-300 text-sm font-bold active:scale-95
                         px-6 py-2.5 cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}