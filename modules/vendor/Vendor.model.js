const mongoose = require('mongoose');

const vendorschema = new mongoose.Schema({
  VendorId: {
    type: String,
    required: true
  },
  VendorName: {
    type: String,
    required: true
  },
  ContactInfo: {
    type: String
  },
  Area: {
    type: String
  }
});

const Vendor = mongoose.model('Vendor', vendorschema);

module.exports = Vendor;