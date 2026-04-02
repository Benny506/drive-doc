import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import fleetReducer from './fleetSlice'

const store = configureStore({
    reducer: {
        ui: uiReducer,
        fleet: fleetReducer
    }
})

export default store
