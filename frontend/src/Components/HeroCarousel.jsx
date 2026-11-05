import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  MdChevronLeft, 
  MdChevronRight, 
  MdPause, 
  MdCloudUpload, 
  MdDelete, 
  MdClose, 
  MdAddPhotoAlternate, 
  MdCheckCircle,
  MdRefresh
} from 'react-icons/md';

const MAX_HERO_SLIDES = 5;

// Curated 5 high-definition printing showcases from project assets
const DEFAULT_SLIDES = [
  {
    _id: 'default-1',
    imageUrl: '/machines/4_colour.jpg',
    tag: 'Offset Printing Hub',
    title: 'High-Speed 4-Colour Offset Printing',
    highlight: 'Offset Printing',
    subtitle: 'Heidelberg Alcolour offset machinery delivering high-volume B2B commercial printing with micrometer registration accuracy.',
    ctaPrimary: 'Inquire Now',
    ctaPrimaryLink: '/services',
    ctaSecondary: 'View Products',
    ctaSecondaryLink: '/products'
  },
  {
    _id: 'default-2',
    imageUrl: '/images/Packaging/corrugated_box.jpeg',
    tag: 'Packaging Solutions',
    title: 'Custom Corrugated & Transit Packaging',
    highlight: 'Corrugated Packaging',
    subtitle: 'Multi-ply fluted cardboard boxes (3-ply, 5-ply, 7-ply) engineered for impact resistance, compression strength, and global transit.',
    ctaPrimary: 'Order Packaging',
    ctaPrimaryLink: '/services',
    ctaSecondary: 'Packaging Specs',
    ctaSecondaryLink: '/products'
  },
  {
    _id: 'default-3',
    imageUrl: '/images/Packaging/rigid_boxes.jpg',
    tag: 'Luxury Rigid Board',
    title: 'Luxury Rigid Boxes & Bespoke Gifting',
    highlight: 'Rigid Boxes',
    subtitle: 'High-density structural chipboard wrapped in customized specialty textured art paper for luxury brands, watches, and electronics.',
    ctaPrimary: 'Request Quote',
    ctaPrimaryLink: '/services',
    ctaSecondary: 'View Range',
    ctaSecondaryLink: '/products'
  },
  {
    _id: 'default-4',
    imageUrl: '/images/Packaging/FBB Boxes.jpg',
    tag: 'FBB Folding Cartons',
    title: 'FBB (Folding Box Board) Cartons',
    highlight: 'FBB Cartons',
    subtitle: 'High-bulk virgin fiber paperboard engineered for crisp creases and superior printability for pharmaceuticals, cosmetics, and food retail.',
    ctaPrimary: 'Explore FBB',
    ctaPrimaryLink: '/services',
    ctaSecondary: 'Bulk Ordering',
    ctaSecondaryLink: '/bulk-order'
  },
  {
    _id: 'default-5',
    imageUrl: '/images/Brochure.jpg',
    tag: 'Corporate Media',
    title: 'Executive Catalogues & Corporate Brochures',
    highlight: 'Corporate Media',
    subtitle: 'Vibrant color fidelity, spot UV finishes, velvet-touch matte lamination, and perfect binding crafted for enterprise branding.',
    ctaPrimary: 'Get Brochure Quote',
    ctaPrimaryLink: '/services',
    ctaSecondary: 'All Capabilities',
    ctaSecondaryLink: '/services'
  }
];

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Upload modal form state
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideTag, setSlideTag] = useState('');

  const timerRef = useRef(null);
  const animTimeoutRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // 1. Load slides from backend API or local storage with default fallback
  const loadSlides = useCallback(async () => {
    try {
      // Check localStorage first for instant rendering
      const cached = localStorage.getItem('custom_hero_slides');
      let initialSlides = DEFAULT_SLIDES;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Ensure corrugated box is in parsed slides
            const hasCorrugated = parsed.some(s => s.imageUrl?.includes('corrugated_box'));
            if (!hasCorrugated) {
              const corrugatedSlide = DEFAULT_SLIDES.find(s => s.imageUrl?.includes('corrugated_box'));
              if (corrugatedSlide) {
                parsed.splice(1, 0, corrugatedSlide);
              }
            }
            initialSlides = parsed.slice(0, MAX_HERO_SLIDES);
            localStorage.setItem('custom_hero_slides', JSON.stringify(initialSlides));
          }
        } catch {
          // ignore parsing error
        }
      }

      setSlides(initialSlides);

      // Fetch dynamic backend slides if available
      const res = await axios.get(`${baseUrl}/api/hero-slides`, { timeout: 3000 });
      if (res.data?.data && res.data.data.length > 0) {
        const fetched = res.data.data.slice(0, MAX_HERO_SLIDES).map((s, idx) => ({
          _id: s._id || `backend-${idx}`,
          imageUrl: s.imageUrl?.startsWith('http') || s.imageUrl?.startsWith('/images') || s.imageUrl?.startsWith('/machines')
            ? s.imageUrl
            : `${baseUrl}${s.imageUrl}`,
          title: s.title || DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length].title,
          highlight: s.title ? s.title.split(' ')[0] : 'Printing',
          subtitle: s.subtitle || DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length].subtitle,
          tag: s.tag || 'Industrial Print',
          ctaPrimary: 'Inquire Now',
          ctaPrimaryLink: '/services',
          ctaSecondary: 'Explore Catalog',
          ctaSecondaryLink: '/products'
        }));
        setSlides(fetched);
        localStorage.setItem('custom_hero_slides', JSON.stringify(fetched));
      }
    } catch {
      // Backend offline or no response: rely on current state/defaults
    }
  }, [baseUrl]);

  useEffect(() => {
    loadSlides();
  }, [loadSlides]);

  const slidesCountRef = useRef(DEFAULT_SLIDES.length);

  useEffect(() => {
    slidesCountRef.current = slides.length;
  }, [slides.length]);

  // 2. Slide Navigation Callbacks (Ascending sequential order: 1 -> 2 -> 3 -> 4 -> 5...)
  const triggerTransition = useCallback(() => {
    setIsAnimating(true);
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    // As soon as slide changes, it gets back into a dot after 600ms
    animTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, []);

  const nextSlide = useCallback(() => {
    const total = slidesCountRef.current;
    if (total <= 1) return;
    triggerTransition();
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [triggerTransition]);

  const prevSlide = useCallback(() => {
    const total = slidesCountRef.current;
    if (total <= 1) return;
    triggerTransition();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [triggerTransition]);

  const goToSlide = (idx) => {
    if (idx === currentIndex) return;
    triggerTransition();
    setCurrentIndex(idx);
  };

  // 3. Autoplay (5-second intervals, no pause on hover)
  useEffect(() => {
    if (slides.length <= 1 || isModalOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, isModalOpen, nextSlide]);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  // 4. Touch swipe gesture support for mobile devices
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // 5. Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isModalOpen]);

  // 6. Handle local file selection for uploading
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit.');
      return;
    }

    setUploadError('');
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 7. Handle Slide Upload (strictly up to 5 images)
  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (slides.length >= MAX_HERO_SLIDES) {
      setUploadError(`Maximum of ${MAX_HERO_SLIDES} hero images allowed. Please delete one before adding another.`);
      return;
    }

    if (!selectedFile && !filePreview) {
      setUploadError('Please select an image to upload.');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      let finalImageUrl = filePreview;

      // Try uploading to backend if online
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('title', slideTitle || 'Precision Commercial Print');
        formData.append('subtitle', slideSubtitle || 'Bespoke high-volume industrial printing solutions.');
        formData.append('tag', slideTag || 'Commercial Print');

        const token = localStorage.getItem('token');
        const res = await axios.post(`${baseUrl}/api/hero-slides/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          timeout: 4000
        });

        if (res.data?.data?.imageUrl) {
          finalImageUrl = `${baseUrl}${res.data.data.imageUrl}`;
        }
      } catch (backendErr) {
        console.warn('Backend upload skipped, saving to client storage:', backendErr.message);
      }

      const newSlide = {
        _id: `custom-${Date.now()}`,
        imageUrl: finalImageUrl,
        tag: slideTag || 'Custom Showcase',
        title: slideTitle || 'Precision Printing Showcase',
        highlight: slideTitle ? slideTitle.split(' ')[0] : 'Precision',
        subtitle: slideSubtitle || 'High-volume commercial offset and packaging solutions engineered for global export.',
        ctaPrimary: 'Inquire Now',
        ctaPrimaryLink: '/services',
        ctaSecondary: 'View Products',
        ctaSecondaryLink: '/products'
      };

      const updated = [...slides, newSlide].slice(0, MAX_HERO_SLIDES);
      setSlides(updated);
      localStorage.setItem('custom_hero_slides', JSON.stringify(updated));

      // Reset form
      setSelectedFile(null);
      setFilePreview('');
      setSlideTitle('');
      setSlideSubtitle('');
      setSlideTag('');
      setUploadSuccess('Hero image uploaded successfully!');
      setCurrentIndex(updated.length - 1);
    } catch (err) {
      setUploadError(err.message || 'Failed to add hero slide.');
    } finally {
      setUploading(false);
    }
  };

  // 8. Delete a slide
  const handleDeleteSlide = async (idToDelete) => {
    if (slides.length <= 1) {
      setUploadError('At least 1 slide must remain in the carousel.');
      return;
    }

    try {
      // Try backend delete
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${baseUrl}/api/hero-slides/${idToDelete}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          timeout: 2000
        });
      } catch {
        // ignore backend failure
      }

      const updated = slides.filter((s) => s._id !== idToDelete);
      setSlides(updated);
      localStorage.setItem('custom_hero_slides', JSON.stringify(updated));
      setCurrentIndex(0);
      setUploadSuccess('Slide removed.');
    } catch (err) {
      setUploadError('Error removing slide: ' + err.message);
    }
  };

  // 9. Reset to default printing showcases
  const handleResetDefaults = () => {
    setSlides(DEFAULT_SLIDES);
    localStorage.removeItem('custom_hero_slides');
    setCurrentIndex(0);
    setUploadSuccess('Reset to showcase slides.');
    setUploadError('');
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Outer Framed Carousel Container */}
      <div
        className="relative w-full h-[480px] sm:h-[540px] md:h-[620px] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300
                   border-2 border-amber-950/20 bg-stone-100
                   dark:border-2 dark:border-[#d4a373]/30 dark:bg-black dark:shadow-[0_0_35px_rgba(212,163,115,0.08)]
                   group select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="J.N. Enterprise Highlighted Capabilities"
      >
        {/* Sliding Track */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide._id || idx}
              className="w-full h-full flex-shrink-0 relative overflow-hidden"
              aria-hidden={currentIndex !== idx}
            >
              {/* Slide Image with Smooth Scale on Hover */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading={idx === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length].imageUrl;
                }}
              />

              {/* Clean Dark Vignette Overlay for Text Legibility (No Brown Tint) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent hidden sm:block" />

              {/* Slide Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 lg:p-16 z-20 max-w-3xl text-left">
                
                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md mb-4">
                  {slide.title}
                </h1>

                {/* Subtitle / Description */}
                {slide.subtitle && (
                  <p className="text-stone-200/95 dark:text-stone-300 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mb-8 drop-shadow">
                    {slide.subtitle}
                  </p>
                )}

                {/* Modern CTA Button */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Primary CTA: GET QUOTE with right-facing arrow */}
                  <Link
                    to={slide.ctaPrimaryLink || '/services'}
                    className="inline-flex items-center justify-center font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0
                               bg-white hover:bg-stone-100 text-amber-950 border border-white/60
                               dark:bg-[#c58f5e] dark:hover:bg-[#b88050] dark:text-black dark:border-[#c58f5e] dark:shadow-[0_0_20px_rgba(212,163,115,0.35)]"
                  >
                    <span>GET QUOTE</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow: Previous Slide */}
        {slides.length > 1 && (
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer
                       bg-amber-950/60 hover:bg-amber-950/90 text-white border border-white/30
                       dark:bg-black/70 dark:hover:bg-black dark:text-[#d4a373] dark:border-[#d4a373]/50"
          >
            <MdChevronLeft className="text-2xl sm:text-3xl" />
          </button>
        )}

        {/* Navigation Arrow: Next Slide */}
        {slides.length > 1 && (
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer
                       bg-amber-950/60 hover:bg-amber-950/90 text-white border border-white/30
                       dark:bg-black/70 dark:hover:bg-black dark:text-[#d4a373] dark:border-[#d4a373]/50"
          >
            <MdChevronRight className="text-2xl sm:text-3xl" />
          </button>
        )}

        {/* Centered Bottom Bar: Pagination Indicators (Slider dot that elongates to horizontal line while switching, then returns to a dot) */}
        {slides.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-7 z-30 flex items-center backdrop-blur-md px-4 py-2 rounded-full border
                          bg-amber-950/60 border-white/30
                          dark:bg-black/80 dark:border-[#d4a373]/40">
            {/* Pagination Indicators */}
            <div className="flex items-center gap-2.5">
              {slides.map((_, dotIdx) => {
                const isActive = currentIndex === dotIdx;
                // While transitioning to this slide, it expands into a horizontal line, then returns to a dot
                const isLine = isActive && isAnimating;
                return (
                  <button
                    key={dotIdx}
                    onClick={() => goToSlide(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`rounded-full transition-all duration-300 ease-out cursor-pointer ${
                      isLine
                        ? 'w-7 sm:w-8 h-2 bg-white shadow-sm dark:bg-[#d4a373] dark:shadow-[0_0_8px_rgba(212,163,115,0.8)]'
                        : isActive
                        ? 'w-2.5 h-2.5 bg-white shadow-sm dark:bg-[#d4a373] dark:shadow-[0_0_8px_rgba(212,163,115,0.8)] scale-110'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/70 dark:bg-stone-700 dark:hover:bg-[#d4a373]/70'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          SLIDE UPLOAD & MANAGEMENT MODAL (Supports up to 5 uploaded images)
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border
                       bg-white text-amber-950 border-amber-950/15
                       dark:bg-black dark:text-stone-100 dark:border-[#d4a373]/40 dark:shadow-[0_0_40px_rgba(0,0,0,0.9)]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-950/10 dark:border-stone-800">
              <div>
                <h3 className="text-xl font-black text-amber-950 dark:text-[#d4a373] tracking-tight">
                  Hero Carousel Images
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  Upload up to 5 custom images for your hero carousel.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setUploadError('');
                  setUploadSuccess('');
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer
                           bg-stone-100 hover:bg-stone-200 text-amber-950
                           dark:bg-stone-900 dark:hover:bg-stone-800 dark:text-[#d4a373]"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {/* Slide Limit Progress Meter */}
            <div className="my-5 p-4 rounded-2xl border bg-stone-50 dark:bg-stone-950 border-amber-950/10 dark:border-stone-800">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-stone-700 dark:text-stone-300">Slots Used</span>
                <span className="text-amber-950 dark:text-[#d4a373] font-extrabold">{slides.length} of {MAX_HERO_SLIDES} slots</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div 
                  className="h-full bg-amber-950 transition-all duration-500 rounded-full dark:bg-[#c58f5e] dark:shadow-[0_0_10px_rgba(212,163,115,0.6)]"
                  style={{ width: `${(slides.length / MAX_HERO_SLIDES) * 100}%` }}
                />
              </div>
            </div>

            {/* Notification Messages */}
            {uploadError && (
              <div className="mb-4 p-3.5 rounded-xl text-xs font-semibold bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800">
                ⚠️ {uploadError}
              </div>
            )}
            {uploadSuccess && (
              <div className="mb-4 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800">
                <MdCheckCircle className="text-base flex-shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* Upload Form (Shown only if under limit of 5) */}
            {slides.length < MAX_HERO_SLIDES ? (
              <form onSubmit={handleUploadSubmit} className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-stone-300 mb-2">
                    Choose Image (Max 5MB)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer transition-all
                                    border-amber-950/20 hover:border-amber-950 bg-stone-50/70 hover:bg-stone-50
                                    dark:border-stone-700 dark:hover:border-[#d4a373] dark:bg-stone-950 dark:hover:bg-stone-900">
                    {filePreview ? (
                      <div className="relative w-full h-full p-2">
                        <img src={filePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <MdAddPhotoAlternate className="text-3xl text-amber-950 dark:text-[#d4a373] mb-1" />
                        <span className="text-xs font-bold text-amber-950 dark:text-stone-200">Click to Browse Device</span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">JPEG, PNG, WebP up to 5MB</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-stone-300 mb-1">
                      Headline Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4-Colour Offset Printing"
                      value={slideTitle}
                      onChange={(e) => setSlideTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-colors
                                 bg-stone-50 border-stone-300 focus:border-amber-950 text-stone-900
                                 dark:bg-stone-900 dark:border-stone-700 dark:focus:border-[#d4a373] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-stone-300 mb-1">
                      Pill Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Premium Offset"
                      value={slideTag}
                      onChange={(e) => setSlideTag(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-colors
                                 bg-stone-50 border-stone-300 focus:border-amber-950 text-stone-900
                                 dark:bg-stone-900 dark:border-stone-700 dark:focus:border-[#d4a373] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-stone-300 mb-1">
                    Subtitle Description
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Brief description of the machinery or commercial printing service..."
                    value={slideSubtitle}
                    onChange={(e) => setSlideSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-colors resize-none
                               bg-stone-50 border-stone-300 focus:border-amber-950 text-stone-900
                               dark:bg-stone-900 dark:border-stone-700 dark:focus:border-[#d4a373] dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading || (!selectedFile && !filePreview)}
                  className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                             bg-amber-950 hover:bg-amber-900 text-white
                             dark:bg-[#c58f5e] dark:hover:bg-[#b88050] dark:text-black dark:border-[#c58f5e] dark:shadow-[0_0_15px_rgba(212,163,115,0.3)]"
                >
                  {uploading ? 'Adding Image...' : 'Add Image to Carousel'}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl mb-6 text-center border bg-stone-50 border-amber-950/15 dark:bg-stone-950 dark:border-stone-800">
                <span className="text-xs font-bold text-amber-950 dark:text-[#d4a373]">
                  Maximum of 5 slides reached. Delete an existing slide below to upload a new one.
                </span>
              </div>
            )}

            {/* Current Slides Management List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-stone-300">
                  Active Slides ({slides.length})
                </h4>
                <button
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-950 dark:text-[#d4a373] hover:underline cursor-pointer"
                >
                  <MdRefresh className="text-sm" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {slides.map((s, idx) => (
                  <div
                    key={s._id || idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={s.imageUrl}
                        alt={s.title}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0 border border-stone-200 dark:border-stone-700"
                      />
                      <div className="min-w-0">
                        <span className="block text-xs font-extrabold truncate text-amber-950 dark:text-white">
                          #{idx + 1} {s.title}
                        </span>
                        <span className="block text-[11px] text-stone-500 dark:text-stone-400 truncate">
                          {s.tag || 'Showcase'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSlide(s._id)}
                      disabled={slides.length <= 1}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Delete Slide"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
