import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alerts: [],
    user: null,
    session: null,
    authLoading: true,
    globalLoading: false,
    globalLoadingTitle: 'Loading',
    globalLoadingMessage: 'Please wait a moment...'
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addAlert: (state, action) => {
            const { type, title, message, duration = 5000 } = action.payload
            state.alerts.push({
                id: Date.now(),
                type: type || 'info',
                title: title || '',
                message: message || '',
                duration
            })
        },
        setAuth: (state, action) => {
            state.user = action.payload.user
            state.session = action.payload.session
        },
        setAuthLoading: (state, action) => {
            state.authLoading = action.payload
        },
        setGlobalLoading: (state, action) => {
            if (typeof action.payload === 'boolean') {
                state.globalLoading = action.payload
            } else {
                state.globalLoading = action.payload.loading
                state.globalLoadingTitle = action.payload.title || 'Loading'
                state.globalLoadingMessage = action.payload.message || 'Please wait a moment...'
            }
        },
        logout: (state) => {
            state.user = null
            state.session = null
        },
        removeAlert: (state, action) => {
            state.alerts = state.alerts.filter((alert) => alert.id !== action.payload)
        },
        clearAlerts: (state) => {
            state.alerts = []
        }
    }
})

export const { addAlert, removeAlert, clearAlerts, setAuth, setAuthLoading, setGlobalLoading, logout } = uiSlice.actions
export default uiSlice.reducer
