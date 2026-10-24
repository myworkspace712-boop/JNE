import { useState, useMemo } from 'react';
import { 
  MdSearch, 
  MdLocalPrintshop, 
  MdArrowForward, 
  MdCheckCircle, 
  MdOutlineHandshake,
  MdOutlineEngineering,
  MdAutoAwesome,
  MdSupportAgent
} from 'react-icons/md';

// Exact products list from brochure requirements
const PRODUCTS_DATA = [
  { id: 1, name: 'Brochures', category: 'Marketing Collateral', description: 'Bi-fold, tri-fold, and multi-page marketing collateral crafted to showcase your business portfolio.' },
  { id: 2, name: 'Catalogues', category: 'Marketing Collateral', description: 'High-definition full-color product catalogs presenting inventory with pristine clarity.' },
  { id: 3, name: 'Flyers', category: 'Marketing Collateral', description: 'Vibrant, high-volume promotional handbills engineered for events, launches, and campaigns.' },
  { id: 4, name: 'Calendars', category: 'Corporate Gifting', description: 'Custom desktop tent planners, executive wall calendars, and thematic yearly showcases.' },
  { id: 5, name: 'Diary', category: 'Corporate Gifting', description: 'Executive leatherette and hardbound annual corporate diaries with custom debossing.' },
  { id: 6, name: 'Folders', category: 'Corporate Stationery', description: 'Sturdy branded presentation folders featuring die-cut document pockets and business card slots.' },
  { id: 7, name: 'Business Card', category: 'Corporate Stationery', description: 'Luxury executive visiting cards with matte, gloss, velvet lamination, UV spot, and foil stamping.' },
  { id: 8, name: 'Letter Head', category: 'Corporate Stationery', description: 'Official corporate correspondence letterheads on imported sunshine and textured executive paper.' },
  { id: 9, name: 'Envelopes', category: 'Corporate Stationery', description: 'Bespoke custom-sized corporate mailing envelopes with peel-and-seal security strips.' },
  { id: 10, name: 'Bar Code Sticker Roll', category: 'Packaging & Labels', description: 'Precision thermal barcode and continuous automated roll labels with custom die-cutting for packaging lines and product inventory.' },
  { id: 11, name: 'Packing Box', category: 'Packaging & Labels', description: 'Heavy-duty corrugated, rigid, and folding carton packaging designed for premium presentation.' },
  { id: 13, name: 'Paper Bag', category: 'Packaging & Labels', description: 'Eco-conscious, luxury kraft and coated retail shopping bags fitted with durable rope handles.' },
  { id: 14, name: 'Annual Reports', category: 'Corporate Identity', description: 'Flawlessly bound, saddle-stitched or perfect-bound stakeholder reports with archival print fidelity.' },
  { id: 15, name: 'Corporate Invitation', category: 'Marketing Collateral', description: 'Bespoke event invitations, metallic foils, laser-cut sleeves, and bespoke gala cards.' },
  { id: 16, name: 'ID Card', category: 'Corporate Identity', description: 'High-security thermal PVC employee identity cards with clear RFID chip encoding options.' },
  { id: 17, name: 'Standee', category: 'Large Format Signage', description: 'Heavy-duty roll-up retractable aluminum exhibition standees built for maximum eye-level reach.' },
  { id: 18, name: 'Flex Banner Vinyl', category: 'Large Format Signage', description: 'Weatherproof high-tensile outdoor banners and digital self-adhesive vinyl graphics engineered for vibrant high-contrast visibility.' },
  { id: 19, name: 'Corporate Gift Articles', category: 'Corporate Gifting', description: 'Curated branded executive gifts including pens, customized desk accessories, drinkware, and hampers.' }
];

