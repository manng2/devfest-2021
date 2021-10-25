import { createSlice } from '@reduxjs/toolkit'

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    value: [],
  },
  reducers: {
    getRooms: (state, action) => {
      state.value = action.payload
    },
    updateRoom: (state, action) => {
      const idx = state.value.findIndex(v => v._id == action.payload._id)
      state.value = [...state.value.slice(0, idx), ...action.payload, ...state.value.slice(idx + 1)]
    }
  },
})

// Action creators are generated for each case reducer function
export const { getRooms, updateRoom } = roomsSlice.actions

export default roomsSlice.reducer
