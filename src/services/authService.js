import { supabase } from '../supabase/supabaseClient'
import { setAuth, setAuthLoading, setGlobalLoading, addAlert } from '../redux/uiSlice'

/**
 * Handles the standard auth flow for both manual login and session restoration.
 */
export const authBootstrapper = async (dispatch, session) => {
    console.log("--- authBootstrapper Initialized ---", { hasSession: !!session })

    if (!session) {
        console.log("No session found, clearing auth state.")
        dispatch(setAuth({ user: null, session: null }))
        dispatch(setAuthLoading(false))
        return { success: false }
    }

    try {
        const user = session.user
        console.log("Auth success from session! Syncing to Redux.", user.email)

        dispatch(setAuth({ user, session }))
        dispatch(setAuthLoading(false))
        return { success: true, user }

    } catch (err) {
        console.error("Auth bootstrapping critical failure:", err)
        dispatch(setAuth({ user: null, session: null }))
        dispatch(setAuthLoading(false))
        return { success: false, error: err.message }
    }
}

export const manualLogin = async (dispatch, email, password) => {
    dispatch(setGlobalLoading({
        loading: true,
        title: 'Authenticating',
        message: 'Establishing secure connection...'
    }))
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error

        const result = await authBootstrapper(dispatch, data.session)
        if (result.success) {
            dispatch(addAlert({ type: 'success', title: 'Login Successful', message: 'Welcome back to DriveDoc.' }))
        }
        dispatch(setGlobalLoading(false))
        return result
    } catch (err) {
        dispatch(setGlobalLoading(false))
        dispatch(addAlert({ type: 'error', title: 'Login Failed', message: err.message }))
        return { success: false, error: err.message }
    }
}

export const manualLogout = async (dispatch) => {
    dispatch(setGlobalLoading({
        loading: true,
        title: 'Signing Out',
        message: 'Clearing secure session cache...'
    }))
    try {
        await supabase.auth.signOut()
        dispatch(setAuth({ user: null, session: null }))
        dispatch(setGlobalLoading(false))
        dispatch(addAlert({ type: 'info', title: 'Logged Out', message: 'You have been safely signed out.' }))
    } catch (err) {
        console.error("Logout failed:", err)
        dispatch(setGlobalLoading(false))
    }
}
