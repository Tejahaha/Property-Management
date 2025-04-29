import React, { useState, useRef } from "react";

function PropertyForm({ userId, fetchProperties, onCloseForm }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BaseURL = "http://localhost:8080";
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      let imagePath = "";

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const imageResponse = await fetch(`${BaseURL}/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${jwtToken}` },
          body: formData
        });

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image.");
        }

        imagePath = await imageResponse.text();
        if (!imagePath.startsWith('http') && !imagePath.startsWith(BaseURL)) {
          imagePath = `${BaseURL}${imagePath}`;
        }
      }

      const requestBody = {
        ...form,
        price: parseInt(form.price, 10),
        imagePath,
        user: { id: parseInt(userId, 10) }
      };

      const response = await fetch(`${BaseURL}/property/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error("Failed to save property.");
      }

      fetchProperties();
      onCloseForm();
    } catch (err) {
      setError(err.message || "Failed to save property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          min="0"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {imagePreview && (
        <div className="mt-4 relative">
          <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
          <button
            type="button"
            onClick={resetImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow"
      >
        {loading ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
}

export default PropertyForm;
