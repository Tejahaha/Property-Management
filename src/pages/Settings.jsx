import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    language: 'english'
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      
      <div className="settings-section">
        <h2>Preferences</h2>
        <div className="setting-item">
          <div className="setting-info">
            <h3>Notifications</h3>
            <p>Receive push notifications for updates</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>Email Updates</h3>
            <p>Receive email notifications</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={() => handleToggle('emailUpdates')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>Dark Mode</h3>
            <p>Switch to dark theme</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>Language</h3>
            <p>Choose your preferred language</p>
          </div>
          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className="language-select"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account</h2>
        <div className="setting-item">
          <button className="change-password-btn">
            Change Password
          </button>
        </div>
        <div className="setting-item">
          <button className="delete-account-btn">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;