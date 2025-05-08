"use client"

import { useEffect, useState } from "react"

const AllProperty = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("http://localhost:8080/property/all")
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }
        const data = await response.json()
        setProperties(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  if (loading)
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
            <p className="mt-4 text-lg font-medium text-white">Loading properties...</p>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-xl bg-red-900/20 p-8 text-center shadow-md">
          <svg className="mx-auto mb-4 h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mb-2 text-xl font-medium text-red-300">{error}</h3>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-800/30 px-5 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-800/50"
          >
            Try Again
          </button>
        </div>
      </div>
    )

  if (!properties.length)
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-xl bg-black p-8 text-center shadow-md border border-white/10">
          <svg className="mx-auto mb-4 h-16 w-16 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <h3 className="text-xl font-medium text-white">No properties found</h3>
        </div>
      </div>
    )

  // Modal for displaying property details
  const PropertyDetailsModal = () => {
    if (!selectedProperty) return null

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-black shadow-2xl border border-white/10">
          {/* Modal Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black p-5">
            <h3 className="text-2xl font-bold text-white">{selectedProperty.title || "Property Details"}</h3>
            <button
              onClick={() => { setShowModal(false); setShowContact(false); }}
              className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Property Image */}
            {selectedProperty.imagePath && (
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src={selectedProperty.imagePath || "/placeholder.svg"}
                  alt={`Property ${selectedProperty.title || ""}`}
                  className="h-72 w-full object-contain bg-black"
                  />
              </div>
            )}

            {/* Property Information */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="rounded-xl bg-black p-5 border border-white/10">
                <h4 className="mb-4 text-lg font-semibold text-white">Basic Information</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Object.entries(selectedProperty).map(([key, value]) => {
                    if (typeof value === "object" || value === null || key === "imagePath" || key === "role" || key === "password" || key === "id") return null
                    return (
                      <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                        <span className="font-medium capitalize text-white">{key}:</span>
                        <span className="text-white/70">{String(value)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Nested Objects */}
              {Object.entries(selectedProperty).map(([key, value]) => {
                if (typeof value !== "object" || value === null) return null
                return (
                  <div key={key} className="rounded-xl bg-black p-5 border border-white/10">
                    <h4 className="mb-4 text-lg font-semibold capitalize text-white">{key} Details</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {Object.entries(value).map(([subKey, subValue]) => {
                        if (subKey === "role" || subKey === "password" || subKey === "id") return null
                        return (
                          <div key={subKey} className="flex justify-between border-b border-white/10 pb-2">
                            <span className="font-medium capitalize text-white">{subKey}:</span>
                            <span className="text-white/70">{String(subValue)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {/* Contact/User Details Section */}
              {showContact && selectedProperty.user && (
                <div className="rounded-xl bg-black p-5 border border-emerald-600/30">
                  <h4 className="mb-4 text-lg font-semibold text-emerald-400">Contact Details</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {Object.entries(selectedProperty.user).map(([key, value]) => {
                      if (key === "role" || key === "password" || key === "id") return null
                      return (
                        <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                          <span className="font-medium capitalize text-white">{key}:</span>
                          <span className="text-white/70">{String(value)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-white/10 bg-black p-5">
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => { setShowModal(false); setShowContact(false); }}
                className="rounded-lg bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                Close
              </button>
              <button
                className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                onClick={() => setShowContact((prev) => !prev)}
              >
                {showContact ? "Hide Contact" : "Contact"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="mb-10 text-center text-3xl font-bold text-white">Featured Properties</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, idx) => (
          <div
            key={property.id || idx}
            className="group overflow-hidden rounded-xl bg-black shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl border border-white/10"
          >
            {/* Property Image */}
            {property.imagePath ? (
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.imagePath || "/placeholder.svg"}
                  alt={`Property ${property.title || idx + 1}`}
                  className="h-full w-full object-contain transition-transform duration-500 bg-black"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>
            ) : (
              <div className="flex h-56 items-center justify-center bg-black">
                <svg className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            )}

            {/* Property Details */}
            <div className="flex h-64 flex-col p-5">
              {property.title && <h3 className="mb-2 text-xl font-bold text-white">{property.title}</h3>}

              {property.price && (
                <div className="mb-3 text-lg font-bold text-emerald-400">
                  ${typeof property.price === "number" ? property.price.toLocaleString() : property.price}
                </div>
              )}

              {property.description && (
                <p className="mb-4 line-clamp-3 flex-grow text-white/70">{property.description}</p>
              )}

              <div className="mt-auto flex flex-wrap gap-2">
                {property.address && (
                  <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white border border-white/20">
                    <svg className="mr-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {property.address}
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedProperty(property)
                  setShowModal(true)
                }}
                className="mt-4 w-full rounded-lg bg-emerald-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
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
  )
}

export default AllProperty
