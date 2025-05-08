"use client"

import { useState, useEffect } from "react"

const PropertyForm = ({ userId, fetchProperties, onCloseForm, editingProperty, setEditingProperty }) => {
  const [formData, setFormData] = useState({
    userId: userId,
    title: "",
    description: "",
    address: "",
    price: "",
    imagePath: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const BaseURL = "http://localhost:8080"

  // If editing, populate form with property data
  useEffect(() => {
    if (editingProperty) {
      setFormData({
        userId: editingProperty.userId,
        title: editingProperty.title || "",
        description: editingProperty.description || "",
        address: editingProperty.address || "",
        price: editingProperty.price || "",
        imagePath: editingProperty.imagePath || "",
      })
      setImagePreview(editingProperty.imagePath || "")
    }
  }, [editingProperty])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    })
  }

  // eslint-disable-next-line no-unused-vars
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const jwtToken = localStorage.getItem("jwtToken")
      
      // Prepare the endpoint and method based on whether we're editing or creating
      const endpoint = editingProperty 
        ? `${BaseURL}/property/update/${editingProperty.id}`
        : `${BaseURL}/property/post`
      
      console.log("Submitting to endpoint:", endpoint)
      console.log("With data:", formData)
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        throw new Error(errorText || "Failed to save property")
      }

      const data = await response.json()
      console.log("Success response:", data)
      
      // Refresh property list
      fetchProperties()
      
      // Reset form if not editing
      if (!editingProperty) {
        setFormData({
          userId: userId,
          title: "",
          description: "",
          address: "",
          price: "",
          imagePath: "",
        })
        setImagePreview("")
      } else {
        // Reset editing state
        setEditingProperty(null)
      }
      
      // Close form
      onCloseForm()
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err.message || "There was an error saving your property")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold text-white">
        {editingProperty ? "Edit Property" : "Add New Property"}
      </h3>
      
      {error && (
        <div className="mb-4 rounded-lg bg-red-900/30 p-3 text-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-2 mb-4">
            <label className="mb-2 block text-sm font-medium text-white">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter property title"
              required
            />
          </div>

          <div className="col-span-2 mb-4">
            <label className="mb-2 block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your property"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-white">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Property address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-white">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Property price"
              required
            />
          </div>

          <div className="col-span-2 mb-4">
            <label className="mb-2 block text-sm font-medium text-white">
              Image URL
            </label>
            <input
              type="text"
              name="imagePath"
              value={formData.imagePath}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Image URL (optional)"
            />
          </div>

          {imagePreview && (
            <div className="col-span-2 mb-4">
              <label className="mb-2 block text-sm font-medium text-white">
                Image Preview
              </label>
              <div className="h-48 w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
                <img
                  src={imagePreview}
                  alt="Property preview"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCloseForm}
            className="rounded-lg border border-gray-600 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full rounded-lg bg-emerald-600 px-5 py-2.5 text-center font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {submitting ? (editingProperty ? "Saving..." : "Adding...") : (editingProperty ? "Save Changes" : "Add Property")}
          </button>

        </div>
      </form>
    </div>
  )
}

export default PropertyForm