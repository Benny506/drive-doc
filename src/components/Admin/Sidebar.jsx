import { Nav, Offcanvas } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import {
    HiOutlineHome,
    HiOutlineTruck,
    HiOutlineClipboardList,
    HiOutlineUserGroup,
    HiOutlineCog,
    HiOutlineLogout,
    HiOutlineSearch
} from 'react-icons/hi'
import logo from '../../assets/logo.svg'
import { useDispatch } from 'react-redux'
import { manualLogout } from '../../services/authService'

const SidebarContent = ({ onClose }) => {
    const location = useLocation()
    const dispatch = useDispatch()

    const navItems = [
        { icon: <HiOutlineHome size={20} />, label: 'Overview', path: '/dashboard' },
        { icon: <HiOutlineTruck size={20} />, label: 'Fleet Management', path: '/dashboard/fleet' },
    ]

    const publicLinks = [
        { icon: <HiOutlineHome size={20} />, label: 'Landing Page', path: '/' },
        { icon: <HiOutlineSearch size={20} />, label: 'Track Status', path: '/track' },
    ]

    const handleLogout = () => {
        manualLogout(dispatch)
        if (onClose) onClose()
    }

    return (
        <div className="d-flex flex-column h-100 sidebar-inner">
            <div className="p-4 mb-2 d-flex align-items-center border-bottom border-white border-opacity-10">
                <img src={logo} alt="DriveDoc" width="35" height="35" className="me-2" />
                <span className="fs-4 fw-extrabold text-white">DriveDoc</span>
            </div>

            <div className="flex-grow-1 overflow-auto px-3 py-2 scrollbar-hidden">
                <div className="smaller text-uppercase fw-bold text-white text-opacity-25 px-3 mb-2 mt-2">Management</div>
                <Nav className="flex-column gap-1 mb-4">
                    {navItems.map((item) => (
                        <Nav.Link
                            key={item.path}
                            as={Link}
                            to={item.path}
                            onClick={() => onClose && onClose()}
                            className={`d-flex align-items-center px-3 py-2 rounded-3 transition-all ${location.pathname === item.path
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-white text-opacity-50 hover-bg-white hover-bg-opacity-10'
                                }`}
                        >
                            <span className="me-3">{item.icon}</span>
                            <span className="fw-medium">{item.label}</span>
                        </Nav.Link>
                    ))}
                </Nav>

                <div className="smaller text-uppercase fw-bold text-white text-opacity-25 px-3 mb-2">Public Shortcuts</div>
                <Nav className="flex-column gap-1">
                    {publicLinks.map((item) => (
                        <Nav.Link
                            key={item.path}
                            as={Link}
                            to={item.path}
                            onClick={() => onClose && onClose()}
                            className="d-flex align-items-center px-3 py-2 rounded-3 text-white text-opacity-50 hover-bg-white hover-bg-opacity-10 transition-all"
                        >
                            <span className="me-3">{item.icon}</span>
                            <span className="fw-medium">{item.label}</span>
                        </Nav.Link>
                    ))}
                </Nav>
            </div>

            <div className="p-3 border-top border-white border-opacity-10">
                <Nav.Link
                    onClick={handleLogout}
                    className="d-flex align-items-center px-3 py-2 rounded-3 text-danger hover-bg-danger hover-bg-opacity-10 transition-all cursor-pointer"
                >
                    <HiOutlineLogout size={20} className="me-3" />
                    <span className="fw-medium">Logout</span>
                </Nav.Link>
            </div>
        </div>
    )
}

const Sidebar = ({ show, onHide }) => {
    return (
        <>
            {/* Desktop Fixed Sidebar */}
            <div className="d-none d-lg-block bg-dark text-white border-end border-white border-opacity-10" style={{ width: '280px', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
                <SidebarContent />
            </div>

            {/* Mobile Offcanvas Sidebar */}
            <Offcanvas
                show={show}
                onHide={onHide}
                placement="start"
                className="bg-dark text-white border-end border-white border-opacity-10"
                style={{ width: '280px' }}
            >
                <Offcanvas.Body className="p-0 h-100 overflow-hidden">
                    <SidebarContent onClose={onHide} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Sidebar
