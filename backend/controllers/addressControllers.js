const { callStoredProcedure } = require('../config/db');
const Address = require('../models/addressModels');


// Create async createAddress route
const createAddress = async (req, res) => {
  try {
    const { name, houseNo, buildingName, streetAddress, city, state, zipCode } = req.body;

    // Check if the input is not empty
    if (!name || !houseNo || !buildingName || !streetAddress || !city || !state || !zipCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

   
    const values = Object.values(req.body);
    await callStoredProcedure('add_address', values);
    return res.status(201).json({ message: 'Address created successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Create async updateAddress route
const updateAddress = async (req, res) => {
  try {
    const { name, houseNo, buildingName, streetAddress, city, state, zipCode } = req.body;

    // Check if the input is not empty
    if (!name || !houseNo || !buildingName || !streetAddress || !city || !state || !zipCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const values = Object.values(req.body);
    values.push(req.params.id);
    await callStoredProcedure('update_address', values);
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
    await callStoredProcedure('delete_address', req.params.id);

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

    const addresses = await callStoredProcedure('get_all_addresses');
    return res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}

const getAddressID = async (req, res) => {
  try {
    const address = await callStoredProcedure('get_address_by_id', req.params.id);
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



