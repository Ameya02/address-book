const express = require('express');
const { createAddress, getAddresses, getAddressID, updateAddress, deleteAddress } = require('../controllers/addressControllers');

const router = express.Router();

router.post("/create", createAddress);
router.get("/", getAddresses);
router.get("/:id", getAddressID);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;