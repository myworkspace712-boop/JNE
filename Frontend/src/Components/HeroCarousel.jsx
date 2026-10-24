import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { MdChevronLeft, MdChevronRight, MdPause, MdPlayArrow } from 'react-icons/md';

// Fallback high-quality printing slides if backend has no active slides yet
const FALLBACK_SLIDES = [
  {
    _id: 'default-1',
    imageUrl: 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=1600&auto=format&fit=crop',
    title: 'High-Definition Precision Offset Printing',
    subtitle: 'Sharp textures, vibrant fidelity, and industrial reliability for all scale requirements.',
  },
  {
    _id: 'default-2',
    imageUrl: 'https://images.unsplash.com/photo-1617325247661-6750050bc6a6?q=80&w=1600&auto=format&fit=crop',
    title: 'Next-Generation Digital & Packaging Solutions',
    subtitle: 'Custom tailored finishes, bespoke corporate packaging, and premium textures.',
  },
  {
    _id: 'default-3',
    imageUrl: 'https://images.unsplash.com/photo-1598425237654-4c05c490a6ea?q=80&w=1600&auto=format&fit=crop',
    title: 'Corporate Identity & Luxury Print Media',
    subtitle: 'Elevate your brand with executive stationery, diaries, and specialty substrates.',
  },
];

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch maximum 5 slides from backend
  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/hero-slides`);
        if (isMounted) {
          if (res.data?.data && res.data.data.length > 0) {
            // Strictly cap at maximum 5 slides
            const fetched = res.data.data.slice(0, 5).map((slide) => ({
              ...slide,
              // Normalize image path: prepend baseUrl if relative upload path
              imageUrl: slide.imageUrl.startsWith('http')
                ? slide.imageUrl
                : `${baseUrl}${slide.imageUrl}`,
            }));
            setSlides(fetched);
          } else {
            setSlides(FALLBACK_SLIDES);
          }
        }
      } catch (err) {
        console.warn('Backend hero-slides request failed, displaying curated fallback slides:', err.message);
        if (isMounted) {
          setSlides(FALLBACK_SLIDES);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, [baseUrl]);

  // Slide navigation callbacks
  const nextSlide = useCallback(() => {
    setSlides((currentSlides) => {
      if (!currentSlides.length) return currentSlides;
      setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
      return currentSlides;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setSlides((currentSlides) => {
      if (!currentSlides.length) return currentSlides;
      setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
      return currentSlides;
    });
  }, []);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Autoplay with hover-to-pause logic
  useEffect(() => {
    if (loading || slides.length <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, slides.length, isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile responsiveness
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        // Swiped Left
        nextSlide();
      } else {
        // Swiped Right
        prevSlide();
      }
    }
  };

  // Keyboard navigation accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // 1. Skeleton Loading State
  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden skeleton-shimmer border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-end p-6 sm:p-12">
          {/* Skeleton Content Placeholders */}
          <div className="w-24 h-6 rounded-full bg-stone-300 dark:bg-stone-700 mb-4 animate-pulse"></div>
          <div className="w-3/4 max-w-lg h-9 rounded-xl bg-stone-300 dark:bg-stone-700 mb-3 animate-pulse"></div>
          <div className="w-1/2 max-w-md h-5 rounded-lg bg-stone-300 dark:bg-stone-700 animate-pulse"></div>
          <div className="flex gap-2 mt-8">
            <div className="w-8 h-2 rounded-full bg-stone-300 dark:bg-stone-700"></div>
            <div className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-700"></div>
            <div className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-700"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      {/* Outer Modern Framed Container with Soft Shadows & Rounded-3xl */}
      <div
        className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-900 group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Highlighted printing showcases"
      >
        {/* Slides Track */}
        <div
          className="w-full h-full flex transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide._id || idx}
              className="w-full h-full flex-shrink-0 relative overflow-hidden"
              aria-hidden={currentIndex !== idx}
            >
              {/* Background Image with subtle zoom hover & cover fit */}
              <img
                src={slide.imageUrl}
                alt={slide.title || `Hero Slide ${idx + 1}`}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Dynamic Gradient Overlays for readable text & aesthetic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent hidden sm:block" />

              {/* Slide Caption / Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 z-20 max-w-2xl text-left">
                <span className="glass-badge mb-3 shadow-sm inline-block">
                  Premium Printing
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                  {slide.title || 'Precision Meets Perfection'}
                </h2>
                {slide.subtitle && (
                  <p className="mt-2 text-sm sm:text-base text-stone-200/90 line-clamp-2 sm:line-clamp-none max-w-xl font-normal drop-shadow">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hover-to-Pause Visual Indicator Pill (Top Right) */}
        <div
          className={`absolute top-4 right-4 z-30 transition-opacity duration-300 pointer-events-none px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/20 text-white ${
            isPaused ? 'opacity-90 bg-stone-900/70' : 'opacity-0'
          }`}
        >
          <MdPause className="text-sm" />
          <span>Paused</span>
        </div>

        {/* Navigation Arrow Left */}
        {slides.length > 1 && (
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-stone-900/40 hover:bg-stone-900/80 text-white backdrop-blur-md border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MdChevronLeft className="text-2xl sm:text-3xl" />
          </button>
        )}

        {/* Navigation Arrow Right */}
        {slides.length > 1 && (
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-stone-900/40 hover:bg-stone-900/80 text-white backdrop-blur-md border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MdChevronRight className="text-2xl sm:text-3xl" />
          </button>
        )}

        {/* Pagination Dots (Bottom) */}
        {slides.length > 1 && (
          <div className="absolute bottom-5 right-6 sm:right-10 z-30 flex items-center gap-2 bg-stone-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-7 h-2 bg-amber-500 shadow-sm'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
