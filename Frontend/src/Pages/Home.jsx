import React from 'react';
import Hero from '../Components/Hero.jsx';
import Solutions from '../Components/Solutions.jsx';

// You can import other components here as you build them
// import Services from '../Components/Services';
// import Products from '../Components/Products';

export default function Home() {
    return (
        <>
            <Hero />
            <Solutions />

            {/* 
        Add your other components here just like your old project:
        <Services />
        <Products />
      */}
        </>
    );
}