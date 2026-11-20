import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="w-full h-[360px] sm:h-[480px] md:h-[540px] lg:h-[620px] bg-stone-100 dark:bg-stone-900">
        <img
          src="/images/Machines/lithrone_4_color.jpg"
          alt="Komori Lithrone 4-Colour Offset Machine"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            if (!e.currentTarget.src.includes('/machines/')) {
              e.currentTarget.src = '/machines/lithrone_4_color.jpg';
            }
          }}
        />
      </div>
    </section>
  );
}
