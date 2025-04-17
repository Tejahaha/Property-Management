import React from 'react';
import './Profile.css';

function Profile() {
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    role: 'Property Manager',
    joinDate: 'January 2024'
  };

  const managedProperties = [
    {
      id: 1,
      title: 'Luxury Apartment',
      status: 'Occupied',
      tenant: 'Alice Johnson',
      rentDue: '2024-02-01'
    },
    {
      id: 2,
      title: 'Modern Villa',
      status: 'Available',
      tenant: '-',
      rentDue: '-'
    }
  ];

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://placehold.co/100x100" alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{userProfile.name}</h1>
          <p className="role">{userProfile.role}</p>
          <div className="contact-info">
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Phone:</strong> {userProfile.phone}</p>
            <p><strong>Member since:</strong> {userProfile.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="managed-properties">
        <h2>Managed Properties</h2>
        <div className="properties-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Status</th>
                <th>Tenant</th>
                <th>Rent Due</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {managedProperties.map(property => (
                <tr key={property.id}>
                  <td>{property.title}</td>
                  <td>
                    <span className={`status ${property.status.toLowerCase()}`}>
                      {property.status}
                    </span>
                  </td>
                  <td>{property.tenant}</td>
                  <td>{property.rentDue}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;