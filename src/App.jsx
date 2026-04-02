import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import PublicSearch from './pages/PublicSearch'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import FleetManagement from './pages/FleetManagement'
import GlobalAlerts from './components/Alert/GlobalAlerts'
import AutoLogin from './components/Auth/AutoLogin'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { useSelector } from 'react-redux'
import GlobalLoader from './components/Loader/GlobalLoader'

function App() {
  const globalLoading = useSelector((state) => state.ui.globalLoading)

  return (
    <HashRouter>
      <AutoLogin>
        <div className="app-container">
          <GlobalAlerts />
          {globalLoading && <GlobalLoader />}
          <Routes>
            {/* Pages with Global Header */}
            <Route path="/" element={<><Header /><main><LandingPage /></main></>} />
            <Route path="/track" element={<><Header /><main><PublicSearch /></main></>} />

            {/* Admin Pages (No Global Header) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="fleet" element={<FleetManagement />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AutoLogin>
    </HashRouter>
  )
}

export default App
