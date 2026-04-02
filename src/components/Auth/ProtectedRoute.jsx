import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.ui.user)
    const session = useSelector((state) => state.ui.session)
    const location = useLocation()

    if (!user || !session) {
        // Redirect to login but save the attempted location
        return <Navigate to="/admin" state={{ from: location }} replace />
    }

    return children
}

export default ProtectedRoute
