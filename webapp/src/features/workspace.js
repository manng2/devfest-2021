import { createSlice } from '@reduxjs/toolkit'

export const workSpaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    value: {},
  },
  reducers: {
    getWorkspace: (state, action) => {
      state.value = action.payload
    },
    updateWorkspace: (state, action) => {
      state.value = {
        ...action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { getWorkspace, updateWorkspace } = workSpaceSlice.actions

export default workSpaceSlice.reducer
