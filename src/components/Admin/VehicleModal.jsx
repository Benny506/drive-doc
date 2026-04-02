import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { addVehicle, updateVehicle } from '../../services/vehicleService'
import { useDispatch } from 'react-redux'
import { addAlert } from '../../redux/uiSlice'

const VehicleModal = ({ show, onHide, vehicle, onSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        vehicle_number: '',
        owner_name: '',
        make_model: '',
        insurance_expiry: '',
        road_tax_expiry: '',
        license_expiry: '',
        processing_status: 'Pending'
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (vehicle) {
            setFormData({
                vehicle_number: vehicle.vehicle_number || '',
                owner_name: vehicle.owner_name || '',
                make_model: vehicle.make_model || '',
                insurance_expiry: vehicle.insurance_expiry || '',
                road_tax_expiry: vehicle.road_tax_expiry || '',
                license_expiry: vehicle.license_expiry || '',
                processing_status: vehicle.processing_status || 'Pending'
            })
        } else {
            setFormData({
                vehicle_number: '',
                owner_name: '',
                make_model: '',
                insurance_expiry: '',
                road_tax_expiry: '',
                license_expiry: '',
                processing_status: 'Pending'
            })
        }
    }, [vehicle, show])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (vehicle) {
                await updateVehicle(vehicle.id, formData)
                dispatch(addAlert({ type: 'success', title: 'Vehicle Updated', message: 'The record has been successfully modified.' }))
            } else {
                await addVehicle(formData)
                dispatch(addAlert({ type: 'success', title: 'Vehicle Added', message: 'New vehicle registered in the system.' }))
            }
            onSuccess()
            onHide()
        } catch (err) {
            let errorMsg = err.message
            if (err.code === '23505') {
                errorMsg = `A vehicle with number "${formData.vehicle_number}" is already registered. Please use a unique number.`
            }
            dispatch(addAlert({ 
                type: 'error', 
                title: err.code === '23505' ? 'Duplicate Record' : 'Operation Failed', 
                message: errorMsg 
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="glass-modal">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-extrabold text-gradient">
                    {vehicle ? 'Edit Vehicle Details' : 'Register New Vehicle'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="p-4">
                    <Row className="g-4">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small text-uppercase text-secondary">Vehicle Number</Form.Label>
                                <Form.Control
                                    className="rounded-3 py-2"
                                    value={formData.vehicle_number}
                                    onChange={(e) => setFormData({ ...formData, vehicle_number: e.target.value.toUpperCase() })}
                                    required
                                    placeholder="e.g. ABC 1234"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small text-uppercase text-secondary">Owner Full Name</Form.Label>
                                <Form.Control
                                    className="rounded-3 py-2"
                                    value={formData.owner_name}
                                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label className="fw-bold small text-uppercase text-secondary">Make & Model</Form.Label>
                                <Form.Control
                                    className="rounded-3 py-2"
                                    value={formData.make_model}
                                    onChange={(e) => setFormData({ ...formData, make_model: e.target.value })}
                                    placeholder="e.g. Toyota Camry 2023"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-bold small text-uppercase text-secondary">Insurance Expiry</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="rounded-3 py-2"
                                    value={formData.insurance_expiry}
                                    onChange={(e) => setFormData({ ...formData, insurance_expiry: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-bold small text-uppercase text-secondary">Road Tax Expiry</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="rounded-3 py-2"
                                    value={formData.road_tax_expiry}
                                    onChange={(e) => setFormData({ ...formData, road_tax_expiry: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-bold small text-uppercase text-secondary">License Expiry</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="rounded-3 py-2"
                                    value={formData.license_expiry}
                                    onChange={(e) => setFormData({ ...formData, license_expiry: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group>
                                <Form.Label className="fw-bold small text-uppercase text-secondary">Processing Status</Form.Label>
                                <Form.Select
                                    className="rounded-3 py-2"
                                    value={formData.processing_status}
                                    onChange={(e) => setFormData({ ...formData, processing_status: e.target.value })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="border-0 p-4">
                    <Button variant="light" onClick={onHide} className="rounded-pill px-4">Cancel</Button>
                    <Button variant="primary" type="submit" disabled={loading} className="rounded-pill px-4 shadow-lg">
                        {loading ? 'Saving...' : vehicle ? 'Update Vehicle' : 'Register Vehicle'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default VehicleModal
