const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  packetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Packet',
    required: true
  },
  severity: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    required: true
  },
  status: {
    type: String,
    enum: ['NEW', 'ACKNOWLEDGED', 'RESOLVED', 'ESCALATED'],
    default: 'NEW'
  },
  classification: {
    type: String,
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  remediationPlaybook: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;