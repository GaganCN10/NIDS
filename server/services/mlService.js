const axios = require('axios');
const logger = require('../config/logger');

const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://localhost:8000/api/v1/predict';

/**
 * Sends packet features to the Python FastAPI ML Engine for inference.
 * @param {Object} packetFeatures - The extracted features of the network packet.
 * @returns {Object} - The prediction response containing adversityScore, classification, etc.
 */
const getPacketPrediction = async (packetFeatures) => {
  try {
    const response = await axios.post(ML_ENGINE_URL, packetFeatures);
    return response.data;
  } catch (error) {
    logger.error(`Error communicating with ML Engine: ${error.message}`);
    // Fallback response if ML engine is unreachable
    return {
      adversityScore: 0,
      classification: 'Unknown (ML Offline)',
      confidence: 0,
      shapValues: {}
    };
  }
};

module.exports = { getPacketPrediction };