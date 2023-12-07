import React, { useState } from 'react';
import axios from 'axios';

const Tailor = () => {
  const [tailorData, setTailorData] = useState({
    name: '',
    email: '',
    location: { // Initialize with the first option's latitude and longitude
      latitude: 0,
      longitude: 0
    }
    // Other fields as needed for registration
  });

  const locations={
    option1:{   
        latitude: 17.5393,
        longitude: 78.4834
        },  
    option2:{
        latitude: 17.5378,
        longitude: 78.4846
        },
      option3:{
        latitude: 18.0072,
        longitude: 79.5584
        },
      option4:{
        latitude:17.600308,
        longitude:78.4839631
        },
    }
  

  const handleLocationChange = (event) => {
    // Update latitude and longitude based on the selected location
    const selectedLocation = event.target.value;
    // Retrieve latitude and longitude for the selected location from your predefined options

    // Update the tailorData state with the selected location's latitude and longitude
    setTailorData({
      ...tailorData,
      selectedLocation,
      location: {
        latitude: locations[selectedLocation].latitude,
        longitude: locations[selectedLocation].longitude
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send tailor registration data to the backend API
      await axios.post('http://localhost:5000/api/tailorRegistration', tailorData);
      // Handle success or redirect to another page
    } catch (error) {
      console.error('Error registering tailor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={tailorData.name}
          onChange={(event) => setTailorData({ ...tailorData, name: event.target.value })}
        />
      </label>
      {/* Other fields for registration */}
      <label>
        Email:
        <input
          type="text"
          value={tailorData.email}
          onChange={(event) => setTailorData({ ...tailorData, email: event.target.value })}
        />
      </label>
      <label>
        Location:
        <select value={tailorData.location} onChange={handleLocationChange}>
          {/* Options for predefined locations */}
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
          {/* Add other predefined options */}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Tailor;
