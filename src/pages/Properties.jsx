"use client"

import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import PropertyForm from "./PropertyForm"

function Properties() {
  const [userId, setUserId] = useState(null)
  const [properties, setProperties] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState("")
  const BaseURL = "http://localhost:8080"

  useEffect(() => {
    const getUserIdFromToken = () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken")
        if (!jwtToken) {
          setError("You must be logged in to view properties")
          return null
        }
        const decodedToken = jwtDecode(jwtToken)
        const id = decodedToken.id || decodedToken.userId || decodedToken.sub
        return id
      } catch (err) {
        console.error("Error decoding token:", err)
        setError("Authentication error. Please log in again.")
        return null
      }
    }
    const id = getUserIdFromToken()
    setUserId(id)
  }, [])

  useEffect(() => {
    if (userId) {
      fetchProperties()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const fetchProperties = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken")
      const response = await fetch(`${BaseURL}/property/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      const data = await response.json()
      const processedProperties = data.map((property) => {
        let fullImagePath = property.imagePath
        if (property.imagePath && !property.imagePath.startsWith("http")) {
          fullImagePath = `${BaseURL}${property.imagePath}`
        }
        return { ...property, imagePath: fullImagePath }
      })

      setProperties(processedProperties)
    } catch (err) {
      setError(err.message || "Failed to fetch properties.")
    }
  }

  const [editingProperty, setEditingProperty] = useState(null)
  const handleToggleForm = () => {
    setShowForm((prev) => !prev)
    if (showForm) setEditingProperty(null)
  }

  const handleEdit = (property) => {
    setShowForm(true)
    setEditingProperty(property)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return
    try {
      const jwtToken = localStorage.getItem("jwtToken")
      const response = await fetch(`${BaseURL}/property/delete/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }
      fetchProperties()
    } catch (err) {
      setError(err.message || "Failed to delete property.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">My Properties</h2>
        <button
          onClick={handleToggleForm}
          className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {showForm ? (
            <span className="flex items-center">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Property
            </span>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-900/30 p-4 text-red-200 shadow">
          <div className="flex">
            <svg
              className="mr-3 h-6 w-6 flex-shrink-0 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {showForm ? (
        <div className="mb-8 rounded-xl bg-black p-6 shadow-lg border border-white/10">
          <PropertyForm userId={userId} fetchProperties={fetchProperties} onCloseForm={handleToggleForm} editingProperty={editingProperty} setEditingProperty={setEditingProperty} />
        </div>
      ) : (
        <>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="group overflow-hidden rounded-xl bg-black shadow-md transition-all hover:shadow-xl border border-white/10"
                >
                  {property.imagePath && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={property.imagePath || "/placeholder.svg"}
                        alt={property.title}
                        className="h-full w-full object-contain transition-transform duration-500 bg-black"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="mb-2 text-xl font-bold text-white">{property.title}</h3>
                    <p className="mb-4 text-white/70">{property.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-300">
                        <svg className="mr-1.5 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {property.address}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-amber-900/30 px-3 py-1 text-xs font-medium text-amber-300">
                        <svg className="mr-1.5 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ${property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="rounded bg-emerald-600 px-4 py-1 text-xl text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="rounded bg-emerald-800 px-4 py-1 text-xl text-white hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-black p-8 text-center shadow-md border border-white/10">
              <svg className="mb-4 h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <h3 className="mb-2 text-xl font-medium text-white">No properties yet</h3>
              <p className="text-white/50">Click the "Add Property" button to get started.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Properties
