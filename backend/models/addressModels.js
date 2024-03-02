const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: {
        type: String,
        required: true,
        unique: true
    },
  houseNo: {
    type: String,
    required: true
  },

  buildingName: {
    type: String,
    required: true
  },
  
streetAddress: {
    type: String,
    required: true
},

city: {
    type: String,
    required: true
},
state: {
    type: String,
    required: true
},
zipCode: {
    type: String,
    required: true
},
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
