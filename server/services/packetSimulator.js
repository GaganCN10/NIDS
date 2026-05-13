const { processPacket } = require('./packetProcessor');

let simulationInterval;

const startSimulation = (io) => {
  if (simulationInterval) return;
  
  console.log('Starting Network Traffic Simulation...');
  
  simulationInterval = setInterval(() => {
    // Generate a mock feature vector resembling the output of the Python scapy/pyshark extractor
    const isAttackCandidate = Math.random() > 0.8; // 20% chance of generating a suspicious packet vector
    
    const mockFeatureVector = {
      sourceIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
      destIp: `10.0.0.${Math.floor(Math.random() * 50)}`,
      sourcePort: Math.floor(Math.random() * 60000) + 1024,
      destPort: [80, 443, 22, 53, 3389][Math.floor(Math.random() * 5)],
      protocol: ['TCP', 'UDP', 'ICMP'][Math.floor(Math.random() * 3)],
      size: isAttackCandidate ? Math.floor(Math.random() * 5000) + 1500 : Math.floor(Math.random() * 1000) + 40,
      ttl: isAttackCandidate ? Math.floor(Math.random() * 30) : 64, // Anomalous TTL
      flags: isAttackCandidate ? 'S' : 'A', // SYN floods or normal ACKs
    };

    processPacket(mockFeatureVector, io);
    
  }, 1000); // 1 packet every second for MVP demonstration
};

const stopSimulation = () => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    console.log('Stopped Network Traffic Simulation.');
  }
};

module.exports = { startSimulation, stopSimulation };