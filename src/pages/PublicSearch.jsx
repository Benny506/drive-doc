import { findVehicleByNumber } from '../services/vehicleService'
import { Link } from 'react-router-dom'
import { HiOutlineArrowLeft, HiOutlineSearch, HiOutlineCalendar, HiOutlineStatusOnline } from 'react-icons/hi'
import { useState } from 'react'
import { Container, Row, Col, Form, InputGroup, Button, Card, Badge } from 'react-bootstrap'
import { motion, AnimatePresence } from 'motion/react'

const PublicSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [vehicle, setVehicle] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setLoading(true)
        setError('')
        setVehicle(null)

        try {
            const data = await findVehicleByNumber(searchQuery.trim())
            if (data) {
                setVehicle(data)
            } else {
                setError('No record found for this vehicle number. Please verify and try again.')
            }
        } catch (err) {
            setError('An error occurred during search. Please try again later.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="search-page py-5 min-vh-100 bg-light position-relative">
            <Link to="/" className="btn btn-white shadow-sm rounded-pill position-absolute top-0 start-0 m-4 d-flex align-items-center gap-2 border-0 fw-bold text-primary">
                <HiOutlineArrowLeft /> Home
            </Link>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8} xl={6}>
                        <div className="text-center mb-5 mt-4">
                            <h1 className="fw-extrabold mb-3 display-5">Track Status</h1>
                            <p className="text-secondary lead">Securely lookup your vehicle's processing status and expiry dates.</p>
                        </div>

                        <Card className="glass-card p-4 border-0 shadow-sm mb-5">
                            <Form onSubmit={handleSearch}>
                                <InputGroup size="lg" className="shadow-sm rounded-pill overflow-hidden border">
                                    <InputGroup.Text className="bg-white border-0 px-4">
                                        <HiOutlineSearch className="text-primary" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Enter Vehicle Number (e.g., ABC-1234)"
                                        className="border-0 py-3"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        required
                                    />
                                    <Button variant="primary" type="submit" className="px-5 fw-bold" disabled={loading}>
                                        {loading ? 'Searching...' : 'Find'}
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Card>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="alert alert-warning rounded-4 border-0 text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {vehicle && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="vehicle-result"
                                >
                                    <Card className="glass-card border-0 shadow-lg overflow-hidden">
                                        <div className="bg-primary bg-opacity-10 p-4 border-bottom d-flex justify-content-between align-items-center">
                                            <div>
                                                <h3 className="mb-0 fw-bold">{vehicle.vehicle_number}</h3>
                                                <small className="text-secondary">{vehicle.make_model}</small>
                                            </div>
                                            <Badge bg={vehicle.processing_status === 'Completed' ? 'success' : 'warning'} className="rounded-pill px-4 py-2">
                                                {vehicle.processing_status}
                                            </Badge>
                                        </div>

                                        <Card.Body className="p-4">
                                            <Row className="g-4">
                                                <Col sm={6}>
                                                    <div className="d-flex align-items-start">
                                                        <div className="bg-white p-2 rounded-3 shadow-sm me-3">
                                                            <HiOutlineCalendar size={24} className="text-primary" />
                                                        </div>
                                                        <div>
                                                            <small className="text-muted d-block uppercase tracking-tighter">Insurance Expiry</small>
                                                            <span className="fw-bold fs-5">{vehicle.insurance_expiry}</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className="d-flex align-items-start">
                                                        <div className="bg-white p-2 rounded-3 shadow-sm me-3">
                                                            <HiOutlineCalendar size={24} className="text-primary" />
                                                        </div>
                                                        <div>
                                                            <small className="text-muted d-block uppercase tracking-tighter">Road Tax Expiry</small>
                                                            <span className="fw-bold fs-5">{vehicle.road_tax_expiry}</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={12}>
                                                    <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between border border-primary border-opacity-10">
                                                        <div className="d-flex align-items-center">
                                                            <HiOutlineStatusOnline className="text-primary me-2" />
                                                            <span className="fw-medium">Current Status: {vehicle.processing_status}</span>
                                                        </div>
                                                        <small className="text-muted italic">Last updated today</small>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PublicSearch
