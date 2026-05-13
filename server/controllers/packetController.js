const Packet = require('../models/Packet');
const { processPacket } = require('../services/packetProcessor');

const ingestPacket = async (req, res) => {
  const io = req.app.get('io');
  // Pass the raw packet vector directly to the processing pipeline
  // Processing happens asynchronously to free up the HTTP response
  processPacket(req.body, io);
  res.status(202).json({ success: true, message: 'Packet queued for ML inference' });
};

const getPackets = async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 50;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Packet.countDocuments();
  const packets = await Packet.find()
    .sort({ timestamp: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ packets, page, pages: Math.ceil(count / pageSize) });
};

const getPacketById = async (req, res) => {
  const packet = await Packet.findById(req.params.id);
  if (packet) {
    res.json(packet);
  } else {
    res.status(404);
    throw new Error('Packet not found');
  }
};

module.exports = { getPackets, getPacketById, ingestPacket };