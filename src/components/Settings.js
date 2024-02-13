// src/components/Settings.js
import React, { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    fontSize: 'medium', // Default font size
    currency: 'USD' // Default currency
  });

  // Load settings from local storage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to local storage on change
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
    if (name === 'fontSize') {
      document.documentElement.style.setProperty('--font-size', value);
    }
  };

  const handleFontSizeChange = (fontSize) => {
    // Convert font size name to actual size
    const sizeMap = {
      small: '12px',
      medium: '16px',
      large: '20px',
    };
    
    const newSize = sizeMap[fontSize];
    document.documentElement.style.setProperty('--font-size', newSize);
    // Also update the state and local storage as before
  };

  return (
    <div>
      <h2>Settings</h2>
      <form>
        <label>
          Font Size:
          <select name="fontSize" value={settings.fontSize} onChange={handleChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label>
          Currency:
          <select name="currency" value={settings.currency} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* Additional currencies as needed */}
          </select>
        </label>
      </form>
    </div>
  );
}

export default Settings;
