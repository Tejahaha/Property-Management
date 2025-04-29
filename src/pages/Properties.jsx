import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PropertyForm from "./PropertyForm";

function Properties() {
  const [userId, setUserId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const BaseURL = "http://localhost:8080";

  useEffect(() => {
    const getUserIdFromToken = () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
          setError("You must be logged in to view properties");
          return null;
        }
        const decodedToken = jwtDecode(jwtToken);
        const id = decodedToken.id || decodedToken.userId || decodedToken.sub;
        return id;
      } catch (err) {
        console.error("Error decoding token:", err);
        setError("Authentication error. Please log in again.");
        return null;
      }
    };
    const id = getUserIdFromToken();
    setUserId(id);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchProperties = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`${BaseURL}/property/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      const processedProperties = data.map((property) => {
        let fullImagePath = property.imagePath;
        if (property.imagePath && !property.imagePath.startsWith("http")) {
          fullImagePath = `${BaseURL}${property.imagePath}`;
        }
        return { ...property, imagePath: fullImagePath };
      });

      setProperties(processedProperties);
    } catch (err) {
      setError(err.message || "Failed to fetch properties.");
    }
  };

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">My Properties</h2>
        <button
          onClick={handleToggleForm}
          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow"
        >
          {showForm ? "Cancel" : "Add Property"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showForm ? (
        <PropertyForm userId={userId} fetchProperties={fetchProperties} onCloseForm={handleToggleForm} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="p-4 bg-gray-100 rounded-md shadow">
                <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-700 mb-2">{property.description}</p>
                <p className="text-sm text-gray-600"><strong>Address:</strong> {property.address}</p>
                <p className="text-sm text-gray-600"><strong>Price:</strong> ${property.price}</p>
                {property.imagePath && (
                  <img
                    src={property.imagePath}
                    alt={property.title}
                    className="w-full h-40 object-cover rounded-md mt-2"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center p-6 bg-gray-50 rounded-md">
              You haven't added any properties yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Properties;
