import pyshark
import pandas as pd
from typing import Dict, Any

class PacketFeatureExtractor:
    def __init__(self):
        # We define the columns expected by the ML model
        self.feature_columns = [
            'src_port', 'dst_port', 'protocol_type', 
            'packet_size', 'ttl', 'tcp_flags', 'payload_entropy'
        ]
        
    def extract_features(self, pcap_path: str = None, interface: str = None):
        """
        Extracts features from either an offline PCAP file or a live network interface.
        """
        if pcap_path:
            capture = pyshark.FileCapture(pcap_path)
            return self._process_capture(capture)
        elif interface:
            capture = pyshark.LiveCapture(interface=interface)
            # In a real app, we'd sniff continuously and yield features
            # capture.sniff_continuously(packet_count=5)
            pass
            
    def _process_capture(self, capture) -> pd.DataFrame:
        features_list = []
        for packet in capture:
            features = self._extract_single_packet(packet)
            if features:
                features_list.append(features)
        
        return pd.DataFrame(features_list)

    def _extract_single_packet(self, packet) -> Dict[str, Any]:
        try:
            # Fallbacks for missing layers
            proto = packet.transport_layer if hasattr(packet, 'transport_layer') else 'UNKNOWN'
            
            src_port = 0
            dst_port = 0
            if proto == 'TCP':
                src_port = packet.tcp.srcport
                dst_port = packet.tcp.dstport
            elif proto == 'UDP':
                src_port = packet.udp.srcport
                dst_port = packet.udp.dstport

            size = packet.length
            ttl = getattr(packet.ip, 'ttl', 64) if hasattr(packet, 'ip') else 64
            
            # Simple struct matching the MERN stack expectation
            return {
                'sourceIp': packet.ip.src if hasattr(packet, 'ip') else 'Unknown',
                'destIp': packet.ip.dst if hasattr(packet, 'ip') else 'Unknown',
                'sourcePort': int(src_port),
                'destPort': int(dst_port),
                'protocol': proto,
                'size': int(size),
                'ttl': int(ttl),
            }
        except Exception as e:
            # Log error internally
            return None