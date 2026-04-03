const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: String,
  severity: String,
  repair_priority: String,
  latitude: Number,
  longitude: Number,
  imagePath: String,
  reportedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
