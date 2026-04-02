import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const DashboardLayout = ({ children, title, description }) => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="dashboard-wrapper bg-light min-vh-100 d-flex overflow-hidden">
            {/* Navigation Sidebar */}
            <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} />

            {/* Main Content Area */}
            <div
                className="flex-grow-1 d-flex flex-column transition-all"
                style={{
                    marginLeft: '0px',
                    width: '100%'
                }}
            >
                {/* Desktop Margin Offset for Fixed Sidebar */}
                <div className="d-none d-lg-block" style={{ marginLeft: '280px' }}></div>

                {/* Top Sticky Header */}
                <div className="header-container transition-all" style={{ marginLeft: '0px' }}>
                    <div className="d-none d-lg-block" style={{ marginLeft: '280px' }}>
                        <TopBar
                            title={title}
                            description={description}
                            onMenuClick={() => setShowSidebar(true)}
                        />
                    </div>
                    <div className="d-lg-none">
                        <TopBar
                            title={title}
                            description={description}
                            onMenuClick={() => setShowSidebar(true)}
                        />
                    </div>
                </div>

                {/* Scrollable Content Body */}
                <main className="flex-grow-1 overflow-auto p-4 p-md-5" style={{
                    marginLeft: '0px'
                }}>
                    <div className="d-none d-lg-block" style={{ marginLeft: '280px' }}>
                        {children}
                    </div>
                    <div className="d-lg-none mt-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
