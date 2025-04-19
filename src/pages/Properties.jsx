import React, { useState, useEffect } from "react";
import  {jwtDecode}  from "jwt-decode";

function Properties() {
  // State variables
  const [userId, setUserId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    imagePath: ""
  });

  const BaseURL = "http://localhost:8080";

  // Get user ID from JWT token on component mount
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
        
        if (!id) {
          setError("Invalid user credentials");
          return null;
        }
        
        return id;
      } catch (err) {
        console.error("Error decoding JWT token:", err);
        setError("Authentication error. Please log in again.");
        return null;
      }
    };

    const id = getUserIdFromToken();
    setUserId(id);
  }, []);

  // Fetch properties when userId is available
  useEffect(() => {
    if (userId) {
      fetchProperties();
    }
  }, [userId]);

  // Function to fetch properties for the current user
  const fetchProperties = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      
      const response = await fetch(`${BaseURL}/property/user/ ${userId}`, {
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError(err.message || "Failed to fetch properties. Please try again.");
    }
  };

  // Form input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
  
    try {
      const jwtToken = localStorage.getItem("jwtToken");
  
      const requestBody = {
        ...form,
        price: parseInt(form.price, 10),
        user: {
          id: parseInt(userId, 10)
        }
      };
  
      const response = await fetch(`${BaseURL}/property/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Request failed");
      }
  
      setSuccess("Property saved successfully!");
      setForm({
        title: "",
        description: "",
        address: "",
        price: "",
        imagePath: ""
      });
      
      // Refresh the properties list after adding a new one
      fetchProperties();
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Failed to save property. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">My Properties</h2>
      
      {/* Display error message if any */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {/* Display success message if any */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      {/* Display properties list */}
      {properties.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Your Properties</h3>
          {properties.map((property) => (
            <div key={property.id} className="p-4 mb-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-700 my-2">{property.description}</p>
              <p><strong>Address:</strong> {property.address}</p>
              <p><strong>Price:</strong> ${property.price}</p>
              {property.imagePath && (
                <p><strong>Image:</strong> {property.imagePath}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 mb-6 bg-gray-50 rounded-md">
          <p>You haven't added any properties yet.</p>
        </div>
      )}
      
      {/* Toggle form button */}
      <button 
        onClick={toggleForm} 
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow transition duration-200 ease-in-out"
      >
        {showForm ? "Cancel" : "Add New Property"}
      </button>
      
      {/* Property form */}
      {showForm && (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Title:
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          </div>
          
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Description:
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          </div>
          
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Address:
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          </div>
          
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          </div>
          
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Image Path:
              <input
                type="text"
                name="imagePath"
                value={form.imagePath}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow transition duration-200 ease-in-out disabled:opacity-70"
          >
            {loading ? "Saving..." : "Save Property"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Properties;