import { createSlice } from '@reduxjs/toolkit';

const initialPackets = [];

const packetSlice = createSlice({
  name: 'packets',
  initialState: {
    livePackets: initialPackets,
    stats: { critical: 0, high: 0, medium: 0, low: 0, safe: 0 }
  },
  reducers: {
    addLivePacket: (state, action) => {
      state.livePackets.unshift(action.payload);
      if (state.livePackets.length > 100) state.livePackets.pop(); // Keep circular buffer max 100
      
      const score = action.payload.adversityScore;
      if (score >= 90) state.stats.critical++;
      else if (score >= 71) state.stats.high++;
      else if (score >= 46) state.stats.medium++;
      else if (score >= 21) state.stats.low++;
      else state.stats.safe++;
    }
  }
});

export const { addLivePacket } = packetSlice.actions;
export default packetSlice.reducer;