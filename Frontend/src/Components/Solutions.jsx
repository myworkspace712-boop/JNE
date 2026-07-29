import { MdHighQuality, MdAccessTime, MdDesignServices, MdSavings, MdInventory, MdLayers } from "react-icons/md";
import { Link } from 'react-router-dom';


const SOLUTIONS = [
  {
    id: 1,
    icon: <MdHighQuality className="w-7 h-7" />,
    title: "Inconsistent Print Quality",
    problem: "Prints often suffer from color mismatches, text mismatches, poor finishing, or inconsistent quality.",
    solution: "High-precision printing processes, premium materials, and strict quality checks ensure every print maintains professional standards."
  },
  {
    id: 2,
    icon: <MdAccessTime className="w-7 h-7" />,
    title: "Delayed Deliveries",
    problem: "Missed deadlines affect marketing campaigns, launches, and customer commitments.",
    solution: "Efficient production planning and dependable delivery schedules keep every project on time."
  },
  {
    id: 3,
    icon: <MdDesignServices className="w-7 h-7" />,
    title: "Limited Customization",
    problem: "Many printers cannot accommodate unique branding, finishes, or custom requirements.",
    solution: "From custom sizes and finishes to personalized branding, we deliver tailored printing solutions."
  },
  {
    id: 4,
    icon: <MdSavings className="w-7 h-7" />,
    title: "High Printing Costs",
    problem: "Businesses often overspend due to inefficient production methods or unnecessary waste.",
    solution: "Optimized workflows and cost-effective production provide premium quality while maximizing value."
  },
  {
    id: 5,
    icon: <MdInventory className="w-7 h-7" />,
    title: "Managing Large Orders",
    problem: "Bulk orders become difficult to coordinate while maintaining quality consistency.",
    solution: "Scalable production capacity ensures uniform quality across both small and large-volume print jobs."
  },
  {
    id: 6,
    icon: <MdLayers className="w-7 h-7" />,
    title: "One Vendor for Everything",
    problem: "Businesses waste time coordinating multiple vendors for different printing needs.",
    solution: "We offer a complete range of printing services under one roof, simplifying project management."
  }
];


export default function Solutions() {
  return (
    <section className="relative py-24 bg-amber-50 dark:bg-stone-900 overflow-hidden">
      
      {/* Background Subtle Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-linear-to-r from-transparent via-amber-200 dark:via-stone-700 to-transparent opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 rounded-full bg-amber-100 dark:bg-stone-800 border border-amber-300/70 dark:border-orange-300/60 shadow-sm dark:shadow-md">
            <span className="text-xs font-bold text-amber-800 dark:text-orange-300 tracking-wide uppercase">
              Our Solutions
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-950 dark:text-orange-300 mb-6 tracking-tight">
            Printing Challenges, <span className="text-amber-600 dark:text-stone-200">Solved.</span>
          </h2>
          
          <p className="text-lg text-amber-800/80 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
            Every business deserves print solutions that are reliable, precise, and delivered on time. 
            Here's how JNE helps overcome the industry's most common challenges.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((item, index) => (
            <Link 
              to="/services"
              key={item.id}
              className="group relative cursor-pointer bg-white dark:bg-stone-900 border border-amber-300/70 dark:border-stone-700 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-300/50 dark:border-stone-600 dark:bg-stone-800 flex items-center justify-center text-amber-600 dark:text-orange-300 mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              {/* Problem Section */}
              <div className="mb-8 flex-1">
                <h3 className="text-xl font-bold text-amber-800 dark:text-stone-200 mb-3 group-hover:text-amber-600 dark:group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-amber-700 dark:text-stone-300/80 text-sm leading-relaxed">
                  <span className="font-bold text-amber-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-orange-300 transition-colors mr-1">Problem:</span> 
                  {item.problem}
                </p>
              </div>

              {/* Solution Section */}
              <div className="pt-6 border-t border-amber-200 dark:border-stone-700">
                <p className="text-xs font-bold text-amber-600 dark:text-orange-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-orange-300"></span>
                  Our Solution
                </p>
                <p className="text-amber-800 dark:text-stone-300 text-sm leading-relaxed font-medium">
                  {item.solution}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}