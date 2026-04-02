import { Button } from 'react-bootstrap'
import { HiMenuAlt2 } from 'react-icons/hi'

const TopBar = ({ title, description, onMenuClick }) => {
    return (
        <header className="px-4 py-4 bg-white border-bottom shadow-sm sticky-top z-1" style={{ top: 0 }}>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Button
                        variant="link"
                        className="p-0 me-3 d-lg-none text-dark hover-text-primary transition-all"
                        onClick={onMenuClick}
                    >
                        <HiMenuAlt2 size={28} />
                    </Button>
                    <div>
                        <h2 className="fs-4 fw-extrabold mb-0 text-dark">{title}</h2>
                        <p className="text-secondary small mb-0 mt-1 d-none d-md-block">{description}</p>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    {/* User Profile / Notifications could go here */}
                    <div className="text-end d-none d-sm-block">
                        <span className="d-block small fw-bold">Admin User</span>
                        <span className="text-secondary smaller">system@drivedoc.sys</span>
                    </div>
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle border border-primary border-opacity-10">
                        <div className="bg-primary rounded-circle" style={{ width: '32px', height: '32px' }}></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopBar
