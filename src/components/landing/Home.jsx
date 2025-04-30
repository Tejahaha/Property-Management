import React from 'react';
import './Home.css';
import FadeContent from '../../blocks/Animations/FadeContent/FadeContent.jsx'
import SplitText from '../../blocks/TextAnimations/SplitText/SplitText.jsx';
import CircularGallery from '../../blocks/Components/CircularGallery/CircularGallery.jsx'
// import Waves from '../../blocks/Backgrounds/Waves/Waves.jsx';
import Orb from '../../blocks/Backgrounds/Orb/Orb.jsx';
function Home() {
  const featuredProperties = [
    {
      id: 1,
      title: 'Luxury Apartment',
      address: '123 Main Street, City',
      price: 2500,
      image: 'https://placehold.co/600x400'
    },
    {
      id: 2,
      title: 'Modern Villa',
      address: '456 Park Avenue, City',
      price: 3500,
      image: 'https://placehold.co/600x400'
    },
    {
      id: 3,
      title: 'Cozy Studio',
      address: '789 Oak Road, City',
      price: 1500,
      image: 'https://placehold.co/600x400'
    }
  ];

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Orb 
          hoverIntensity={0.5} 
          rotateOnHover={true} 
          hue={0} 
          forceHoverState={false} 
        />
      </div>
      <FadeContent blur={true} duration={1000} easing="ease-in-out" initialOpacity={0}>
        <div className="home" style={{position: 'relative', zIndex: 1}}>
        <section className="hero">
        <h1>
            <SplitText
              text="Find Your Perfect Property!"
              className="text-4xl font-bold mb-8"
              delay={150}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
      </h1>
          <div className="search-bar">
          <input type="text" placeholder="Search by location, property type, or price range" />
          <button>Search</button>
        </div>
      </section>

      <section className="featured">
          <h2>Featured Properties</h2>
          <div className="property-grid">
            {featuredProperties.map(property => (
            <div key={property.id} className="property-card">
              <img src={property.image} alt={property.title} />
              <div className="property-info">
                <h3>{property.title}</h3>
                <p>{property.address}</p>
                <div className="property-footer">
                  <span className="price">${property.price}/month</span>
                  <button className="view-details">View Details</button>
                </div>
              </div>
            </div>
          ))}
          </div>
      </section>
      <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} />
      </div>
      </div>
    </FadeContent>
    </>
  );
}

export default Home;