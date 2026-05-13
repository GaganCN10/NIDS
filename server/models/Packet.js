const mongoose = require('mongoose');

const packetSchema = new mongoose.Schema({
  sourceIp: { type: String, required: true },
  destIp: { type: String, required: true },
  sourcePort: { type: Number, required: true },
  destPort: { type: Number, required: true },
  protocol: { type: String, required: true },
  size: { type: Number, required: true },
  flags: { type: String },
  ttl: { type: Number },
  adversityScore: { type: Number, required: true, default: 0 },
  classification: { type: String, default: 'Normal' },
  confidence: { type: Number, default: 0 },
  shapValues: { type: mongoose.Schema.Types.Mixed }, // Dynamic keys for feature importance
  timestamp: { type: Date, default: Date.now }
}, { 
  timeseries: {
    timeField: 'timestamp',
    metaField: 'classification',
    granularity: 'seconds'
  }
});

const Packet = mongoose.model('Packet', packetSchema);
module.exports = Packet;