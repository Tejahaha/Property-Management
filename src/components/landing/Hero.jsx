import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <h1>Find Your Perfect Property</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location, property type, or price range"
        />
        <button>Search</button>
      </div>
    </section>
  );
};

export default Hero;