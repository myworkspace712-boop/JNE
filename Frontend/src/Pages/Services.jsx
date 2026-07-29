import { useState, useMemo } from 'react';
import { catalog } from '../Data/catalog.js';
import { MdFilterList, MdArrowDownward, MdArrowUpward } from 'react-icons/md';


export default function Services({ setSelectedProduct }) {
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['All', ...new Set(catalog.map(item => item.cat))];

  const filteredAndSorted = useMemo(() => {
    let result = [...catalog];
    if (category !== 'All') {
      result = result.filter(item => item.cat === category);
    }
    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    return result;
  }, [category, sortOrder]);

  return (
    <section className="bg-amber-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-amber-950 dark:text-orange-300 tracking-tight">Our Services</h2>
          <p className="text-lg text-amber-800/80 dark:text-stone-300 mt-3">
            Explore the complete production capability blueprint of JN Enterprise. Click on any dynamic product matrix square below to configure sizing matrix requirements.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-stone-800 p-4 rounded-2xl border border-amber-300/70 dark:border-stone-700 shadow-sm mb-10 gap-4 transition-all">
          
          {/* Category Filter */}
          <div 
            className="flex items-center gap-3 w-full sm:w-auto relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setIsDropdownOpen(false);
            }}
          >
            <MdFilterList className="text-amber-700 dark:text-orange-300 w-5 h-5 ml-1 shrink-0" />
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between bg-amber-50 hover:bg-amber-100 dark:bg-stone-900 dark:hover:bg-stone-800 border border-amber-300/70 dark:border-stone-600 text-amber-900 dark:text-stone-200 text-sm font-semibold rounded-xl px-4 py-2 outline-none focus:ring-4 focus:ring-amber-400/30 dark:focus:ring-orange-400/30 cursor-pointer w-full sm:w-48 transition-all duration-500 ease-out shadow-sm"
            >
              <span>{category}</span>
              <MdArrowDownward className={`w-4 h-4 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 sm:left-9 mt-2 w-full sm:w-48 bg-zinc-50 dark:bg-stone-800 border border-amber-200/50 dark:border-stone-700 rounded-xl shadow-xl z-50 flex flex-col py-1 overflow-hidden animate-fade-in">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setIsDropdownOpen(false); }}
                    className={`text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      category === cat 
                        ? 'bg-amber-100 text-amber-900 dark:bg-stone-700 dark:text-orange-300' 
                        : 'text-amber-800 dark:text-stone-300 hover:bg-amber-100/50 dark:hover:bg-stone-700/50 hover:text-amber-900 dark:hover:text-orange-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Toggle */}
          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="flex items-center justify-between gap-2 bg-amber-50 hover:bg-amber-100 dark:bg-stone-900 dark:hover:bg-stone-700 border border-amber-300/70 dark:border-stone-600 text-amber-900 dark:text-stone-200 text-sm font-semibold rounded-xl px-5 py-2 transition-all duration-500 ease-out cursor-pointer w-full sm:w-auto"
          >
            <span>Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
            {sortOrder === 'asc' ? <MdArrowUpward className="w-4 h-4 text-amber-700 dark:text-orange-300" /> : <MdArrowDownward className="w-4 h-4 text-amber-700 dark:text-orange-300" />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((product, index) => (
            <div 
              key={product.name + index} 
              className="group cursor-pointer bg-zinc-50 dark:bg-stone-800 rounded-2xl border border-amber-300/70 dark:border-stone-700 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-amber-100 dark:bg-stone-800 border border-amber-300/70 dark:border-orange-300/50 shadow-sm text-amber-800 dark:text-orange-300/86 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.cat}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-amber-900 dark:text-stone-300 group-hover:text-amber-600 dark:group-hover:text-orange-300 transition-colors mb-2">
                  {product.name}
                </h3>
                <p className="text-amber-700 dark:text-stone-300/80 text-sm leading-relaxed mb-6">
                  Custom, professional calibration optimized for {product.name.toLowerCase()} architecture matching dynamic branding files.
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(product.name)}
                className="w-full cursor-pointer bg-amber-100 hover:bg-amber-600 dark:bg-stone-800 dark:hover:bg-orange-400 text-amber-900 hover:text-stone-50 dark:text-orange-300 dark:hover:text-stone-800 font-bold py-3 rounded-xl transition-all duration-500 ease-out text-sm border border-amber-300/50 dark:border-stone-600"
              >
                Configure & Request Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}