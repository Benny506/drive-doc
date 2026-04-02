import { motion, AnimatePresence } from 'motion/react'
import { useSelector } from 'react-redux'
import logo from '../../assets/logo.svg'

const GlobalLoader = () => {
    const title = useSelector((state) => state.ui.globalLoadingTitle)
    const message = useSelector((state) => state.ui.globalLoadingMessage)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                zIndex: 10000,
                pointerEvents: 'all'
            }}
        >
            <div className="position-relative mb-5">
                {/* Slow, Large Atmospheric Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="position-absolute start-50 top-50 translate-middle border border-primary border-opacity-10 rounded-circle"
                        style={{ width: 140, height: 140 }}
                        animate={{
                            scale: [1, 2.2],
                            opacity: [0.2, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Primary Pulsing Glow */}
                <motion.div
                    className="position-absolute start-50 top-50 translate-middle bg-primary bg-opacity-5 rounded-circle shadow-2xl"
                    style={{ width: 160, height: 160 }}
                    animate={{
                        scale: [0.9, 1.1, 0.9],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Logo with Steering Wheel Rotation */}
                <motion.div
                    animate={{
                        rotate: [-15, 15, -15],
                        y: [-2, 2, -2]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="position-relative bg-white p-4 rounded-circle shadow-2xl border border-white"
                >
                    <img src={logo} alt="DriveDoc" width="80" height="80" className="z-1" />
                </motion.div>
            </div>

            {/* Dynamic Information */}
            <div className="text-center">
                <motion.h2
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="display-6 fw-extrabold text-gradient mb-2"
                >
                    {title}
                </motion.h2>

                <motion.p
                    key={message}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-secondary tracking-widest text-uppercase fw-bold small"
                >
                    {message}
                </motion.p>
            </div>

            {/* Bottom Progress Indicator (Subtle) */}
            <div className="position-absolute bottom-0 start-0 w-100 overflow-hidden" style={{ height: '4px' }}>
                <motion.div
                    className="h-100 bg-primary"
                    animate={{
                        x: ['-100%', '100%']
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ width: '30%' }}
                />
            </div>
        </motion.div>
    )
}

export default GlobalLoader
