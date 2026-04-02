import { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Carousel } from 'react-bootstrap'
import { HiOutlineLockClosed, HiOutlineUser, HiOutlineShieldCheck, HiOutlineDatabase, HiOutlineLightningBolt, HiOutlineCheckCircle, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { motion } from 'motion/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { manualLogin } from '../services/authService'
import logo from '../assets/logo.svg'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'

    const authTips = [
        {
            icon: <HiOutlineDatabase size={48} className="text-primary mb-3" />,
            title: "Data Management",
            bullets: [
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Add & Register new vehicles" },
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Update insurance & road tax dates" },
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Manage processing status" }
            ],
            message: "Keep the registry clean, accurate, and up-to-date at all times."
        },
        {
            icon: <HiOutlineShieldCheck size={48} className="text-primary mb-3" />,
            title: "Security & Integrity",
            bullets: [
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Restricted administrative access" },
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Automatic session timeouts" },
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Activity logging for all actions" }
            ],
            message: "Your actions are recorded to maintain strict system integrity."
        },
        {
            icon: <HiOutlineLightningBolt size={48} className="text-primary mb-3" />,
            title: "Workflow Efficiency",
            bullets: [
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Batch process multiple records" },
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Real-time sync with database" },
                { icon: <HiOutlineCheckCircle className="text-success me-2" />, text: "Automated expiry notifications" }
            ],
            message: "Maximize productivity by utilizing our automated assist tools."
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const result = await manualLogin(dispatch, email, password)
        setLoading(false)

        if (result.success) {
            navigate(from, { replace: true })
        }
    }

    return (
        <div className="admin-login-page py-5 min-vh-100 bg-glow-section d-flex align-items-center">
            <Container>
                <Row className="justify-content-center align-items-stretch g-0 rounded-5 overflow-hidden shadow-2xl bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-20" style={{ minHeight: '600px' }}>

                    {/* Left Side: AuthTips Carousel */}
                    <Col lg={6} className="d-none d-lg-flex bg-primary bg-opacity-10 align-items-center p-5 text-center flex-column justify-content-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Carousel indicators={true} controls={false} interval={5000} pause="hover" className="w-100 h-100">
                                {authTips.map((tip, idx) => (
                                    <Carousel.Item key={idx} className="pb-5">
                                        <div className="p-4">
                                            {tip.icon}
                                            <h3 className="fw-bold mb-4">{tip.title}</h3>
                                            <div className="text-start mx-auto mb-4" style={{ maxWidth: '300px' }}>
                                                {tip.bullets.map((b, i) => (
                                                    <div key={i} className="d-flex align-items-center mb-3">
                                                        {b.icon}
                                                        <span className="text-secondary fw-medium">{b.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 bg-white bg-opacity-50 rounded-4 border border-primary border-opacity-10">
                                                <small className="italic text-primary fw-bold">"{tip.message}"</small>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </motion.div>
                    </Col>

                    {/* Right Side: Login Form */}
                    <Col lg={6} className="p-5 bg-white bg-opacity-80 d-flex flex-column justify-content-center">
                        <div className="text-center mb-5">
                            <Link to="/">
                                <img src={logo} alt="DriveDoc Logo" width="60" height="60" className="mb-3" />
                            </Link>
                            <h2 className="fw-extrabold text-gradient">Admin Portal</h2>
                            <p className="text-secondary">Enter your credentials to access the dashboard.</p>
                        </div>

                        <Form onSubmit={handleSubmit} className="px-lg-4">
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold small text-uppercase text-secondary tracking-wider">Email Address</Form.Label>
                                <div className="position-relative">
                                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
                                        <HiOutlineUser className="text-primary opacity-50" size={20} />
                                    </div>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@drivedoc.sys"
                                        className="py-3 ps-5 bg-light border-0 rounded-4 shadow-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-5">
                                <Form.Label className="fw-bold small text-uppercase text-secondary tracking-wider">Password</Form.Label>
                                <div className="position-relative">
                                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
                                        <HiOutlineLockClosed className="text-primary opacity-50" size={20} />
                                    </div>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="py-3 ps-5 pe-5 bg-light border-0 rounded-4 shadow-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <div
                                        className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer text-primary opacity-50 hover-opacity-100 transition-opacity"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                                    </div>
                                </div>
                            </Form.Group>

                            <Button variant="primary" type="submit" size="lg" className="w-100 rounded-pill py-3 fw-bold shadow-lg hover-lift mb-4" disabled={loading}>
                                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                            </Button>

                            <div className="text-center">
                                <small className="text-muted">
                                    Forgot your password? <span className="text-primary cursor-pointer fw-bold">Contact SuperAdmin</span>
                                </small>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdminLogin
