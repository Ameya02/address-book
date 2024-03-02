const Address = require('../models/addressModels');


// Create async createAddress route
const createAddress = async (req, res) => {
  try {
    // Get the necessary input from the request body
    const { name, houseNo, buildingName, streetAddress, city, state, zipCode } = req.body;

    // Check if the input is not empty
    if (!name || !houseNo || !buildingName || !streetAddress || !city || !state || !zipCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new address object
    const newAddress = await Address.create({
      name, houseNo, buildingName, streetAddress, city, state, zipCode
    });

  

    // Return a success response
    return res.status(201).json({ message: 'Address created successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Create async updateAddress route
const updateAddress = async (req, res) => {
  try {
    // Get the necessary input from the request body
    const { name, houseNo, buildingName, streetAddress, city, state, zipCode } = req.body;

    // Check if the input is not empty
    if (!name || !houseNo || !buildingName || !streetAddress || !city || !state || !zipCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update the address in the database
    await Address.updateOne({ _id: req.params.id }, { $set: { name, houseNo, buildingName, streetAddress, city, state, zipCode} });

    // Return a success response
    return res.status(200).json({ message: 'Address updated successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Create async deleteAddress route
const deleteAddress = async (req, res) => {
  try {
    // Delete the address from the database
    await Address.deleteOne({ _id: req.params.id });

    // Return a success response
    return res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    return res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}

const getAddressID = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    return res.status(200).json(address);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}
module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getAddressID,
};



