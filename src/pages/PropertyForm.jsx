import React, { useState, useRef } from "react";
import Stepper, { Step } from "../blocks/Components/Stepper/Stepper"; // assuming relative path

function PropertyForm({ userId, fetchProperties, onCloseForm }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
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

  const handleSubmit = async () => {
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
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
    <div className="max-w-xl mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <Stepper
        initialStep={1}
        backButtonText="Previous"
        nextButtonText="Next"
        onFinalStepCompleted={handleSubmit}
      >
        <Step>
          <h2 className="text-xl font-bold mb-2">Basic Info</h2>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <label className="block mt-4 mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            required
            className="w-full p-2 border rounded"
          />
        </Step>

        <Step>
          <h2 className="text-xl font-bold mb-2">Location</h2>
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </Step>

        <Step>
          <h2 className="text-xl font-bold mb-2">Price & Image</h2>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="w-full p-2 border rounded"
          />

          {imagePreview && (
            <div className="mt-4 relative">
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded" />
              <button
                type="button"
                onClick={resetImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              >
                ×
              </button>
            </div>
          )}
        </Step>

        <Step>
          <h2 className="text-xl font-bold mb-2">Review & Submit</h2>
          <p><strong>Title:</strong> {form.title}</p>
          <p><strong>Description:</strong> {form.description}</p>
          <p><strong>Address:</strong> {form.address}</p>
          <p><strong>Price:</strong> ${form.price}</p>
          {imagePreview && <img src={imagePreview} className="mt-4 h-40 w-full object-cover rounded" />}
          <p className="mt-4">Click "Next" to submit your property.</p>
        </Step>
      </Stepper>
    </div>
  </div>
  );
}

export default PropertyForm;
