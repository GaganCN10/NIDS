const { getPacketPrediction } = require('./mlService');
const Packet = require('../models/Packet');
const Alert = require('../models/Alert');
const logger = require('../config/logger');

/**
 * Processes a raw packet vector, gets ML inference, saves to DB, and handles alerts/sockets.
 */
const processPacket = async (rawPacket, io) => {
  // 1. Get ML Prediction
  const prediction = await getPacketPrediction(rawPacket);

  // 2. Combine raw packet with prediction
  const completePacket = {
    ...rawPacket,
    adversityScore: prediction.adversityScore,
    classification: prediction.classification,
    confidence: prediction.confidence,
    shapValues: prediction.shapValues,
    timestamp: new Date()
  };

  try {
    // 3. Save to MongoDB
    // NOTE: In production under heavy load, we'd batch insert these. 
    const savedPacket = await Packet.create(completePacket);

    // 4. Emit to connected dashboards via WebSocket
    if (io) {
      io.emit('packet:new', savedPacket);
    }

    // 5. Alert Trigger Engine (Threshold >= 46 based on PRD)
    if (savedPacket.adversityScore >= 46) {
      let severity = 'MEDIUM';
      if (savedPacket.adversityScore >= 90) severity = 'CRITICAL';
      else if (savedPacket.adversityScore >= 71) severity = 'HIGH';

      const alert = await Alert.create({
        packetId: savedPacket._id,
        severity,
        classification: savedPacket.classification,
        remediationPlaybook: ['Follow standard incident response', 'Investigate source IP'] // Dynamic in future
      });

      if (io) {
        io.emit('alert:created', alert);
      }
      logger.info(`🚨 Alert Triggered: ${severity} threat from ${savedPacket.sourceIp}`);
    }

  } catch (error) {
    logger.error(`Error saving packet: ${error.message}`);
  }
};

module.exports = { processPacket };