export default function Services({ setSelectedProduct }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamic category tabs
  const categories = useMemo(() => {
    return ['All', ...new Set(PRODUCTS_DATA.map(p => p.category))];
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/70 via-amber-50/40 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-900 py-16 sm:py-24 border-b border-amber-200/40 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-amber-500/10 dark:bg-orange-500/10 text-amber-900 dark:text-orange-400 border border-amber-300/40 dark:border-orange-500/30 text-xs sm:text-sm font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
              <MdLocalPrintshop className="w-4 h-4 text-amber-700 dark:text-orange-400" />
              JNGroup Production Matrix
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 dark:text-stone-100 tracking-tight leading-tight">
              Our Services
            </h1>

            {/* Prominent Brochure Tagline */}
            <p className="mt-4 text-xl sm:text-2xl font-semibold italic text-amber-700 dark:text-orange-400 tracking-wide">
              "Finest Creative And Printing Solution....."
            </p>
          </div>

          {/* Core Brochure Introductory Narrative - Exact 4 Paragraphs */}
          <div className="mt-12 max-w-4xl mx-auto bg-white/85 dark:bg-stone-800/85 backdrop-blur-md rounded-2xl border border-amber-200/60 dark:border-stone-700/80 p-6 sm:p-10 shadow-xl shadow-amber-950/5">
            <div className="space-y-6 text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
              
              {/* Paragraph 1 */}
              <div className="flex items-start gap-3.5">
                <span className="p-2 mt-1 rounded-xl bg-amber-100/80 dark:bg-stone-700 text-amber-800 dark:text-orange-400 shrink-0">
                  <MdOutlineHandshake className="w-5 h-5" />
                </span>
                <p>
                  JNGroup is a leading provider of printing services to corporate customers. Our convenient, cost-effective, time saving and high quality offset printing services have certainly helped us not only in winning good clientele but also share a long term relationship with them. We are a home of expert professionals with a long experience in developing all kinds of print designs for a very diverse of clients.
                </p>
              </div>

              {/* Paragraph 2 */}
              <div className="flex items-start gap-3.5">
                <span className="p-2 mt-1 rounded-xl bg-amber-100/80 dark:bg-stone-700 text-amber-800 dark:text-orange-400 shrink-0">
                  <MdAutoAwesome className="w-5 h-5" />
                </span>
                <p>
                  We offer a comprehensive range of services from preliminary design concepts to the final stage of print production to delivery. We use the latest technology, graphic design, sophisticated pre press, printing and post-production equipment to offer our customers the best quality printing services.
                </p>
              </div>

              {/* Paragraph 3 */}
              <div className="flex items-start gap-3.5">
                <span className="p-2 mt-1 rounded-xl bg-amber-100/80 dark:bg-stone-700 text-amber-800 dark:text-orange-400 shrink-0">
                  <MdOutlineEngineering className="w-5 h-5" />
                </span>
                <p>
                  We bring to the table many years of practical knowledge and experience to ensure that all your inputs are understood and to find any potential problems and suggest solutions to avoid them.
                </p>
              </div>

              {/* Paragraph 4 */}
              <div className="flex items-start gap-3.5">
                <span className="p-2 mt-1 rounded-xl bg-amber-100/80 dark:bg-stone-700 text-amber-800 dark:text-orange-400 shrink-0">
                  <MdSupportAgent className="w-5 h-5" />
                </span>
                <p>
                  They assist customers in job estimations, make recommendations where necessary and constantly interface with them till the job is completed and delivered.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Section Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-amber-700 dark:text-orange-400 font-bold text-sm tracking-widest uppercase">
              Production Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
              Our Products
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              From commercial stationery to bespoke packaging and large-format architectural displays.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:focus:ring-orange-400/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 dark:bg-orange-500 dark:text-stone-950'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid (4 columns on xl, 3 on lg, 2 on sm, 1 on mobile) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
            <p className="text-stone-500 dark:text-stone-400 text-lg font-medium">
              No products found matching "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-sm font-bold text-amber-700 dark:text-orange-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 p-6 flex flex-col justify-between hover:shadow-xl hover:border-amber-300/80 dark:hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-orange-300 bg-amber-50 dark:bg-stone-700/80 px-2.5 py-1 rounded-md border border-amber-200/50 dark:border-stone-600">
                      {product.category}
                    </span>
                    <MdCheckCircle className="w-4 h-4 text-emerald-600/70 dark:text-emerald-400/70" />
                  </div>

                  {/* Product Title */}
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-orange-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Product Description */}
                  <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Request Quote Button */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-700/60">
                  <button
                    onClick={() => setSelectedProduct && setSelectedProduct(product.name)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-amber-600 hover:text-white dark:bg-stone-700 dark:hover:bg-orange-500 dark:hover:text-stone-950 text-stone-900 dark:text-stone-100 font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-sm group-hover:shadow"
                  >
                    <span>Request Quote</span>
                    <MdArrowForward className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}