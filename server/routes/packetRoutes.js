const express = require('express');
const router = express.Router();
const { getPackets, getPacketById, ingestPacket } = require('../controllers/packetController');
const { protect, authorize } = require('../middleware/auth');

router.route('/ingest').post(ingestPacket);
router.route('/').get(protect, authorize('Super Admin', 'SOC Analyst', 'Read-Only Analyst'), getPackets);
router.route('/:id').get(protect, authorize('Super Admin', 'SOC Analyst', 'Read-Only Analyst'), getPacketById);

module.exports = router;