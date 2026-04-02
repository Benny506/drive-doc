import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    vehicles: [],
    isInitialLoad: true,
    loading: false,
    error: null
}

const fleetSlice = createSlice({
    name: 'fleet',
    initialState,
    reducers: {
        setVehicles: (state, action) => {
            state.vehicles = action.payload
            state.isInitialLoad = false
            state.loading = false
        },
        setFleetLoading: (state, action) => {
            state.loading = action.payload
        },
        addVehicleToStore: (state, action) => {
            state.vehicles.unshift(action.payload)
        },
        updateVehicleInStore: (state, action) => {
            const index = state.vehicles.findIndex(v => v.id === action.payload.id)
            if (index !== -1) {
                state.vehicles[index] = action.payload
            }
        },
        removeVehicleFromStore: (state, action) => {
            state.vehicles = state.vehicles.filter(v => v.id !== action.payload)
        },
        setFleetError: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const { 
    setVehicles, 
    setFleetLoading, 
    addVehicleToStore, 
    updateVehicleInStore, 
    removeVehicleFromStore,
    setFleetError
} = fleetSlice.actions

export default fleetSlice.reducer
