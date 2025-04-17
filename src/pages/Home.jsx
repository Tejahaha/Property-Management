import React from 'react';
import './Home.css';

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
    <div className="home">
      <section className="hero">
        <h1 style={{
          fontSize: '4.5rem',
          color: '#000000',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          animation: 'fadeInDown 1s ease-out',
          fontWeight: '800',
          letterSpacing: '-0.5px'
        }}>Find Your Perfect Property</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search by location..." />
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
    </div>
  );
}

export default Home;