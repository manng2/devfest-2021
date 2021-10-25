import { createSlice } from '@reduxjs/toolkit'

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    value: [],
  },
  reducers: {
    getBlocks: (state, action) => {
      state.value = action.payload
    },
    addBlock: (state, action) => {
      state.value = [...state.value, action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addBlock, getBlocks } = blocksSlice.actions

export default blocksSlice.reducer