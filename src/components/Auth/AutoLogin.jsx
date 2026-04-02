import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../../supabase/supabaseClient'
import { authBootstrapper } from '../../services/authService'
import { setAuth, setAuthLoading } from '../../redux/uiSlice'
import GlobalLoader from '../Loader/GlobalLoader'

const AutoLogin = ({ children }) => {
    const dispatch = useDispatch()
    const authLoading = useSelector((state) => state.ui.authLoading)

    useEffect(() => {
        // Sync auth state changes across all instances
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(">>> Auth Event Captured:", event)

            // We bootstrap for initial load, successful sign-ins, and token refreshes
            if (['SIGNED_IN', 'TOKEN_REFRESHED', 'INITIAL_SESSION'].includes(event)) {
                await authBootstrapper(dispatch, session)
            } else if (event === 'SIGNED_OUT') {
                dispatch(setAuth({ user: null, session: null }))
                dispatch(setAuthLoading(false))
            }
        })

        return () => subscription.unsubscribe()
    }, [dispatch])

    if (authLoading) {
        return <GlobalLoader />
    }

    return children
}

export default AutoLogin
