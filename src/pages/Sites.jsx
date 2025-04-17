import React, { useState } from 'react';
import './Sites.css';

function Sites() {
  const [filter, setFilter] = useState('all');
  
  const properties = [
    {
      id: 1,
      title: 'Luxury Apartment',
      type: 'apartment',
      address: '123 Main Street, City',
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      image: 'https://placehold.co/600x400'
    },
    {
      id: 2,
      title: 'Modern Villa',
      type: 'house',
      address: '456 Park Avenue, City',
      price: 3500,
      bedrooms: 4,
      bathrooms: 3,
      image: 'https://placehold.co/600x400'
    },
    {
      id: 3,
      title: 'Cozy Studio',
      type: 'studio',
      address: '789 Oak Road, City',
      price: 1500,
      bedrooms: 1,
      bathrooms: 1,
      image: 'https://placehold.co/600x400'
    }
  ];

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(prop => prop.type === filter);

  return (
    <div className="sites">
      <div className="sites-header">
        <h1>Available Properties</h1>
        <div className="filter-options">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'apartment' ? 'active' : ''}
            onClick={() => setFilter('apartment')}
          >
            Apartments
          </button>
          <button 
            className={filter === 'house' ? 'active' : ''}
            onClick={() => setFilter('house')}
          >
            Houses
          </button>
          <button 
            className={filter === 'studio' ? 'active' : ''}
            onClick={() => setFilter('studio')}
          >
            Studios
          </button>
        </div>
      </div>

      <div className="properties-grid">
        {filteredProperties.map(property => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.title} />
            <div className="property-details">
              <h3>{property.title}</h3>
              <p className="address">{property.address}</p>
              <div className="features">
                <span>{property.bedrooms} Beds</span>
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="card-footer">
                <span className="price">${property.price}/month</span>
                <button className="contact-btn">Contact</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sites;