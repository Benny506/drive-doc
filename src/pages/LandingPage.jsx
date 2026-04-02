import { Container, Row, Col, Card, Button, Badge, Carousel } from 'react-bootstrap'
import { HiOutlineBell, HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineClock, HiOutlineDocumentSearch, HiOutlineLightningBolt } from 'react-icons/hi'
import { motion } from 'motion/react'
import heroImg from '../assets/hero-premium.png'
import syncImg from '../assets/sync-illustration.png'
import notifImg from '../assets/notif-illustration.png'

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    }

    return (
        <div className="landing-wrapper w-100 overflow-hidden">
            {/* Hero Section */}
            <section id="home" className="hero-section py-5 bg-glow-section min-vh-100 d-flex align-items-center w-100">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0 z-1">
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill bg-opacity-10 text-primary fw-bold">
                                    ✨ Smarter Vehicle Management
                                </Badge>
                                <h1 className="display-2 fw-extrabold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Your Vehicle, <br />
                                    <span className="text-gradient">Fully Optimized.</span>
                                </h1>
                                <p className="lead text-secondary mb-5 fs-4" style={{ lineHeight: '1.6' }}>
                                    Experience the future of vehicle document management. Automated reminders, seamless processing, and real-time status tracking—all in one premium dashboard.
                                </p>
                                <div className="d-flex flex-wrap gap-4">
                                    <Button size="lg" className="rounded-pill px-5 py-3 shadow-lg hover-lift fw-bold">
                                        Start Tracking Now
                                    </Button>
                                    <Button variant="outline-dark" size="lg" className="rounded-pill px-5 py-3 fw-bold">
                                        Watch Demo
                                    </Button>
                                </div>
                            </motion.div>
                        </Col>

                        <Col lg={6} className="position-relative text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="hero-image-wrapper p-3"
                            >
                                <div className="glass-card p-2 rounded-4 shadow-2xl overflow-hidden position-relative">
                                    <img src={heroImg} alt="Premium Vehicle Dashboard" className="img-fluid rounded-3" />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient text-white text-start">
                                        <h5 className="mb-0 fw-bold">Real-time status updates</h5>
                                        <small>Syncing with national databases...</small>
                                    </div>
                                </div>

                                {/* Floating Elements for Premium Feel */}
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="position-absolute top-0 start-0 translate-middle glass-card p-3 d-none d-xl-block"
                                    style={{ zIndex: 10 }}
                                >
                                    <HiOutlineBell size={24} className="text-primary" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                    className="position-absolute bottom-0 end-0 translate-middle glass-card p-3 d-none d-xl-block"
                                    style={{ zIndex: 10 }}
                                >
                                    <HiOutlineShieldCheck size={24} className="text-success" />
                                </motion.div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Stats Bar */}
            <section className="bg-white py-4 border-y overflow-hidden">
                <Container>
                    <motion.div
                        className="d-flex justify-content-around flex-wrap gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            { label: 'Active Users', val: '24k' },
                            { label: 'Documents Processed', val: '1.2M' },
                            { label: 'Uptime', val: '99.9%' },
                            { label: 'Customer Rating', val: '4.9/5' }
                        ].map((s, i) => (
                            <motion.div key={i} variants={itemVariants} className="text-center">
                                <h3 className="fw-bold mb-0 text-gradient">{s.val}</h3>
                                <small className="text-muted fw-medium fs-6">{s.label}</small>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-5 bg-glow-section">
                <Container className="py-5">
                    <Row className="mb-5 justify-content-center text-center">
                        <Col lg={7}>
                            <h2 className="display-4 fw-bold mb-3">Engineered for Excellence</h2>
                            <p className="text-secondary lead">We've refined every detail to ensure your vehicle documentation experience is as smooth as your drive.</p>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        {[
                            {
                                icon: <HiOutlineLightningBolt size={36} />,
                                title: "Instant Status",
                                desc: "Check your vehicle's processing status in seconds with our high-speed lookup engine.",
                                color: "#4F46E5"
                            },
                            {
                                icon: <HiOutlineDocumentSearch size={36} />,
                                title: "Detail Tracking",
                                desc: "Every renewal, every document—tracked precisely so you stay compliant effortlessly.",
                                color: "#7C3AED"
                            },
                            {
                                icon: <HiOutlineShieldCheck size={36} />,
                                title: "Bank-Level Security",
                                desc: "Your vehicle particulars are encrypted and stored using state-of-the-art secure infrastructure.",
                                color: "#10B981"
                            },
                            {
                                icon: <HiOutlineBell size={36} />,
                                title: "Adaptive Alerts",
                                desc: "Receive personalized notifications via web and email before your documents expire.",
                                color: "#F59E0B"
                            }
                        ].map((f, i) => (
                            <Col md={6} lg={3} key={i}>
                                <motion.div
                                    className="glass-card p-4 h-100 border-0 hover-lift text-start"
                                    whileHover={{ scale: 1.05 }}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="mb-4 d-inline-block p-3 rounded-4 bg-white shadow-sm" style={{ color: f.color }}>
                                        {f.icon}
                                    </div>
                                    <h4 className="fw-bold mb-3">{f.title}</h4>
                                    <p className="text-secondary mb-0">{f.desc}</p>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* How it Works - Modern Split Layout */}
            <section id="how-it-works" className="py-5 bg-dark text-white overflow-hidden">
                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col lg={5}>
                            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                                <h2 className="display-4 fw-bold mb-5 text-white">Seamless Onboarding</h2>
                                <div className="step-item d-flex mb-5">
                                    <div className="step-num me-4 d-flex align-items-center justify-content-center fw-bold fs-4 rounded-circle bg-primary" style={{ minWidth: '50px', height: '50px' }}>1</div>
                                    <div>
                                        <h4 className="fw-bold text-white">Register Vehicle</h4>
                                        <p className="text-white-50">Upload your car particulars once and let our system handle the rest.</p>
                                    </div>
                                </div>
                                <div className="step-item d-flex mb-5">
                                    <div className="step-num me-4 d-flex align-items-center justify-content-center fw-bold fs-4 rounded-circle bg-white text-dark" style={{ minWidth: '50px', height: '50px' }}>2</div>
                                    <div>
                                        <h4 className="fw-bold text-white">Automatic Monitoring</h4>
                                        <p className="text-white-50">Our AI agents monitor document expiry dates in real-time with official databases.</p>
                                    </div>
                                </div>
                                <div className="step-item d-flex">
                                    <div className="step-num me-4 d-flex align-items-center justify-content-center fw-bold fs-4 rounded-circle bg-primary" style={{ minWidth: '50px', height: '50px' }}>3</div>
                                    <div>
                                        <h4 className="fw-bold text-white">Stay Notified</h4>
                                        <p className="text-white-50">Get early-bird notifications via your preferred channel before you go out of date.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg={7} className="ps-lg-5">
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="mt-5 mt-lg-0 position-relative"
                            >
                                <Carousel fade controls={false} indicators={true} interval={4000} className="rounded-5 overflow-hidden shadow-2xl">
                                    <Carousel.Item>
                                        <div className="bg-white bg-opacity-5 p-4 rounded-5 border border-white border-opacity-10 h-100">
                                            <img src={syncImg} className="img-fluid rounded-4 mb-4 shadow-lg" alt="Global Sync" />
                                            <h3 className="display-6 fw-bold">Global Database Sync</h3>
                                            <p className="lead text-white-50">Our system integrates with national databases to provide real-time updates on your particulars.</p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="bg-white bg-opacity-5 p-4 rounded-5 border border-white border-opacity-10 h-100">
                                            <img src={notifImg} className="img-fluid rounded-4 mb-4 shadow-lg" alt="Smart Alerts" />
                                            <h3 className="display-6 fw-bold">Adaptive Notifications</h3>
                                            <p className="lead text-white-50">Never miss a deadline again with our multis-channel smart notification engine.</p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="bg-white bg-opacity-5 p-4 rounded-5 border border-white border-opacity-10 h-100">
                                            <div className="p-5 text-center">
                                                <HiOutlineShieldCheck size={160} className="text-primary opacity-50 mb-4" />
                                                <h3 className="display-6 fw-bold">Guaranteed Security</h3>
                                                <p className="lead text-white-50">Our bank-level encryption ensures your vehicle data is safe and private at all times.</p>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTAs / About Section */}
            <section id="about" className="py-5 bg-glow-section">
                <Container className="py-5 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-5 border-0 shadow-2xl"
                    >
                        <h2 className="display-4 fw-bold mb-4">Ready to upgrade your drive?</h2>
                        <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                            Join thousands of vehicle owners who have traded compliance stress for the DriveDoc peace of mind.
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <Button size="lg" className="rounded-pill px-5 py-3 fw-bold hover-lift">Get Started Free</Button>
                            <Button variant="outline-dark" size="lg" className="rounded-pill px-5 py-3 fw-bold">Contact Enterprise</Button>
                        </div>
                    </motion.div>
                </Container>
            </section>

            <footer className="py-5 bg-light border-top">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                            <span className="fw-bold fs-4 text-gradient">DriveDoc</span>
                            <p className="text-muted mb-0">Empowering vehicle owners since 2026.</p>
                        </Col>
                        <Col md={6} className="text-center text-md-end">
                            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
                                <a href="#home" className="text-muted text-decoration-none hover-primary">Home</a>
                                <a href="#features" className="text-muted text-decoration-none hover-primary">Features</a>
                                <a href="#about" className="text-muted text-decoration-none hover-primary">About</a>
                            </div>
                            <small className="text-muted">© 2026 DriveDoc. All rights reserved.</small>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

export default LandingPage
