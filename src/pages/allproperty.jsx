import React, { useEffect, useState } from "react";

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/property/all");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return (
    <div className="container mx-auto pt-20 px-4">
      <div className="text-center p-8 text-lg text-gray-600">
        <div className="animate-pulse">Loading properties...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto pt-20 px-4">
      <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!properties.length) return (
    <div className="container mx-auto pt-20 px-4">
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-lg text-gray-600">No properties found.</p>
      </div>
    </div>
  );

  // Modal for displaying property details
  const PropertyDetailsModal = () => {
    if (!selectedProperty) return null;
    
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedProperty.title || 'Property Details'}
            </h3>
            <button 
              onClick={() => setShowModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6">
            {/* Property Image */}
            {selectedProperty.imagePath && (
              <div className="mb-6">
                <img 
                  src={selectedProperty.imagePath} 
                  alt={`Property ${selectedProperty.title || ''}`} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            {/* Property Information */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(selectedProperty).map(([key, value]) => {
                    // Skip complex objects, null values, and images (handled separately)
                    if (typeof value === "object" || value === null || key === "imagePath") return null;
                    
                    return (
                      <div key={key} className="flex justify-between text-gray-700 border-b border-gray-100 pb-1">
                        <span className="font-medium capitalize">{key}:</span> 
                        <span className="text-gray-600">{String(value)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Nested Objects */}
              {Object.entries(selectedProperty).map(([key, value]) => {
                if (typeof value !== "object" || value === null) return null;
                
                return (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 capitalize">{key} Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey} className="flex justify-between text-gray-700 border-b border-gray-100 pb-1">
                          <span className="font-medium capitalize">{subKey}:</span> 
                          <span className="text-gray-600">{String(subValue)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex space-x-3 justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto pt-20 px-4 pb-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, idx) => (
          <div 
            key={property.id || idx} 
            className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
          >
            {/* Property Image */}
            {property.imagePath ? (
              <div className="h-48 overflow-hidden">
                <img 
                  src={property.imagePath} 
                  alt={`Property ${property.title || idx + 1}`} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            ) : (
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            
            {/* Property Details */}
            <div className="p-6 flex-grow">
              {property.title && (
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{property.title}</h3>
              )}
              
              {property.price && (
                <div className="text-lg font-bold text-blue-600 mb-3">
                  ${typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
                </div>
              )}
              
              <div className="space-y-2">
                {Object.entries(property).map(([key, value]) => {
                  // Skip these fields as they're handled separately or should be hidden
                  if (["id", "imagePath", "title", "price", "description", "user", "owner", "userData", "userInfo"].includes(key)) return null;
                  
                  if (typeof value === "object" && value !== null) {
                    // Hide user/owner/userData/userInfo objects from card view
                    if (["user", "owner", "userData", "userInfo"].includes(key)) return null;
                    return (
                      <div key={key} className="mt-3">
                        <span className="font-semibold capitalize text-gray-700">{key}:</span>
                        <div className="ml-4 text-gray-600 text-sm">
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <div key={subKey} className="flex justify-between border-b border-gray-100 py-1">
                              <span className="capitalize">{subKey}:</span> 
                              <span>{String(subValue)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } 
                  
                  // Skip null or undefined values
                  if (value === null || value === undefined) return null;
                  
                  return (
                    <div key={key} className="flex justify-between text-gray-700">
                      <span className="font-medium capitalize">{key}:</span> 
                      <span className="text-gray-600">{String(value)}</span>
                    </div>
                  );
                })}
              </div>
              
              {property.description && (
                <p className="mt-4 text-gray-600 line-clamp-2">{property.description}</p>
              )}
            </div>
            
            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => {
                  setSelectedProperty(property);
                  setShowModal(true);
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Render the modal */}
      {showModal && <PropertyDetailsModal />}
    </div>
  );
};

export default AllProperty;