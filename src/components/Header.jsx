import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { manualLogout } from '../services/authService'

const Header = () => {
    const user = useSelector((state) => state.ui.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        manualLogout(dispatch)
    }

    return (
        <Navbar expand="lg" fixed="top" className="glass-navbar py-3">
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-gradient fs-3 d-flex align-items-center">
                    <img src={logo} alt="DriveDoc Logo" width="40" height="40" className="me-2" />
                    DriveDoc
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-lg"
                    aria-labelledby="offcanvasNavbarLabel-expand-lg"
                    placement="end"
                    className="glass-card"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" className="text-gradient">
                            DriveDoc
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                            <Nav.Link href="/#home" className="px-3 fw-medium">Home</Nav.Link>
                            <Nav.Link href="/#features" className="px-3 fw-medium">Features</Nav.Link>
                            <Nav.Link href="/#how-it-works" className="px-3 fw-medium">How it works</Nav.Link>
                            <Nav.Link href="/#about" className="px-3 fw-medium">About</Nav.Link>

                            {!user ? (
                                <Nav.Link as={Link} to="/admin" className="px-3 fw-medium text-primary">Admin Portal</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/dashboard" className="px-3 fw-medium text-success">Dashboard</Nav.Link>
                                    <Nav.Link onClick={handleLogout} className="px-3 fw-medium text-danger cursor-pointer">Logout</Nav.Link>
                                </>
                            )}

                            <Button as={Link} to="/track" variant="primary" className="ms-lg-3 rounded-pill px-4 shadow-sm mt-3 mt-lg-0">
                                Check Status
                            </Button>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header
