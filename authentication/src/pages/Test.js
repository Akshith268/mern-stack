import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import "./Test.css";
import { Icon } from "leaflet";
const UserPage = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [nearbyTailors, setNearbyTailors] = useState([]);

  useEffect(() => {
    // Function to get user's geolocation
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchdetails = async () => {
      try{
        const response=await axios.get('http://localhost:5000/api/nearbytailors', {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          }
        });
        console.log(response.data.data);
        setNearbyTailors(response.data.data);
      }
      catch(err){
        console.log(err);
      }
  }
  fetchdetails();
  }, [userLocation]);


    const customMarker = new Icon({
        iconUrl: "data:image/jpeg;base64,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",
        iconSize: [25, 25],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    })
  

  return (
    <div className="map-container">
      <MapContainer center={[userLocation.latitude || 0, userLocation.longitude || 0]} zoom={13} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Add marker for user's location */}
        <Marker position={[userLocation.latitude || 0, userLocation.longitude || 0]} icon={customMarker} >
          <Popup>Your current location</Popup>
        </Marker>
         
        {Array.isArray(nearbyTailors) && nearbyTailors.length > 0 && nearbyTailors.map((tailor) => (
        <Marker key={tailor._id} position={[tailor.location.latitude, tailor.location.longitude]} icon={customMarker}>
          <Popup>{tailor.name}  <br/> <a href='http://localhost:3000/test'>Give ratings</a> </Popup>
          
          {/* address phone instagram link ratings */}
        </Marker>
      ))}
        
      </MapContainer>
    </div>
  );
};

export default UserPage;
