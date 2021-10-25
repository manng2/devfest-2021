import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: 1,
  },
  reducers: {
    getPage: (state, action) => {
      state.value = action.payload
    },
    updatePage: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getPage, updatePage } = pageSlice.actions

export default pageSlice.reducer