import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DashboardLayout from '../components/Admin/DashboardLayout'
import { Row, Col, Card, Badge, Table } from 'react-bootstrap'
import { HiOutlineTrendingUp, HiOutlineTruck, HiOutlineClock, HiOutlineDocumentReport, HiOutlineEye } from 'react-icons/hi'
import { fetchVehicles } from '../services/vehicleService'
import { setVehicles, setFleetLoading } from '../redux/fleetSlice'
import { setGlobalLoading, addAlert } from '../redux/uiSlice'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { vehicles, isInitialLoad, loading } = useSelector((state) => state.fleet)

    const loadData = async () => {
        const useGlobal = isInitialLoad
        if (useGlobal) dispatch(setGlobalLoading(true))
        else dispatch(setFleetLoading(true))

        try {
            const data = await fetchVehicles()
            dispatch(setVehicles(data))
        } catch (err) {
            dispatch(addAlert({ type: 'error', title: 'Dashboard Error', message: err.message }))
        } finally {
            if (useGlobal) dispatch(setGlobalLoading(false))
            else dispatch(setFleetLoading(false))
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // Real-time Analytics Calculations
    const analytics = useMemo(() => {
        const total = vehicles.length
        
        // Expiries within 30 days
        const thirtyDaysOut = new Date()
        thirtyDaysOut.setDate(thirtyDaysOut.getDate() + 30)
        
        const expiringSoon = vehicles.filter(v => {
            const insDate = new Date(v.insurance_expiry)
            const taxDate = new Date(v.road_tax_expiry)
            return insDate <= thirtyDaysOut || taxDate <= thirtyDaysOut
        }).length

        const completed = vehicles.filter(v => v.processing_status === 'Completed').length
        const processing = vehicles.filter(v => v.processing_status === 'Processing').length

        return { total, expiringSoon, completed, processing }
    }, [vehicles])

    const stats = [
        { label: 'Total Fleet', value: analytics.total, icon: <HiOutlineTruck />, color: 'primary' },
        { label: 'Expiring Soon', value: analytics.expiringSoon, icon: <HiOutlineClock />, color: 'danger' },
        { label: 'Completed Jobs', value: analytics.completed, icon: <HiOutlineDocumentReport />, color: 'success' },
        { label: 'In-Processing', value: analytics.processing, icon: <HiOutlineTrendingUp />, color: 'info' },
    ]

    return (
        <DashboardLayout
            title="System Overview"
            description="Welcome back, Administrator. Real-time fleet analytics are now live."
        >
            <Row className="g-4 mb-5">
                {stats.map((stat, idx) => (
                    <Col key={idx} sm={6} xl={3}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 hover-lift transition-all">
                            <Card.Body className="p-4">
                                <div className={`d-inline-flex p-3 rounded-4 bg-${stat.color} bg-opacity-10 text-${stat.color} mb-3`}>
                                    {stat.icon}
                                </div>
                                <h3 className="fs-2 fw-extrabold mb-1">{stat.value}</h3>
                                <span className="text-secondary fw-bold small text-uppercase tracking-wider">{stat.label}</span>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-5">
                <Card.Header className="bg-white border-0 p-4 d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Recent Fleet Additions</h4>
                    <Link to="/dashboard/fleet" className="btn btn-link text-primary fw-bold text-decoration-none smaller">
                        View All <HiOutlineEye className="ms-1" />
                    </Link>
                </Card.Header>
                <Card.Body className="p-0">
                    {vehicles.length > 0 ? (
                        <Table responsive className="mb-0">
                            <thead className="bg-light">
                                <tr className="smaller text-uppercase fw-bold text-secondary border-0">
                                    <th className="px-4 py-3">Vehicle</th>
                                    <th className="py-3">Owner</th>
                                    <th className="py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.slice(0, 5).map(v => (
                                    <tr key={v.id} className="align-middle">
                                        <td className="px-4 py-3 fw-bold">{v.vehicle_number}</td>
                                        <td className="py-3">{v.owner_name}</td>
                                        <td className="py-3">
                                            <Badge bg={v.processing_status === 'Completed' ? 'success' : v.processing_status === 'Processing' ? 'primary' : 'warning'} className="rounded-pill opacity-75">
                                                {v.processing_status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="p-5 text-center text-secondary">
                            <div className="opacity-50 mb-3">
                                <HiOutlineDocumentReport size={64} />
                            </div>
                            <p className="mb-0">No vehicle records found in your fleet.</p>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </DashboardLayout>
    )
}

export default AdminDashboard
