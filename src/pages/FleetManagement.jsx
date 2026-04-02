import { useState, useEffect } from 'react'
import { Table, Badge, Button, Dropdown, Form, InputGroup } from 'react-bootstrap'
import { HiOutlineDotsVertical, HiOutlinePlus, HiOutlineSearch, HiOutlineRefresh } from 'react-icons/hi'
import DashboardLayout from '../components/Admin/DashboardLayout'
import { fetchVehicles, updateVehicle, deleteVehicle } from '../services/vehicleService'
import { Menu, MenuItem, MenuButton, MenuDivider, MenuHeader } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import VehicleModal from '../components/Admin/VehicleModal'
import ConfirmModal from '../components/Admin/ConfirmModal'
import { useSelector, useDispatch } from 'react-redux'
import { addAlert, setGlobalLoading } from '../redux/uiSlice'
import { setVehicles, setFleetLoading, removeVehicleFromStore } from '../redux/fleetSlice'

const FleetManagement = () => {
    const dispatch = useDispatch()
    const { vehicles, isInitialLoad, loading: fleetLoading } = useSelector((state) => state.fleet)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState(null)

    const loadVehicles = async (forceGlobal = false) => {
        // Use GlobalLoader ONLY if it's the very first load of the app for this slice
        const useGlobal = isInitialLoad || forceGlobal
        
        if (useGlobal) dispatch(setGlobalLoading(true))
        else dispatch(setFleetLoading(true))

        try {
            const data = await fetchVehicles()
            dispatch(setVehicles(data))
        } catch (err) {
            dispatch(addAlert({ type: 'error', title: 'Sync Failed', message: err.message }))
        } finally {
            if (useGlobal) dispatch(setGlobalLoading(false))
            else dispatch(setFleetLoading(false))
        }
    }

    useEffect(() => {
        // Load on mount if we haven't loaded yet, or always refresh silently
        loadVehicles()
    }, [])

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateVehicle(id, { processing_status: newStatus })
            dispatch(addAlert({ type: 'success', title: 'Status Updated', message: `Vehicle status changed to ${newStatus}` }))
            loadVehicles(true)
        } catch (err) {
            dispatch(addAlert({ type: 'error', title: 'Update Failed', message: err.message }))
        }
    }

    const confirmDelete = async () => {
        if (!selectedVehicle) return
        
        dispatch(setGlobalLoading({
            loading: true,
            title: 'Deleting Record',
            message: 'Removing vehicle data from secure registry...'
        }))

        try {
            await deleteVehicle(selectedVehicle.id)
            dispatch(addAlert({ type: 'info', title: 'Record Deleted', message: 'Vehicle successfully removed from your fleet.' }))
            loadVehicles(true)
        } catch (err) {
            dispatch(addAlert({ type: 'error', title: 'Delete Failed', message: err.message }))
        } finally {
            dispatch(setGlobalLoading(false))
            setShowConfirm(false)
        }
    }

    const handleDeleteAttempt = (vehicle) => {
        setSelectedVehicle(vehicle)
        setShowConfirm(true)
    }

    const openAddModal = () => {
        setSelectedVehicle(null)
        setShowModal(true)
    }

    const openEditModal = (vehicle) => {
        setSelectedVehicle(vehicle)
        setShowModal(true)
    }

    const filteredVehicles = vehicles.filter(v =>
        v.vehicle_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.owner_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Completed': return 'success'
            case 'Processing': return 'primary'
            default: return 'warning'
        }
    }

    return (
        <DashboardLayout
            title="Fleet Management"
            description="Manage all registered vehicles and their processing statuses."
        >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <InputGroup className="max-w-md shadow-sm rounded-pill overflow-hidden border-0">
                    <InputGroup.Text className="bg-white border-0 ps-3">
                        <HiOutlineSearch className="text-secondary" />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search by vehicle number or owner..."
                        className="border-0 py-2 shadow-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                <div className="d-flex gap-2 align-items-center">
                    {fleetLoading && !isInitialLoad && (
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    <Button 
                        variant="outline-primary" 
                        className="rounded-pill px-4 shadow-sm" 
                        onClick={() => loadVehicles(false)}
                        disabled={fleetLoading}
                    >
                        <HiOutlineRefresh className={`me-2 ${fleetLoading ? 'spin' : ''}`} /> 
                        {fleetLoading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button variant="primary" className="rounded-pill px-4 shadow-sm" onClick={openAddModal}>
                        <HiOutlinePlus className="me-2" /> Add Vehicle
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-4 shadow-sm border">
                <Table responsive hover className="mb-0">
                    <thead className="bg-light">
                        <tr className="border-bottom text-uppercase smaller tracking-widest fw-bold text-secondary">
                            <th className="px-4 py-3">Vehicle Details</th>
                            <th className="py-3">Owner</th>
                            <th className="py-3">Status</th>
                            <th className="py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="border-0">
                        {filteredVehicles.length > 0 ? filteredVehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="align-middle border-bottom border-light">
                                <td className="px-4 py-3">
                                    <div className="fw-bold text-dark">{vehicle.vehicle_number}</div>
                                    <div className="small text-secondary">{vehicle.make_model || 'Unknown Model'}</div>
                                </td>
                                <td className="py-3 fw-medium">{vehicle.owner_name}</td>
                                <td className="py-3">
                                    <Badge bg={getStatusVariant(vehicle.processing_status)} className="rounded-pill px-3 py-2 fw-bold opacity-75">
                                        {vehicle.processing_status}
                                    </Badge>
                                </td>
                                <td className="py-3 text-center">
                                    <Menu 
                                        menuButton={
                                            <MenuButton className="p-0 bg-transparent border-0 text-secondary shadow-none">
                                                <HiOutlineDotsVertical size={20} />
                                            </MenuButton>
                                        } 
                                        transition 
                                        portal
                                        align="end"
                                        offsetY={8}
                                        menuClassName="shadow-2xl border-0 rounded-4 p-2 custom-dropdown-menu"
                                    >
                                        <MenuHeader className="smaller text-uppercase fw-bold text-secondary opacity-50 px-3 py-2">Actions</MenuHeader>
                                        <MenuItem onClick={() => openEditModal(vehicle)} className="rounded-3 py-2 px-3">Edit Record</MenuItem>
                                        <MenuItem onClick={() => handleDeleteAttempt(vehicle)} className="text-danger rounded-3 py-2 px-3">Delete Record</MenuItem>
                                        
                                        <MenuDivider className="my-2 bg-light" />
                                        <MenuHeader className="smaller text-uppercase fw-bold text-secondary opacity-50 px-3 py-2">Update Status</MenuHeader>
                                        <MenuItem onClick={() => handleStatusUpdate(vehicle.id, 'Pending')} className="rounded-3 py-2 px-3">Set Pending</MenuItem>
                                        <MenuItem onClick={() => handleStatusUpdate(vehicle.id, 'Processing')} className="rounded-3 py-2 px-3">Set Processing</MenuItem>
                                        <MenuItem onClick={() => handleStatusUpdate(vehicle.id, 'Completed')} className="rounded-3 py-2 px-3">Set Completed</MenuItem>
                                    </Menu>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-secondary">
                                    {vehicles.length === 0 ? "Initialising fleet data..." : "No vehicles match your search."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <VehicleModal
                show={showModal}
                onHide={() => setShowModal(false)}
                vehicle={selectedVehicle}
                onSuccess={() => loadVehicles(true)}
            />

            <ConfirmModal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Vehicle?"
                message={`Are you sure you want to remove ${selectedVehicle?.vehicle_number} from the registry? This action is permanent.`}
                confirmText="Delete Record"
                type="danger"
            />
        </DashboardLayout>
    )
}

export default FleetManagement
