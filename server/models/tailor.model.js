
// Tailor model definition using Mongoose
const mongoose = require('mongoose');

const tailorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  // Other fields for tailor information
});

const tailorData = mongoose.model('tailorData', tailorSchema);

module.exports = tailorData;

