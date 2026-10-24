import React from 'react';
import HeroCarousel from '../Components/HeroCarousel.jsx';
import Solutions from '../Components/Solutions.jsx';

export default function Home({ setSelectedProduct }) {
    return (
        <div className="bg-stone-50 dark:bg-stone-950 transition-colors">
            {/* Dynamic Public Hero Section with Image Carousel */}
            <HeroCarousel />

            {/* Value Propositions & Solutions */}
            <Solutions setSelectedProduct={setSelectedProduct} />
        </div>
    );
}
