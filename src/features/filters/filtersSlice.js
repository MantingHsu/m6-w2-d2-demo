// src/features/filters/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload
    },
    colorFilterToggled(state, action) {
      const { color, changeType } = action.payload // 'added' | 'removed'
      if (changeType === 'added') {
        if (!state.colors.includes(color)) state.colors.push(color)
      } else if (changeType === 'removed') {
        state.colors = state.colors.filter((c) => c !== color)
      }
    },
    colorsCleared(state) {
      state.colors = []
    },
  },
})

export const { statusFilterChanged, colorFilterToggled, colorsCleared } =
  filtersSlice.actions

export default filtersSlice.reducer
